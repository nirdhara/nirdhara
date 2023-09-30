import { Module } from '@nestjs/common';
import { TestController } from './test.controller';

@Module({
  imports: [],
  providers: [],
  controllers: [TestController],
})
export class TestModule {}
