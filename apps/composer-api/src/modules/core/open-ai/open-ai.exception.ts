import { CustomInternalServerException } from '@app/common-nest/src';
import { ErrorCode } from '@app/composer-contracts/src/exceptions/error-code.enum';

/**
 * Reasons
 * - Open AI service with incorrect credentials.
 */
export class OpenAiIncorrectApiKeyException extends CustomInternalServerException<ErrorCode> {
  constructor() {
    super({
      error:
        'Incorrect API key provided for Open AI. You can find your API key at https://platform.openai.com/account/api-keys.',
      errorCode: ErrorCode.OpenAiIncorrectApiKey,
    });
  }
}
