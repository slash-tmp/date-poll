import { Injectable } from '@nestjs/common';

import { AdminPoll } from './dto/admin-poll.dto';
import { CreatePollDto } from './dto/create-poll.dto';
import { PublicPoll } from './dto/public-poll.dto';
import {
  Poll as RawPoll,
  PollRepository,
} from './repositories/poll.repository';

@Injectable()
export class PollsService {
  constructor(private readonly pollRepository: PollRepository) {}

  async createPoll(data: CreatePollDto): Promise<AdminPoll> {
    const poll = await this.pollRepository.create(data);
    return this.rawPollToAdminPoll(poll);
  }

  async getAdminPoll(adminUid: string): Promise<AdminPoll | null> {
    const poll = await this.pollRepository.findByAdminUid(adminUid);
    if (!poll) return null;
    return this.rawPollToAdminPoll(poll);
  }

  private rawPollToAdminPoll(poll: RawPoll): AdminPoll {
    return {
      id: poll.id,
      createdAt: poll.createdAt,
      adminUid: poll.adminUid,
      publicUid: poll.publicUid,
      title: poll.title,
      description: poll.description,
      endDate: poll.endDate,
      hideVotes: poll.hideVotes,
      notifyOnResponse: poll.notifyOnResponse,
      adminEmail: poll.adminEmail,
      adminName: poll.adminName,
      choices: poll.choices.map((c) => ({ id: c.id, date: c.date })),
      respondents: poll.respondents.map((respondent) => ({
        id: respondent.id,
        name: respondent.name,
        responses: respondent.responses.map((response) => ({
          id: response.id,
          choiceId: response.choiceId,
          value: response.value,
        })),
      })),
    };
  }

  async getPublicPoll(publicUid: string): Promise<PublicPoll | null> {
    const poll = await this.pollRepository.findByPublicUid(publicUid);
    if (!poll) return null;
    return this.rawPollToPublicPoll(poll);
  }

  private rawPollToPublicPoll(poll: RawPoll): PublicPoll {
    return {
      id: poll.id,
      createdAt: poll.createdAt,
      publicUid: poll.publicUid,
      title: poll.title,
      description: poll.description,
      endDate: poll.endDate,
      adminName: poll.adminName,
      choices: poll.choices.map((c) => ({ id: c.id, date: c.date })),
      respondents: poll.respondents.map((respondent) => ({
        id: respondent.id,
        name: respondent.name,
        responses: respondent.responses.map((response) => ({
          id: response.id,
          choiceId: response.choiceId,
          value: response.value,
        })),
      })),
    };
  }

  public async deletePoll(adminUid: string): Promise<AdminPoll | null> {
    const deletedPoll = await this.pollRepository.deleteByAdminUid(adminUid);
    if (!deletedPoll) return null;
    return this.rawPollToAdminPoll(deletedPoll);
  }
}
