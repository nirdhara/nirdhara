import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { Observable, catchError } from 'rxjs';
import { map } from 'rxjs/operators';
import { VerifyApiKeyResult } from 'src/modules/domain/test/test.controller';
import { errorToPromise } from 'src/modules/http/google-palm/error.handler';
import { GOOGLE_PALM_HTTP_PROVIDER } from 'src/modules/http/google-palm/google-palm-http.module';
import { GenerateTextForm, GenerateTextResult } from './google-palm.dto';

@Injectable()
export class GooglePalmService {
  constructor(
    @Inject(GOOGLE_PALM_HTTP_PROVIDER)
    private readonly googlePalmHttp: HttpService,
  ) {}

  /**
   * Verifies the validity of the provided Google PaLM API key by making a test request to the Google PaLM API.
   * https://developers.generativeai.google/tutorials/setup#verify_your_api_key_with_curl_command
   *
   * @param apiKey The Google PaLM API key to be verified.
   * @returns An observable that emits the generated text result and a message indicating the validity of the API key.
   */
  verifyApiKey({
    apiKey,
  }: Readonly<{
    apiKey: string;
  }>): Observable<VerifyApiKeyResult> {
    const payload: GenerateTextForm = { prompt: { text: 'Say Hi' } };
    return this.googlePalmHttp
      .post<GenerateTextResult>(
        '/v1beta3/models/text-bison-001:generateText',
        payload,
        { headers: { 'x-goog-api-key': apiKey } },
      )
      .pipe(
        map((res) => ({ message: 'API key is valid.', data: res.data })),
        catchError(errorToPromise),
      );
  }
}
