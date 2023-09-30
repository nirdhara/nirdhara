import { LlmProvider } from '@app/composer-contracts/src/domain/llm/llm-provider.enum';
import {
  AddApiKeyForm,
  AddApiKeyResult,
} from '@app/composer-contracts/src/domain/llm/llm.entity';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Observable, from, map, throwError } from 'rxjs';
import { GooglePalmService } from 'src/modules/core/google-palm/google-palm.service';
import { OpenAiService } from 'src/modules/core/open-ai/open-ai.service';

@Injectable()
export class LlmService {
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

  private verifyApiKey({
    form,
  }: Readonly<{
    form: AddApiKeyForm;
  }>): Observable<Record<string, any>> {
    const { apiKey } = form;

    if (form.provider === LlmProvider.OpenAi) {
      return from(this.openAiService.verifyApiKey({ apiKey }));
    }

    if (form.provider === LlmProvider.GooglePalm) {
      return this.googlePalmService.verifyApiKey({ apiKey });
    }

    // This will never execute.
    return throwError(
      () => new UnprocessableEntityException({ error: 'Invalid provider' }),
    );
  }
}
