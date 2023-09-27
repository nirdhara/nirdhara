import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { captureException, getCurrentHub, startTransaction, withScope } from '@sentry/node';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

// This is a workaround; see https://github.com/getsentry/sentry-javascript/issues/4731
import '@sentry/tracing';

/**
 * Interceptor that integrates with Sentry to capture errors and create transactions.
 */
@Injectable()
export class SentryInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { method, url } = req;

    // recreate transaction based from HTTP request
    const transaction = startTransaction({
      name: `route: ${method} ${url}`,
      op: 'transaction',
    });

    // setup context of newly created transaction
    getCurrentHub().configureScope((scope) => {
      scope.setSpan(transaction);
      // customize your context here
      // scope.setContext('http', { method, url, headers });
    });

    const span = getCurrentHub().getScope().getSpan();

    const onReturn = () => {
      withScope((scope) => {
        scope.setExtra('req', req);
        if (req.user) {
          scope.setUser(req.user);
        }
      });
      span.finish();
    };

    return next.handle().pipe(
      catchError((exception) => {
        // capture the error
        captureException(exception, span.getTraceContext());
        onReturn();
        // throw again the error
        return throwError(() => exception);
      }),
      tap({ next: onReturn }),
    );
  }
}
