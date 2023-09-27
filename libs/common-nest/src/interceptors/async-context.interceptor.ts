import { AsyncContext } from '@nestjs-steroids/async-context';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Header } from '../enums/header.enum';

/**
 * Intercepts incoming requests and sets request-based values to be accessed throughout the application.
 * @param context The execution context.
 * @param next The call handler.
 * @returns An observable of the response.
 */
@Injectable()
export class AsyncContextInterceptor implements NestInterceptor {
  constructor(private readonly ac: AsyncContext<string, any>) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    // Using async local storage to push request based values to be accessed throughout the application.
    this.ac.register();

    this.ac.set(Header.ReqId, req.id); // Request Id

    const authHeader = req.headers[Header.Auth];
    if (authHeader) {
      this.ac.set(Header.Auth, authHeader); // Authorization header
    }

    return next.handle();
  }
}
