import {
  AddApiKeyForm,
  AddApiKeyResult,
} from '@app/composer-contracts/src/domain/api-provider/api-provider.entity';
import { Body, Controller, Post } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs/internal/Observable';
import { ApiProviderService } from './api-provider.service';

@ApiTags('API Keys')
@Controller('api-provider')
export class ApiProviderController {
  constructor(private readonly service: ApiProviderService) {}

  @Post('/api-key')
  @ApiOperation({
    summary:
      'Add a new API key from a Large Language Model or other API Provider',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: AddApiKeyResult,
  })
  create(@Body() form: AddApiKeyForm): Observable<AddApiKeyResult> {
    return this.service.addApiKey({ form });
  }
}
