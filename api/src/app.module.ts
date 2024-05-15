import { Module } from '@nestjs/common';

import { PollsModule } from './polls/polls.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, PollsModule],
})
export class AppModule {}
