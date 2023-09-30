import { Module } from '@nestjs/common';
import { GooglePalmModule } from 'src/modules/core/google-palm/google-palm.module';
import { OpenAiModule } from 'src/modules/core/open-ai/open-ai.module';
import { ApiProviderController } from './api-provider.controller';
import { ApiProviderService } from './api-provider.service';

@Module({
  imports: [GooglePalmModule, OpenAiModule],
  providers: [ApiProviderService],
  controllers: [ApiProviderController],
})
export class ApiProviderModule {}
