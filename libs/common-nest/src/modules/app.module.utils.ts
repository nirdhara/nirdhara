import { ConfigModule, ConfigService } from '@nestjs/config';
import Joi from 'joi';
import { LoggerModule } from 'nestjs-pino';
import { loggerParams } from '../config/logger.config';

declare const __PRODUCTION__: boolean;

// Custom validate function to mutate config before validation.
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

export const configModule = ({
  envSuffix,
  configSchema,
  validate,
}: Readonly<{
  envSuffix: string;
  configSchema?: Record<string, Joi.AnySchema>;
  validate?: (config: Record<string, any>) => Record<string, any>;
}>) =>
  ConfigModule.forRoot({
    // https://docs.nestjs.com/techniques/configuration#custom-validate-function
    ...(validate && { validate }),
    // https://docs.nestjs.com/techniques/configuration#schema-validation
    ...(configSchema && { validationSchema: Joi.object(configSchema) }),
    // https://docs.nestjs.com/techniques/configuration#custom-env-file-path
    envFilePath: __PRODUCTION__ ? [`env-${envSuffix}`, '.env'] : ['.env.development'],
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
export const loggerModule = ({ name }: Readonly<{ name: string }>) =>
  LoggerModule.forRootAsync({
    providers: [ConfigService],
    inject: [ConfigService],
    useFactory: loggerParams({ name }),
  });
