import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { PollsController } from './polls.controller';
import { PollsService } from './polls.service';
import { InMemoryPollRepository } from './repositories/in-memory-poll.repository';
import { PollRepository } from './repositories/poll.repository';
import { PrismaPollRepository } from './repositories/prisma-poll.repository';

@Module({
  imports: [PrismaModule],
  controllers: [PollsController],
  providers: [
    PollsService,
    {
      provide: PollRepository,
      useFactory(prismaService?: PrismaService) {
        if (prismaService) {
          return new PrismaPollRepository(prismaService);
        } else {
          console.warn(
            '⚠️ No DATABASE_URL variable configured. Using in-memory repository.',
          );
          return new InMemoryPollRepository();
        }
      },
      inject: [{ token: PrismaService, optional: true }],
    },
  ],
})
export class PollsModule {}
