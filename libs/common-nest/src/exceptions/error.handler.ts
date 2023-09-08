import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { CodeErrorInternalServerException, UnclassifiedInternalServerException } from './5xx.exception';

const logger = new Logger('Error');

/**
 * Handles non axios errors and axios error without response.
 *
 * @param param.error Original error caught
 * @param param.ex Exception to return when service is not reachable.
 * @returns
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
