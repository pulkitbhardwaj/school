import { Global, Logger, Module } from '@nestjs/common';

import { EmailService } from './email.service';

@Global()
@Module({
  providers: [Logger, EmailService],
  exports: [Logger, EmailService],
})
export class MiscModule {}
