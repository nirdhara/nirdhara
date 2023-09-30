import { ApiProperty, IsEnum, IsString } from '../../decorators';
import { LlmProvider } from './llm-provider.enum';

export class AddApiKeyForm {
  @ApiProperty({
    enum: LlmProvider,
    example: LlmProvider.OpenAi,
    description: 'Large Language Model Provider like OpenAI, Google PaLM',
  })
  @IsEnum(LlmProvider)
  provider!: LlmProvider;

  @ApiProperty({
    type: String,
    example: 'api_key_2qeDowe8Ns_sample',
    description: 'API Key from a Large Language Model Provider',
  })
  @IsString()
  readonly apiKey!: string;
}

export class AddApiKeyResult {
  @ApiProperty({ type: String, description: 'Message to show to the customer' })
  readonly message!: string;
}
