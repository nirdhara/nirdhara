import { Module } from '@nestjs/common';
import { GooglePalmHttpModule } from 'src/modules/http/google-palm/google-palm-http.module';
import { GooglePalmService } from './google-palm.service';

@Module({
  imports: [GooglePalmHttpModule],
  providers: [GooglePalmService],
  exports: [GooglePalmService],
})
export class GooglePalmModule {}
