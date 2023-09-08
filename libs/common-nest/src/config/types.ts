import type { LevelWithSilent } from 'pino';

export interface AppSettings {
  // Port in which the application runs.
  readonly APP_PORT: number;
  // Default log level
  readonly LOG_LEVEL: LevelWithSilent;
}

export interface SentrySettings {
  readonly SENTRY_DSN: string;
  readonly SENTRY_ENV: string;
}

export interface HttpApiSettings extends AppSettings, SentrySettings {}
