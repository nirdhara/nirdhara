import { to } from '@app/common/src';
import { ErrorCode } from '@app/composer-contracts/src/exceptions/error-code.enum';
import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import OpenAI from 'openai';
import { OpenAiIncorrectApiKeyException } from './open-ai.exception';

@Injectable()
export class OpenAiService {
  /**
   * Verifies the validity of the provided OpenAI API key by making a test request to the OpenAI API.
   * https://platform.openai.com/docs/api-reference/organization-optional
   *
   * @param apiKey The OpenAI API key to be verified.
   * @returns A promise that emits the list of models.
   */
  async verifyApiKey({
    apiKey,
  }: Readonly<{
    apiKey: string;
  }>) {
    const openai = new OpenAI({ apiKey });
    const [error, response] = await to(openai.models.list());
    if (error) {
      if (error instanceof OpenAI.APIError) {
        if (error.code === 'invalid_api_key') {
          return Promise.reject(new OpenAiIncorrectApiKeyException());
        }
        return Promise.reject(
          new HttpException(
            {
              error,
              errorCode: ErrorCode.OpenAiErrorResponse,
            },
            error.status,
          ),
        );
      }
      return Promise.reject(error);
    }

    return Promise.resolve({ data: response.data });
  }
}
