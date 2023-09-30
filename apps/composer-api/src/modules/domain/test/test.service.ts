import { Injectable } from '@nestjs/common';
import { GooglePalmService } from 'src/modules/core/google-palm/google-palm.service';

@Injectable()
export class TestService {
  constructor(private readonly googlePalmService: GooglePalmService) {}

  verifyApiKey({
    apiKey,
  }: Readonly<{
    apiKey: string;
  }>) {
    return this.googlePalmService.verifyApiKey({ apiKey });
  }
}
