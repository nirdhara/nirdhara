import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { initializeAgentExecutorWithOptions } from 'langchain/agents';
import { GooglePaLM } from 'langchain/llms/googlepalm';
import { OpenAI } from 'langchain/llms/openai';
import { DynamicTool, SerpAPI } from 'langchain/tools';
import { Calculator } from 'langchain/tools/calculator';

@ApiTags('Test')
@Controller('test')
export class TestController {
  constructor(private readonly config: ConfigService<any>) {}

  @Get('1')
  test1() {
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

  @Get('3')
  async test3() {
    const model = new OpenAI({
      openAIApiKey: this.config.get('OPENAI_API_KEY'),
      temperature: 0,
      verbose: true,
    });
    const tools = [
      new DynamicTool({
        name: 'SetClock',
        description: 'call this to set the clock',
        func: () => Promise.resolve('Clock has been set to 12 AM'),
      }),
      new DynamicTool({
        name: 'Acknowledge',
        description: 'call this to acknowledge the creators',
        func: () => Promise.resolve('Nirdhara'),
      }),
      new Calculator(),
      new SerpAPI(this.config.get('SERPAPI_API_KEY')),
    ];

    const executor = await initializeAgentExecutorWithOptions(tools, model, {
      agentType: 'zero-shot-react-description',
    });

    console.log('Loaded agent.');

    const input = `What is today's date?`;

    console.log(`Executing with input "${input}"...`);

    const result = await executor.call({ input });

    console.log(`${result.output}`);
  }
}
