import { InternalServerErrorException } from '@nestjs/common';
import { ErrorCode } from './error-code.enum';

export class CodeErrorInternalServerException extends InternalServerErrorException {
  constructor({ error }: Readonly<{ error: string }>) {
    super({ error, errorCode: ErrorCode.CodeError });
  }
}

export class UnclassifiedInternalServerException extends InternalServerErrorException {
  constructor({ error }: Readonly<{ error?: string }>) {
    super({ error, errorCode: ErrorCode.Unclassified });
  }
}
