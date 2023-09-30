import { ConfigModule, ConfigService } from '@nestjs/config';
import Joi from 'joi';
import { LoggerModule } from 'nestjs-pino';
import { loggerParams } from '../config/logger.config';

declare const __PRODUCTION__: boolean;

/**
 * Custom validate function to mutate config before validation.
 * Validates a configuration object against a given schema and keys.
 *
 * @param configSchema - The schema to validate the configuration object against.
 * @param keys - The keys to mutate in the configuration object.
 * @returns A function that takes a configuration object and returns the validated configuration object.
 * @throws An error if the configuration object fails validation.
 */
export const configValidate =
  ({ configSchema, keys }: Readonly<{ configSchema: Record<string, Joi.AnySchema>; keys: string[] }>) =>
  (config: Record<string, unknown>) => {
    // Config mutations
    for (const key of keys) {
      // eslint-disable-next-line functional/no-try-statements
      try {
        config[key] = JSON.parse(config[key] as string);
      } catch {
        // eslint-disable-next-line functional/no-throw-statements
        throw new Error(`Config validation error: "${key}" is invalid JSON.`);
      }
    }

    // Config validation
    const result = Joi.object(configSchema).validate(config, {
      allowUnknown: true,
    });
    if (result.error) {
      // eslint-disable-next-line functional/no-throw-statements
      throw new Error(`Config validation error: ${result.error.details.map((x) => x.message).join(',')}`);
    }
    return config;
  };

/**
 * Configures the NestJS ConfigModule with the provided options.
 * @param configSchema (Optional) A schema to validate the configuration against.
 * @param validate (Optional) A function to validate the configuration.
 * @returns The configured ConfigModule.
 */
export const configModule = ({
  configSchema,
  validate,
}: Readonly<{
  configSchema?: Record<string, Joi.AnySchema>;
  validate?: (config: Record<string, any>) => Record<string, any>;
}>) =>
  ConfigModule.forRoot({
    // https://docs.nestjs.com/techniques/configuration#custom-validate-function
    ...(validate && { validate }),
    // https://docs.nestjs.com/techniques/configuration#schema-validation
    ...(configSchema && { validationSchema: Joi.object(configSchema) }),
    // https://docs.nestjs.com/techniques/configuration#custom-env-file-path
    envFilePath: __PRODUCTION__ ? ['.env'] : ['.env.development.local', '.env.development'],
    // https://docs.nestjs.com/techniques/configuration#use-module-globally
    // you will not need to import ConfigModule in other modules once it's been loaded in [[AppModule]]
    isGlobal: true,
    // https://docs.nestjs.com/techniques/configuration#expandable-variables
    // allow nested environment variables, where one variable is referred to within the definition of another.
    expandVariables: true,
  });

/**
 *
 * @param param.name Application name
 * @returns
 */
/**
 * Returns a LoggerModule configuration object with the specified name.
 * @param name - The name of the logger.
 * @returns A LoggerModule configuration object.
 */
export const loggerModule = ({ name }: Readonly<{ name: string }>) =>
  LoggerModule.forRootAsync({
    providers: [ConfigService],
    inject: [ConfigService],
    useFactory: loggerParams({ name }),
  });
