import { BaseHttpModule } from '@app/common-nest/src';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GooglePalmHttpService } from './google-palm-http.service';

export const GOOGLE_PALM_HTTP_PROVIDER = 'GOOGLE_PALM_HTTP_PROVIDER';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [],
      useClass: GooglePalmHttpService,
    }),
  ],
  providers: [
    {
      provide: GOOGLE_PALM_HTTP_PROVIDER,
      useExisting: HttpService,
    },
  ],
  exports: [GOOGLE_PALM_HTTP_PROVIDER],
})
export class GooglePalmHttpModule extends BaseHttpModule {}
