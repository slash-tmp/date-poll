import { Injectable } from '@nestjs/common';

import { UidGenerator } from '../../uid-generator';
import { CreatePollDto } from '../dto/create-poll.dto';
import { UpdatePollDto } from '../dto/update-poll.dto';
import { Poll, PollRepository } from './poll.repository';

@Injectable()
export class InMemoryPollRepository implements PollRepository {
  private polls: Poll[] = [];
  private nextId: number = 1;

  constructor(private readonly uidGenerator: UidGenerator) {}

  public create(data: CreatePollDto): Promise<Poll> {
    const poll: Poll = {
      id: this.nextId++,
      adminUid: this.uidGenerator(),
      publicUid: this.uidGenerator(),
      adminEmail: data.adminEmail,
      adminName: data.adminName ?? null,
      choices: data.choices.map((c) => ({
        id: this.nextId++,
        createdAt: new Date(),
        updatedAt: new Date(),
        date: c.date,
      })),
      createdAt: new Date(),
      description: data.description ?? null,
      endDate: data.endDate ?? null,
      hideVotes: data.hideVotes,
      notifyOnResponse: data.notifyOnResponse,
      respondents: [],
      title: data.title,
      updatedAt: new Date(),
    };
    this.polls.push(poll);
    return Promise.resolve(poll);
  }

  public findByAdminUid(uid: string): Promise<Poll | null> {
    return Promise.resolve(this.polls.find((p) => p.adminUid === uid) ?? null);
  }

  public findByPublicUid(uid: string): Promise<Poll | null> {
    return Promise.resolve(this.polls.find((p) => p.publicUid === uid) ?? null);
  }

  public findManyByAdminEmail(adminEmail: string): Promise<Poll[]> {
    return Promise.resolve(
      this.polls.filter(
        (poll) => poll.adminEmail.toLowerCase() === adminEmail.toLowerCase(),
      ),
    );
  }

  public deleteByAdminUid(uid: string): Promise<Poll | null> {
    const index = this.polls.findIndex((p) => p.adminUid === uid);
    if (index === -1) {
      return Promise.resolve(null);
    }
    const poll = this.polls.at(index)!;

    this.polls.splice(index, 1);

    return Promise.resolve(poll);
  }

  public updateByAdminUid(
    uid: string,
    data: UpdatePollDto,
  ): Promise<Poll | null> {
    const pollToUpdate = this.polls.find((p) => p.adminUid === uid);

    if (!pollToUpdate) {
      return Promise.resolve(null);
    }

    pollToUpdate.updatedAt = new Date();

    pollToUpdate.title = data.title;
    pollToUpdate.description = data.description ?? null;

    pollToUpdate.adminName = data.adminName ?? null;
    pollToUpdate.hideVotes = data.hideVotes;
    pollToUpdate.notifyOnResponse = data.notifyOnResponse;
    pollToUpdate.endDate = data.endDate ?? null;

    pollToUpdate.choices = data.choices.map((choiceUpdate) => {
      const existingChoice = pollToUpdate.choices.find(
        (c) => c.id === choiceUpdate.id,
      );
      if (existingChoice) {
        return {
          ...existingChoice,
          updatedAt: new Date(),
          date: choiceUpdate.date,
        };
      } else {
        return {
          id: this.nextId++,
          createdAt: new Date(),
          updatedAt: new Date(),
          date: choiceUpdate.date,
        };
      }
    });

    return Promise.resolve(pollToUpdate);
  }
}
