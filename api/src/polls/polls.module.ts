import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { PrismaModule } from '../prisma/prisma.module';
import { PollUpdateValidationErrorFilter } from './poll-update-validation-error.filter';
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
    { provide: APP_FILTER, useClass: PollUpdateValidationErrorFilter },
  ],
})
export class PollsModule {}
