import {
  AddApiKeyForm,
  AddApiKeyResult,
} from '@app/composer-contracts/src/domain/credential/credential.entity';
import { Body, Controller, Post } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs/internal/Observable';
import { CredentialService } from './credential.service';

@ApiTags('Credential')
@Controller('credential')
export class CredentialController {
  constructor(private readonly service: CredentialService) {}

  @Post()
  @ApiOperation({
    summary:
      'Add a new credential from a Large Language Model or other API Provider',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: AddApiKeyResult,
  })
  create(@Body() form: AddApiKeyForm): Observable<AddApiKeyResult> {
    return this.service.addApiKey({ form });
  }
}
