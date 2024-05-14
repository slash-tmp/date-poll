import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { PollsController } from './polls.controller';
import { PollsService } from './polls.service';
import { PollRepository } from './repositories/poll.repository';
import { PrismaPollRepository } from './repositories/prisma-poll.repository';

@Module({
  imports: [PrismaModule],
  controllers: [PollsController],
  providers: [
    PollsService,
    { provide: PollRepository, useClass: PrismaPollRepository },
  ],
})
export class PollsModule {}
