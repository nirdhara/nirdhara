import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import type { FastifyReply } from 'fastify';
import { ErrorCode } from '../exceptions/error-code.enum';

/**
 * Catches all unhandled exceptions thrown by the application and sends an appropriate response to the client.
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  // Logger
  private readonly logger = new Logger(AllExceptionsFilter.name);

  /**
   * Catches the exception and sends an appropriate response to the client.
   * @param exception The exception that was thrown.
   * @param host The arguments host.
   * @returns The response to send to the client.
   */
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: FastifyReply = ctx.getResponse();

    if (exception instanceof HttpException) {
      const res: any = exception.getResponse();
      const error = typeof res === 'object' ? res : { error: res };
      const statusCode = exception.getStatus();
      return response.code(statusCode).send(error);
    }

    this.logger.error(exception);

    // Unclassified error. This should happen rarely.
    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    return response.status(statusCode).send({
      error: exception.message,
      errorCode: ErrorCode.Unclassified,
    });
  }
}
