import { RootModule } from '@app/common-nest/src';
import { Module } from '@nestjs/common';
import { CredentialModule } from './credential/credential.module';

@Module({
  imports: [RootModule, CredentialModule],
  providers: [],
})
export class DomainModule {}
