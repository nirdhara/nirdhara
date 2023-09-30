import { HttpModuleOptions, HttpModuleOptionsFactory } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GooglePalmHttpService implements HttpModuleOptionsFactory {
  createHttpOptions(): HttpModuleOptions {
    return {
      baseURL: 'https://generativelanguage.googleapis.com',
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'json',
    };
  }
}
