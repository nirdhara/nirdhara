import { HttpModule, HttpModuleOptions } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

/**
 * Options for the InternalServiceHttpModule, which extends HttpModuleOptions.
 *
 * @readonly extras.isInternalService - A flag indicating that the service is internal.
 */
export interface InternalServiceHttpModuleOptions extends HttpModuleOptions {
  readonly extras: Readonly<{
    isInternalService: true;
  }>;
}

/**
 * Returns an HTTP module for internal services.
 * @param endpointKey The key of the endpoint to use.
 * @returns An HTTP module for internal services.
 */
export const httpModule = <T>({ endpointKey }: Readonly<{ endpointKey: keyof T }>) =>
  HttpModule.registerAsync({
    imports: [ConfigModule],
    useFactory: (config: ConfigService): InternalServiceHttpModuleOptions => ({
      baseURL: config.get<string>(endpointKey as string),
      responseType: 'json',
      extras: {
        isInternalService: true,
      },
    }),
    inject: [ConfigService],
  });
