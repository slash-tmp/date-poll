import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { PrismaService } from '../../prisma/prisma.service';
import { UidGenerator } from '../../uid-generator';
import { CreatePollDto } from '../dto/create-poll.dto';
import { Poll, PollRepository } from './poll.repository';

@Injectable()
export class PrismaPollRepository implements PollRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uidGenerator: UidGenerator,
  ) {}

  public async create(data: CreatePollDto): Promise<Poll> {
    const poll = await this.prisma.poll.create({
      data: {
        adminUid: this.uidGenerator(),
        publicUid: this.uidGenerator(),

        title: data.title,
        description: data.description,

        endDate: data.endDate,
        hideVotes: data.hideVotes,
        notifyOnResponse: data.notifyOnResponse,

        adminName: data.adminName,
        adminEmail: data.adminEmail,

        choices: {
          createMany: {
            data: data.choices.map((c) => ({ date: c.date })),
          },
        },
      },
      include: {
        choices: true,
        respondents: {
          include: {
            responses: true,
          },
        },
      },
    });

    return poll;
  }

  public async findByAdminUid(uid: string): Promise<Poll | null> {
    const poll = await this.prisma.poll.findUnique({
      where: { adminUid: uid },
      include: {
        choices: true,
        respondents: {
          include: {
            responses: true,
          },
        },
      },
    });

    return poll;
  }

  public async findByPublicUid(uid: string): Promise<Poll | null> {
    const poll = await this.prisma.poll.findUnique({
      where: { publicUid: uid },
      include: {
        choices: true,
        respondents: {
          include: {
            responses: true,
          },
        },
      },
    });

    return poll;
  }

  public async deleteByAdminUid(adminUid: string): Promise<Poll | null> {
    try {
      const deletedPoll = await this.prisma.poll.delete({
        where: { adminUid },
        include: {
          choices: true,
          respondents: {
            include: {
              responses: true,
            },
          },
        },
      });

      return deletedPoll;
    } catch (e) {
      // record not found
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025') {
        return null;
      }
      throw e;
    }
  }
}
