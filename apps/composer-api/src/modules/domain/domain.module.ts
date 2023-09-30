import { RootModule } from '@app/common-nest/src';
import { Module } from '@nestjs/common';
import { ApiProviderModule } from './api-provider/api-provider.module';

@Module({
  imports: [RootModule, ApiProviderModule],
  providers: [],
})
export class DomainModule {}
