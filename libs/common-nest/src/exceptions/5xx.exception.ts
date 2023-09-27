import { InternalServerErrorException } from '@nestjs/common';
import { ErrorCode } from './error-code.enum';

/**
 * Exception for internal server errors related to code errors.
 */
export class CodeErrorInternalServerException extends InternalServerErrorException {
  constructor({ error }: Readonly<{ error: string }>) {
    super({ error, errorCode: ErrorCode.CodeError });
  }
}

/**
 * Exception for unclassified internal server errors.
 */
export class UnclassifiedInternalServerException extends InternalServerErrorException {
  constructor({ error }: Readonly<{ error?: string }>) {
    super({ error, errorCode: ErrorCode.Unclassified });
  }
}
