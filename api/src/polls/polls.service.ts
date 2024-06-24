import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sortBy, uniqBy } from 'lodash';
import slugify from 'slugify';

import { MailerService } from '../mailer/mailer.service';
import { AdminPoll } from './dto/admin-poll.dto';
import { CreatePollDto } from './dto/create-poll.dto';
import { PublicPoll } from './dto/public-poll.dto';
import { RespondToPollDto } from './dto/respond-to-poll.dto';
import { UpdatePollDto, UpdatePollDtoChoice } from './dto/update-poll.dto';
import { ChoiceDoesNotExistError } from './errors';
import { CannotChangeChoiceDateError } from './errors/cannot-change-choice-date.error';
import { DuplicateChoiceResponseError } from './errors/duplicate-choice-response.error';
import {
  Poll as RawPoll,
  PollRepository,
} from './repositories/poll.repository';

@Injectable()
export class PollsService {
  constructor(
    private readonly pollRepository: PollRepository,
    private readonly mailerService: MailerService,
    private readonly config: ConfigService,
  ) {}

  async createPoll(data: CreatePollDto): Promise<AdminPoll> {
    const poll = await this.pollRepository.create(data);
    return this.rawPollToAdminPoll(poll);
  }

  async sendSuccessfulPollCreationEmail(poll: AdminPoll): Promise<void> {
    const websiteBaseUrl = this.config.get('WEBSITE_BASE_URL');

    const adminLink = `${websiteBaseUrl}/poll/admin/${poll.adminUid}`;
    const slug = slugify(poll.title, { lower: true, strict: true });
    const publicLink = `${websiteBaseUrl}/poll/${poll.publicUid}/${slug}`;

    const subject = `Sondage créé : ${poll.title}`;
    const text = `Le sondage "${poll.title}" a bien été créé.

Lien d'administration : ${adminLink}
Lien de partage : ${publicLink}`;

    await this.mailerService.sendEmail(poll.adminEmail, subject, text);
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
      publicUid: poll.publicUid,
      title: poll.title,
      description: poll.description,
      endDate: poll.endDate,
      hideVotes: poll.hideVotes,
      adminName: poll.adminName,
      choices: poll.choices.map((c) => ({ id: c.id, date: c.date })),
      respondents: poll.hideVotes
        ? undefined
        : poll.respondents.map((respondent) => ({
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

  public async updatePoll(
    adminUid: string,
    data: UpdatePollDto,
  ): Promise<AdminPoll | null> {
    const pollToUpdate = await this.pollRepository.findByAdminUid(adminUid);

    if (!pollToUpdate) {
      return null;
    }

    // Validate updated choices
    const existingChoiceIds = pollToUpdate.choices.map((c) => c.id);
    const updatedChoices = data.choices.filter(
      (c) => c.id,
    ) as Required<UpdatePollDtoChoice>[];
    for (const updatedChoice of updatedChoices) {
      if (!existingChoiceIds.includes(updatedChoice.id)) {
        throw new ChoiceDoesNotExistError(updatedChoice.id);
      }

      const existingChoice = pollToUpdate.choices.find(
        (c) => c.id === updatedChoice.id,
      );
      if (
        existingChoice &&
        existingChoice.date.getTime() !== updatedChoice.date.getTime()
      ) {
        throw new CannotChangeChoiceDateError(
          existingChoice.id,
          existingChoice.date,
          updatedChoice.date,
        );
      }
    }

    const updatedPoll = await this.pollRepository.updateByAdminUid(
      adminUid,
      data,
    );
    if (!updatedPoll) return null;
    return this.rawPollToAdminPoll(updatedPoll);
  }

  async getPollsByEmail(adminEmail: string): Promise<AdminPoll[]> {
    const polls = await this.pollRepository.findManyByAdminEmail(adminEmail);
    return polls.map(this.rawPollToAdminPoll);
  }

  async sendPollListByEmail(to: string, polls: AdminPoll[]): Promise<void> {
    const websiteBaseUrl = this.config.get('WEBSITE_BASE_URL');

    const getPollLine = (poll: AdminPoll) => {
      const adminLink = `${websiteBaseUrl}/poll/admin/${poll.adminUid}`;
      return `- ${poll.title} : ${adminLink}`;
    };

    const sortedPolls = sortBy(polls, 'createdAt');

    const subject = `Vos sondages`;
    const text = `Bonjour, vous avez demandé la liste des sondages créés avec l'addresse ${to} :
${sortedPolls.map(getPollLine).join('\n')}`;

    await this.mailerService.sendEmail(to, subject, text);
  }

  async addResponseToPoll(publicUid: string, body: RespondToPollDto) {
    const poll = await this.pollRepository.findByPublicUid(publicUid);
    if (!poll) {
      throw new Error('Poll not found');
    }

    // Check only choices from poll are present
    const availableChoiceIds = poll.choices.map((choice) => choice.id);
    body.responses.forEach((response) => {
      if (!availableChoiceIds.includes(response.choiceId)) {
        throw new ChoiceDoesNotExistError(response.choiceId);
      }
    });

    // Check there are no duplicate choices
    if (uniqBy(body.responses, 'choiceId').length !== body.responses.length) {
      throw new DuplicateChoiceResponseError();
    }

    await this.pollRepository.addResponse(publicUid, body);
  }
}
