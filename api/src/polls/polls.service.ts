import { Injectable } from '@nestjs/common';

import { CreatePollDto } from './dto/create-poll.dto';
import {
  Poll as RawPoll,
  PollRepository,
} from './repositories/poll.repository';

interface Choice {
  id: number;
  date: Date;
}

interface Response {
  id: number;
  choiceId: number;
  value: 'YES' | 'MAYBE' | 'NO';
}

interface Respondent {
  id: number;
  name: string;
  responses: Response[];
}

export interface PublicPoll {
  id: number;
  publicUid: string;
  title: string;
  description: string | null;
  endDate: Date | null;
  adminName: string | null;

  choices: Choice[];
  respondents?: Respondent[];
}

export interface AdminPoll extends PublicPoll {
  adminUid: string;
  notifyOnResponse: boolean;
  adminEmail: string;
  hideVotes: boolean;

  respondents: Respondent[];
}

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
}
