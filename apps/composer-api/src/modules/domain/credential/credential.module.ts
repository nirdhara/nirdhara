import { Module } from '@nestjs/common';
import { GooglePalmModule } from 'src/modules/core/google-palm/google-palm.module';
import { OpenAiModule } from 'src/modules/core/open-ai/open-ai.module';
import { CredentialController } from './credential.controller';
import { CredentialService } from './credential.service';

@Module({
  imports: [GooglePalmModule, OpenAiModule],
  providers: [CredentialService],
  controllers: [CredentialController],
})
export class CredentialModule {}
