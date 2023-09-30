import {
  AddApiKeyForm,
  AddApiKeyResult,
} from '@app/composer-contracts/src/domain/api-provider/api-provider.entity';
import { ApiProvider } from '@app/composer-contracts/src/domain/api-provider/api-provider.enum';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Observable, from, map, throwError } from 'rxjs';
import { GooglePalmService } from 'src/modules/core/google-palm/google-palm.service';
import { OpenAiService } from 'src/modules/core/open-ai/open-ai.service';

@Injectable()
export class ApiProviderService {
  constructor(
    private readonly openAiService: OpenAiService,
    private readonly googlePalmService: GooglePalmService,
  ) {}

  addApiKey({
    form,
  }: Readonly<{
    form: AddApiKeyForm;
  }>): Observable<AddApiKeyResult> {
    return this.verifyApiKey({ form }).pipe(
      map(() => ({ message: 'API key is valid' })),
    );
  }

  /**
   * Verifies the API key based on the provider.
   * @param form - The form containing the API key and provider information.
   * @returns An observable that emits the verification result.
   * @throws An UnprocessableEntityException if the provider is invalid.
   */
  private verifyApiKey({
    form,
  }: Readonly<{
    form: AddApiKeyForm;
  }>): Observable<Record<string, any>> {
    const { apiKey } = form;

    if (form.provider === ApiProvider.OpenAi) {
      return from(this.openAiService.verifyApiKey({ apiKey }));
    }

    if (form.provider === ApiProvider.GooglePalm) {
      return this.googlePalmService.verifyApiKey({ apiKey });
    }

    // This will never execute.
    return throwError(
      () => new UnprocessableEntityException({ error: 'Invalid provider' }),
    );
  }
}
