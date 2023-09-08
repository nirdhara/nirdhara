import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import type { FastifyReply } from 'fastify';
import { ErrorCode } from '../exceptions/error-code.enum';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  // Logger
  private readonly logger = new Logger(AllExceptionsFilter.name);

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
