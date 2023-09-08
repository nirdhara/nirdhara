import { ConfigService } from '@nestjs/config';
import { init, Integrations } from '@sentry/node';
import { SentrySettings } from './types';

declare const __GIT_VERSION__: string;

export const sentryInit = (config: ConfigService<SentrySettings>, appName: string) => {
  init({
    dsn: config.get<string>('SENTRY_DSN'),
    environment: config.get<string>('SENTRY_ENV'),
    integrations: [
      // enable HTTP calls tracing
      new Integrations.Http({ tracing: true }),
    ],
    release: `${appName}@${__GIT_VERSION__}`,
    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1,
  });
};
