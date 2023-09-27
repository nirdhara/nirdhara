import { Module } from '@nestjs/common';
import { RootController } from './root.controller';

@Module({
  controllers: [RootController],
})
/**
 * The root module of the application.
 */
export class RootModule {}
