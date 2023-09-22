import { nestHttpAppBootstrap } from '@app/common-nest/src';
import { AppModule } from './app.module';
import { APP_NAME } from './config/constants';

nestHttpAppBootstrap({
  name: APP_NAME,
  module: AppModule,
  swagger: { description: 'Evaluator API' },
});
