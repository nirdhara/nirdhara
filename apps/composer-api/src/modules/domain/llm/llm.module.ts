import { Module } from '@nestjs/common';
import { LlmController } from './llm.controller';
import { GooglePalmModule } from 'src/modules/core/google-palm/google-palm.module';
import { LlmService } from './llm.service';
import { OpenAiModule } from 'src/modules/core/open-ai/open-ai.module';

@Module({
  imports: [GooglePalmModule, OpenAiModule],
  providers: [LlmService],
  controllers: [LlmController],
})
export class LlmModule {}
