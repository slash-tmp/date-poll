import { Module } from '@nestjs/common';
import { nanoid } from 'nanoid';

import { MailerModule } from '../mailer/mailer.module';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { UID_GENERATOR, UidGenerator } from '../uid-generator';
import { PollsController } from './polls.controller';
import { PollsService } from './polls.service';
import { InMemoryPollRepository } from './repositories/in-memory-poll.repository';
import { PollRepository } from './repositories/poll.repository';
import { PrismaPollRepository } from './repositories/prisma-poll.repository';

const pollRepositoryProvider = {
  provide: PollRepository,
  useFactory(uidGenerator: UidGenerator, prismaService?: PrismaService) {
    if (prismaService) {
      return new PrismaPollRepository(prismaService, uidGenerator);
    } else {
      console.warn(
        '⚠️ No DATABASE_URL variable configured. Using in-memory repository.',
      );
      return new InMemoryPollRepository(uidGenerator);
    }
  },
  inject: [UID_GENERATOR, { token: PrismaService, optional: true }],
};

@Module({
  imports: [PrismaModule, MailerModule],
  controllers: [PollsController],
  providers: [
    PollsService,
    pollRepositoryProvider,
    {
      provide: UID_GENERATOR,
      useValue: nanoid,
    },
  ],
})
export class PollsModule {}
