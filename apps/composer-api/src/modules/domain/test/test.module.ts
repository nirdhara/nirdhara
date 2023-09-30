import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { GooglePalmModule } from 'src/modules/core/google-palm/google-palm.module';
import { TestService } from './test.service';

@Module({
  imports: [GooglePalmModule],
  providers: [TestService],
  controllers: [TestController],
})
export class TestModule {}
