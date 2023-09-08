/* eslint-disable @typescript-eslint/dot-notation */

import { AsyncContext } from '@nestjs-steroids/async-context';
import { HttpModule, HttpService } from '@nestjs/axios';
import { OnModuleDestroy, OnModuleInit, Optional } from '@nestjs/common';
import type { AxiosRequestConfig } from 'axios';
import { AxiosError } from 'axios';
import hyperid from 'hyperid';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Header } from './../../enums/header.enum';
import { InternalServiceHttpModuleOptions } from './internal-service-http.module';

// To create unique id for HTTP client requests.
const instance = hyperid();

const base64Encode = (s: Record<string, any>) => (s ? Buffer.from(JSON.stringify(s)).toString('base64') : s);

export abstract class BaseHttpModule implements OnModuleInit, OnModuleDestroy {
  // Interceptor Ids.
  requestInterceptor: number;
  responseInterceptor: number;

  constructor(
    private readonly httpService: HttpService,
    @InjectPinoLogger(HttpModule.name) private readonly logger: PinoLogger,
    @Optional() private readonly ac: AsyncContext<string, string>,
  ) {}

  public onModuleInit(): void {
    // Add request interceptor and response interceptor to log requests
    const axios = this.httpService.axiosRef;

    // request interceptor
    this.requestInterceptor = axios.interceptors.request.use((config) => {
      // Add additional headers for internal service requests.
      if ((config as InternalServiceHttpModuleOptions)?.extras?.isInternalService) {
        const isJobContext = this.ac.als.getStore() === undefined;
        if (!isJobContext) {
          // x-request-id header
          const reqId = this.ac.get(Header.ReqId);
          if (reqId) {
            config.headers[Header.ReqId] = reqId;
          }

          // authorization header
          const authHeader = this.ac.get(Header.Auth);
          if (authHeader) {
            config.headers[Header.Auth] = authHeader;
          }
        }
      }
      const id: string = instance();
      this.logger.info(
        {
          id,
          url: `${config.baseURL || ''}${config.url}`,
          params: config.params,
          method: config.method?.toUpperCase(),
          body: base64Encode(config.data),
        },
        'outgoing request',
      );

      const startTime = process.hrtime.bigint();
      config['metadata'] = {
        ...config['metadata'],
        id,
        startTime,
      };
      return config;
    });

    // response interceptor.
    this.responseInterceptor = axios.interceptors.response.use(
      (response) => {
        this.logger.info(
          {
            id: response.config['metadata'].id,
            response: base64Encode(response.data),
          },
          'response',
        );

        this.logger.info(
          {
            ...responseLog(response.config),
            statusCode: response.status,
            responseId: response.headers?.['x-response-id'], // This is available only from few API providers
          },
          'request completed',
        );

        return response;
      },
      (error) => {
        // Axios Error
        if (error instanceof AxiosError) {
          this.logger.error(
            {
              id: error.config['metadata'].id,
              response: base64Encode(error.response?.data),
            },
            'response',
          );
          this.logger.error(
            {
              ...responseLog(error.config),
              statusCode: error.response?.status || 0, // 0 for no response from API.
              responseId: error.response?.headers?.['x-response-id'], // This is available only from few API providers
            },
            'request failed',
          );
        } else {
          // TODO: Stackstorm Notify.
          this.logger.error(error, 'request failed');
        }

        return Promise.reject(error);
      },
    );
  }

  public onModuleDestroy() {
    // Eject request and response interceptors.
    const axios = this.httpService.axiosRef;
    axios.interceptors.request.eject(this.requestInterceptor);
    axios.interceptors.response.eject(this.responseInterceptor);
  }
}

const responseLog = <T>(config: AxiosRequestConfig<T>) => ({
  id: config['metadata'].id,
  responseTime: Number(process.hrtime.bigint() - config['metadata'].startTime) / 1_000_000,
});
