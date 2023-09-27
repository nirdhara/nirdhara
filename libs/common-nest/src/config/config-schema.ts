import Joi from 'joi';
import { HttpApiSettings } from './types';

/**
 * Defines the schema for the HTTP API configuration.
 * @param port - The port number for the HTTP API.
 * @returns An object containing the validation schema for the HTTP API settings.
 */
export const httpApiConfigSchema = ({
  port,
}: Readonly<{
  port: number;
}>): {
  readonly [k in keyof HttpApiSettings]: Joi.AnySchema;
} => ({
  APP_PORT: Joi.number().default(port),
  LOG_LEVEL: Joi.string().valid('fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent').default('info'),
  SENTRY_DSN: Joi.string().required(),
  SENTRY_ENV: Joi.string().required(),
});
