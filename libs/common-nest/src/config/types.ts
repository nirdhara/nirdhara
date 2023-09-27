import type { LevelWithSilent } from 'pino';

/**
 * Interface representing the application settings.
 */
export interface AppSettings {
  /**
   * Port in which the application runs.
   */
  readonly APP_PORT: number;
  /**
   * Default log level.
   */
  readonly LOG_LEVEL: LevelWithSilent;
}

/**
 * Represents the configuration settings for Sentry.
 */
export interface SentrySettings {
  /**
   * The Data Source Name (DSN) for Sentry.
   */
  readonly SENTRY_DSN: string;
  /**
   * The environment for Sentry.
   */
  readonly SENTRY_ENV: string;
}

/**
 * Settings for the HTTP API, including app settings and Sentry settings.
 */
export interface HttpApiSettings extends AppSettings, SentrySettings {}
