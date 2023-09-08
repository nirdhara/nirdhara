import { configModule, loggerModule } from '@app/common-nest/src';
import { Module } from '@nestjs/common';
import { configSchema } from './config/config-schema';
import { APP_NAME } from './config/constants';
import { DomainModule } from './modules/domain/domain.module';

@Module({
  imports: [
    configModule({ envSuffix: 'composer-api', configSchema }),
    loggerModule({ name: APP_NAME }),
    DomainModule,
  ],
})
export class AppModule {}
