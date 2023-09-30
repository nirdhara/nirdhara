import { CustomInternalServerException } from '@app/common-nest/src';
import { ErrorCode } from 'src/exceptions/error-code.enum';

/**
 * Reasons
 * - Google PaLM service down or not reachable.
 */
export class GooglePalmConnectionException extends CustomInternalServerException<ErrorCode> {
  constructor() {
    super({
      error: 'Error connecting to Google PaLM',
      errorCode: ErrorCode.GooglePalmConnection,
    });
  }
}

/**
 * Reasons
 * - Google PaLM service with incorrect credentials.
 */
export class GooglePalmInvalidApiKeyException extends CustomInternalServerException<ErrorCode> {
  constructor() {
    super({
      error: 'Invalid API Key provided for Google PaLM',
      errorCode: ErrorCode.GooglePalmInvalidApiKey,
    });
  }
}
