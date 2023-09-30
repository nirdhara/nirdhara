import { CustomInternalServerException } from '@app/common-nest/src';
import { ErrorCode } from '@app/composer-contracts/src/exceptions/error-code.enum';

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
export class GooglePalmIncorrectApiKeyException extends CustomInternalServerException<ErrorCode> {
  constructor() {
    super({
      error:
        'Incorrect API key provided for Google PaLM. You can find your API key at https://makersuite.google.com/app/apikey',
      errorCode: ErrorCode.GooglePalmIncorrectApiKey,
    });
  }
}
