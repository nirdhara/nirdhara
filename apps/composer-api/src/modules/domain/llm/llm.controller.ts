import {
  AddApiKeyForm,
  AddApiKeyResult,
} from '@app/composer-contracts/src/domain/llm/llm.entity';
import { Body, Controller, Post } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs/internal/Observable';
import { LlmService } from './llm.service';

@ApiTags('LLM')
@Controller('llm')
export class LlmController {
  constructor(private readonly service: LlmService) {}

  @Post('/api-key')
  @ApiOperation({
    summary: 'Add a new API key from a Large Language Model Provider',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: AddApiKeyResult,
  })
  create(@Body() form: AddApiKeyForm): Observable<AddApiKeyResult> {
    return this.service.addApiKey({ form });
  }
}
