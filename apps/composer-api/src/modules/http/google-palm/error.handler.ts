import { httpErrorHandler } from '@app/common-nest/src';
import { HttpException } from '@nestjs/common';
import { AxiosError } from 'axios';
import { ErrorCode } from 'src/exceptions/error-code.enum';
import { GooglePalmErrorResponse } from './google-palm.dto';
import {
  GooglePalmConnectionException,
  GooglePalmInvalidApiKeyException,
} from './google-palm.exception';

export const errorToPromise = async (
  error: AxiosError | Record<string, any>,
): Promise<never> => {
  // Handle non axios errors and no response axios error.
  await httpErrorHandler({
    error,
    ex: new GooglePalmConnectionException(),
  });

  // Handle axios errors with response

  const response = (error.response.data as GooglePalmErrorResponse)?.error;
  if (response?.details.find((detail) => detail.reason === 'API_KEY_INVALID')) {
    return Promise.reject(new GooglePalmInvalidApiKeyException());
  }

  const exception = new HttpException(
    {
      error: response,
      errorCode: ErrorCode.GooglePalmErrorResponse,
    },
    error.response.status,
  );

  return Promise.reject(exception);
};
