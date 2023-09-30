import { RootModule } from '@app/common-nest/src';
import { Module } from '@nestjs/common';
import { TestModule } from './test/test.module';

@Module({
  imports: [RootModule, TestModule],
  providers: [],
})
export class DomainModule {}
