import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TestService } from './test.service';
import { GenerateTextResult } from 'src/modules/core/google-palm/google-palm.dto';

interface VerifyApiKeyForm {
  apiKey: string;
}

export interface VerifyApiKeyResult {
  message: string;
  data: GenerateTextResult;
}

@ApiTags('Test')
@Controller('test')
export class TestController {
  constructor(private readonly service: TestService) {}

  @Post('/verify')
  verifyApiKey(@Body() form: VerifyApiKeyForm) {
    return this.service.verifyApiKey(form);
  }
}
