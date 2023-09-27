import { ConfigService } from '@nestjs/config';
import { Params } from 'nestjs-pino';
import type { LevelWithSilent } from 'pino';
import pino from 'pino';
import { AppSettings } from './types';

declare const __PRODUCTION__: boolean;

interface PinoOption {
  readonly name: string;
}

const pinoOptions = (args: PinoOption): pino.LoggerOptions => ({
  // https://github.com/pinojs/pino/blob/HEAD/docs/api.md#name-string
  name: args.name,
  ...(__PRODUCTION__
    ? {}
    : {
        // https://github.com/pinojs/pino-pretty#programmatic-integration
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:yyyy-mm-dd HH:MM:ss.l o',
          },
        },
      }),
});

export const pinoLogger = (args: PinoOption) => pino(pinoOptions(args));

/**
 * Returns a function that takes a `ConfigService` instance and returns a `Params` object
 * for configuring the `pinoHttp` middleware for all routes.
 * @param args - An object containing options for configuring the `pinoHttp` middleware.
 * @returns A function that takes a `ConfigService` instance and returns a `Params` object.
 */
export const loggerParams =
  (args: PinoOption) =>
  (config: ConfigService<AppSettings>): Params => ({
    forRoutes: ['*'],
    pinoHttp: {
      ...pinoOptions(args),
      nestedKey: 'payload',
      level: config.get<LevelWithSilent>('LOG_LEVEL'),
      autoLogging: false,
      customProps: (req: any) => ({ reqId: req.id }),
      // eslint-disable-next-line unicorn/no-useless-undefined
      serializers: { req: () => undefined },
    } as any, // TODO: check post update in pino version.
  });
