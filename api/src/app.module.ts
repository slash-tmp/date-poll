import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PollsModule } from './polls/polls.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, PollsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
