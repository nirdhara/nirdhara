import { AsyncContextModule as BaseAsyncContextModule } from '@nestjs-steroids/async-context';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AsyncContextInterceptor } from '../../interceptors/async-context.interceptor';

/**
 * Module for managing asynchronous context in NestJS applications.
 * Required by services only if they call other internal services.
 * @module AsyncContextModule
 */
@Module({
  imports: [BaseAsyncContextModule.forRoot({ isGlobal: true })],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: AsyncContextInterceptor,
    },
  ],
  exports: [BaseAsyncContextModule],
})
export class AsyncContextModule {}
