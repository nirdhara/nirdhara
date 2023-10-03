import { ApiProperty, IsEnum, IsString } from '../../decorators';
import { ApiProvider } from './api-provider.enum';

export class AddApiKeyForm {
  @ApiProperty({
    enum: ApiProvider,
    example: ApiProvider.OpenAi,
    description: 'Large Language Model and other API Provider like OpenAI, Google PaLM, SerpAPI',
  })
  @IsEnum(ApiProvider)
  provider!: ApiProvider;

  @ApiProperty({
    type: String,
    example: 'api_key_2qeDowe8Ns_sample',
    description: 'API Key from a Large Language Model or other API Provider',
  })
  @IsString()
  readonly apiKey!: string;
}

export class AddApiKeyResult {
  @ApiProperty({ type: String, description: 'Message to show to the customer' })
  readonly message!: string;
}
