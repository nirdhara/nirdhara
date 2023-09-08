import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const addCustomHeaders = (context: ExecutionContext, startTime: bigint, data: object | Error) => {
  const res = context.switchToHttp().getResponse().raw;
  if (res.req.hostname?.includes('order')) {
    // currently only for order
    logger.log({ body: base64Encode(data), url: res.req.url });
  }
  const responseTime = Number(process.hrtime.bigint() - startTime) / 1_000_000;
  res.setHeader('X-Response-Time', `${responseTime}`);
};

const logger = new Logger('Request');
const base64Encode = (s: Record<string, any>) => (s ? Buffer.from(JSON.stringify(s)).toString('base64') : s);

@Injectable()
export class XResponseTimeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    logger.log({ body: base64Encode(req.body), url: req.url });
    const startTime = process.hrtime.bigint();

    const onReturn = (data) => addCustomHeaders(context, startTime, data);

    return next.handle().pipe(tap({ next: onReturn, error: onReturn }));
  }
}
