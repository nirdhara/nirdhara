import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * Logger instance for logging request, response information.
 */
const reqLogger = new Logger('Request');
const resLogger = new Logger('Response');

/**
 * Interceptor to log the response time of a request and add custom headers to the response.
 */
@Injectable()
export class XResponseTimeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    reqLogger.log({ body: base64Encode(req.body), url: req.url });
    const startTime = process.hrtime.bigint();

    const onReturn = (data) => addCustomHeaders(context, startTime, data);

    return next.handle().pipe(tap({ next: onReturn, error: onReturn }));
  }
}

/**
 * Adds custom headers to the HTTP response, including the X-Response-Time header and a base64-encoded
 * representation of the response body. Also logs the response URL and the base64-encoded response body.
 * @param context - The execution context for the current request.
 * @param startTime - The start time of the request, as a BigInt.
 * @param data - The response data to be encoded and logged.
 */
const addCustomHeaders = (context: ExecutionContext, startTime: bigint, data: object | Error) => {
  const res = context.switchToHttp().getResponse().raw;
  resLogger.log({ body: base64Encode(data), url: res.req.url });
  const responseTime = Number(process.hrtime.bigint() - startTime) / 1_000_000;
  res.setHeader('X-Response-Time', `${responseTime}`);
};

/**
 * Encodes a given object as a base64 string.
 *
 * @param s The object to encode.
 * @returns The base64-encoded string, or the original object if it is falsy.
 */
const base64Encode = (s: Record<string, any>) => (s ? Buffer.from(JSON.stringify(s)).toString('base64') : s);
