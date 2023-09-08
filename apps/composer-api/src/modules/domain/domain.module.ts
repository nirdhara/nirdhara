import { RootModule } from '@app/common-nest/src';
import { Module } from '@nestjs/common';

@Module({
  imports: [RootModule],
  providers: [],
})
export class DomainModule {}
