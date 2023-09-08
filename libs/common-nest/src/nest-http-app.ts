import fastifyHelmet, { FastifyHelmetOptions } from '@fastify/helmet';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { FastifyRegisterOptions, fastify } from 'fastify';
import hyperid from 'hyperid';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { pinoLogger } from './config/logger.config';
import { HttpApiSettings } from './config/types';
import { Header } from './enums/header.enum';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { XResponseTimeInterceptor } from './interceptors/x-response-time.interceptor';
import { loggerMiddleware } from './middleware/logger.middleware';
import { SentryInterceptor } from './interceptors/sentry.interceptor';
import { sentryInit } from './config/sentry.config';
import { Handlers } from '@sentry/node';

declare const module: any;
declare const __PRODUCTION__: boolean;
declare const __OPEN_API__: boolean;
declare const __GIT_VERSION__: string;

const helmetOptions = (): FastifyRegisterOptions<FastifyHelmetOptions> => {
  if (__OPEN_API__) {
    return {
      contentSecurityPolicy: {
        directives: {
          defaultSrc: [`'self'`],
          styleSrc: [`'self'`, `'unsafe-inline'`],
          imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
          scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
        },
      },
    };
  }

  return {
    hsts: {
      maxAge: 31_536_000,
      preload: true,
    },
    frameguard: {
      action: 'deny',
    },
  };
};

export interface FactoryArgs {
  readonly name: string;
  readonly module: any;
  readonly swagger: Readonly<{
    description: string;
  }>;
  readonly cors?: boolean;
  readonly customBootstrap?: (app: NestFastifyApplication) => void;
}

export const nestHttpAppBootstrap = async (args: FactoryArgs) => {
  // Unique id generator instance.
  const genReqId = hyperid();

  // https://docs.nestjs.com/techniques/performance#adapter
  const fastifyInstance = fastify({
    // https://www.fastify.io/docs/latest/Reference/Logging/
    // Additional fields can be added using req/res serializer
    logger: pinoLogger({ name: args.name }),
    requestIdHeader: Header.ReqId,
    genReqId,
  });

  const fastifyAdapter = new FastifyAdapter(fastifyInstance as any);
  const app = await NestFactory.create<NestFastifyApplication>(args.module, fastifyAdapter, { bufferLogs: true });

  if (!__PRODUCTION__ || args.cors) {
    app.enableCors();
  }

  // https://docs.nestjs.com/techniques/logger#dependency-injection
  // Set pino as app logger
  app.useLogger(app.get(Logger));

  // https://docs.nestjs.com/techniques/security#helmet
  // Applies security hardening settings. using defaults: https://www.npmjs.com/package/helmet
  app.register(fastifyHelmet as any, helmetOptions() as any); // TODO: any is added because of mismatch of types.

  // Global middleware, interceptors, filters, pipes
  if (__PRODUCTION__) {
    app.use(Handlers.requestHandler()); // The request handler must be the first middleware on the app
  }
  app.use(loggerMiddleware);
  app.useGlobalInterceptors(new LoggerErrorInterceptor()); // https://github.com/iamolegga/nestjs-pino#expose-stack-trace-and-error-class-in-err-property
  app.useGlobalInterceptors(new XResponseTimeInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe());

  const config: ConfigService<HttpApiSettings> = app.get(ConfigService);

  if (__PRODUCTION__) {
    sentryInit(config, args.name);
    app.useGlobalInterceptors(new SentryInterceptor());
  }

  if (__OPEN_API__) {
    const options = new DocumentBuilder()
      .setTitle(args.name)
      .setDescription(args.swagger.description)
      .setVersion(__GIT_VERSION__)
      .addTag(args.name)
      // https://swagger.io/docs/specification/authentication/api-keys/
      .addSecurity('ApiKeyAuth', {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
      })
      .addSecurityRequirements('ApiKeyAuth')

      .build();
    const document = SwaggerModule.createDocument(app, options);
    // Swagger JSON file available for download at http://localhost:3000/openapi-json
    // Swagger documentation available under http://localhost:3000/openapi
    // Use http://localhost:3000 instead of http://0.0.0.0:3000 domain to open swagger docs in local.
    SwaggerModule.setup('openapi', app, document);
  }

  const port = +config.get<number>('APP_PORT');

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();

  // Additional bootstrap steps to allow customization by services.
  if (args.customBootstrap instanceof Function) {
    args.customBootstrap(app);
  }

  // https://docs.nestjs.com/techniques/performance#adapter
  await app.listen(port, '0.0.0.0');

  // https://docs.nestjs.com/recipes/hot-reload#hot-module-replacement
  if (!__PRODUCTION__ && module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
};
