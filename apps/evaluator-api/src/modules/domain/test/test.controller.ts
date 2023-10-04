import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { initializeAgentExecutorWithOptions } from 'langchain/agents';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { GooglePaLM } from 'langchain/llms/googlepalm';
import { OpenAI } from 'langchain/llms/openai';
import {
  FewShotPromptTemplate,
  PromptTemplate,
  SemanticSimilarityExampleSelector,
} from 'langchain/prompts';
import { DynamicTool, SerpAPI } from 'langchain/tools';
import { Calculator } from 'langchain/tools/calculator';
import { HNSWLib } from 'langchain/vectorstores/hnswlib';

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

  @Get('2')
  test2() {
    const run = async () => {
      // Create a prompt template that will be used to format the examples.
      const examplePrompt = new PromptTemplate({
        inputVariables: ['input', 'output'],
        template: 'Input: {input}\nOutput: {output}',
      });

      // Create a SemanticSimilarityExampleSelector that will be used to select the examples.
      const exampleSelector =
        await SemanticSimilarityExampleSelector.fromExamples(
          [
            { input: 'happy', output: 'sad' },
            { input: 'tall', output: 'short' },
            { input: 'energetic', output: 'lethargic' },
            { input: 'sunny', output: 'gloomy' },
            { input: 'windy', output: 'calm' },
          ],
          new OpenAIEmbeddings({
            openAIApiKey: this.config.get('OPENAI_API_KEY'),
          }),
          HNSWLib,
          { k: 1 },
        );

      // Create a FewShotPromptTemplate that will use the example selector.
      const dynamicPrompt = new FewShotPromptTemplate({
        // We provide an ExampleSelector instead of examples.
        exampleSelector,
        examplePrompt,
        prefix: 'Give the antonym of every input',
        suffix: 'Input: {adjective}\nOutput:',
        inputVariables: ['adjective'],
      });

      // Input is about the weather, so should select eg. the sunny/gloomy example
      console.log(await dynamicPrompt.format({ adjective: 'rainy' }));
      /*
       Give the antonym of every input
    
       Input: sunny
       Output: gloomy
    
       Input: rainy
       Output:
       */

      // Input is a measurement, so should select the tall/short example
      console.log(await dynamicPrompt.format({ adjective: 'large' }));
      /*
       Give the antonym of every input
    
       Input: tall
       Output: short
    
       Input: large
       Output:
       */
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
        func: async () => 'Clock has been set to 12 AM',
      }),
      new DynamicTool({
        name: 'Acknowledge',
        description: 'call this to acknowledge the creators',
        func: async () => 'Nirdhara',
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
