import { RootModule } from '@app/common-nest/src';
import { Module } from '@nestjs/common';
import { LlmModule } from './llm/llm.module';

@Module({
  imports: [RootModule, LlmModule],
  providers: [],
})
export class DomainModule {}
