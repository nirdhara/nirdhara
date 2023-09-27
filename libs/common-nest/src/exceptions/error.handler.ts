import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { CodeErrorInternalServerException, UnclassifiedInternalServerException } from './5xx.exception';

const logger = new Logger('Error');

/**
 * Handles non axios errors and axios error without response.
 * Handles HTTP errors and returns a Promise that either rejects with an HttpException or resolves with void.
 * @param error - Original error caught
 * @param ex - The HttpException to return if service is not reachable.
 * @param ex401 - The HttpException to return if the error is an unauthorized error.
 * @param ex404 - The HttpException to return if the error is a not found error.
 * @returns A Promise that either rejects with an HttpException or resolves with void.
 */
export const httpErrorHandler = ({
  error,
  ex,
  ex401,
  ex404,
}: Readonly<{
  error: AxiosError | Record<string, any>;
  ex: HttpException;
  ex401?: HttpException;
  ex404?: HttpException;
}>): Promise<never | void> => {
  // Existing http exception, return.
  if (error instanceof HttpException) {
    return Promise.reject(error);
  }

  // Non axios error

  if (!(error instanceof AxiosError)) {
    logger.error(error);
    if (error?.stack && error?.message) {
      // Exception
      // TODO: Stackstorm notify
      return Promise.reject(new CodeErrorInternalServerException({ error: error.message }));
    }
    return Promise.reject(new UnclassifiedInternalServerException({}));
  }

  // Axios errors
  if (!error.response) {
    return Promise.reject(ex);
  }
  if (ex404 && error.response.status === HttpStatus.NOT_FOUND) {
    return Promise.reject(ex404);
  }
  if (ex401 && error.response.status === HttpStatus.UNAUTHORIZED) {
    return Promise.reject(ex401);
  }

  return Promise.resolve();
};
