import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { GooglePaLM } from 'langchain/llms/googlepalm';

@ApiTags('Test')
@Controller('test')
export class TestController {
  constructor(private readonly config: ConfigService<any>) {}

  @Get()
  test() {
    const run = async () => {
      const model = new GooglePaLM({
        apiKey: this.config.get('GOOGLE_PALM_API_KEY'),
        modelName: 'models/text-bison-001',
        temperature: 0,
        maxOutputTokens: 2,
      });
      const res = await model.call('Say Hi');
      console.log({ res });
      return res;
    };

    return run();
  }
}
