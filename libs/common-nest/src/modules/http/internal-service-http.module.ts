import { HttpModule, HttpModuleOptions } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

export interface InternalServiceHttpModuleOptions extends HttpModuleOptions {
  readonly extras: Readonly<{
    isInternalService: true;
  }>;
}

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
