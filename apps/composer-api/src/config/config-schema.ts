import { httpApiConfigSchema } from '@app/common-nest/src';
import Joi from 'joi';
import { EnvironmentVariables } from './types';

export const configSchema: {
  readonly [k in keyof EnvironmentVariables]: Joi.AnySchema;
} = {
  ...httpApiConfigSchema({ port: 4000 }),
};
