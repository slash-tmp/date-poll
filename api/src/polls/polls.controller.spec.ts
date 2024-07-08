import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

import {
  adminPollFixture,
  adminPollListFixture,
  createPollDtoFixture,
  databasePollFixture,
  publicPollFixture,
  respondToPollDtoFixture,
  unknownIdRespondToPollDtoFixture,
  updatePollDtoFixture,
} from '../../test/fixtures';
import { ChoiceDoesNotExistError } from './errors';
import { CannotChangeChoiceDateError } from './errors/cannot-change-choice-date.error';
import { PollsController } from './polls.controller';
import { PollsService } from './polls.service';

describe('PollsController', () => {
  let controller: PollsController;
  let pollsService: DeepMockProxy<PollsService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PollsController],
      providers: [
        {
          provide: PollsService,
          useValue: mockDeep<PollsService>(),
        },
      ],
    }).compile();

    controller = module.get<PollsController>(PollsController);
    pollsService = module.get(PollsService);
  });

  describe('createPoll', () => {
    it('create a poll', async () => {
      pollsService.createPoll.mockResolvedValue(adminPollFixture);

      await expect(
        controller.createPoll(createPollDtoFixture),
      ).resolves.toEqual(adminPollFixture);
      expect(pollsService.sendSuccessfulPollCreationEmail).toHaveBeenCalledWith(
        adminPollFixture,
      );
    });
  });

  describe('getPublicPoll', () => {
    it('throw when poll is not found', async () => {
      pollsService.getPublicPoll.mockResolvedValue(null);

      await expect(controller.getPublicPoll('unknown-uid')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('returns existing poll', async () => {
      pollsService.getPublicPoll.mockResolvedValue(publicPollFixture);
      await expect(
        controller.getPublicPoll('-WSaWDoushkIFEWJqg_1Q'),
      ).resolves.toEqual(publicPollFixture);
    });
  });

  describe('respondToPoll', () => {
    it('adds the response to the poll and sends email', async () => {
      pollsService.getPublicPoll.mockResolvedValue(publicPollFixture);
      pollsService.addResponseToPoll.mockResolvedValue({
        poll: databasePollFixture,
        respondent: databasePollFixture.respondents[0],
      });
      await controller.respondToPoll('some-poll', respondToPollDtoFixture);
      expect(pollsService.addResponseToPoll).toHaveBeenCalledWith(
        'some-poll',
        respondToPollDtoFixture,
      );
      expect(pollsService.sendNewResponseEmail).toHaveBeenCalledWith(
        databasePollFixture,
        databasePollFixture.respondents[0],
      );
    });

    it('adds the response to the poll and does not send email', async () => {
      pollsService.getPublicPoll.mockResolvedValue(publicPollFixture);
      pollsService.addResponseToPoll.mockResolvedValue({
        poll: { ...databasePollFixture, notifyOnResponse: false },
        respondent: databasePollFixture.respondents[0],
      });
      await controller.respondToPoll('some-poll', respondToPollDtoFixture);
      expect(pollsService.addResponseToPoll).toHaveBeenCalledWith(
        'some-poll',
        respondToPollDtoFixture,
      );
      expect(pollsService.sendNewResponseEmail).not.toHaveBeenCalled();
    });

    it('throws when poll is not found', async () => {
      pollsService.getPublicPoll.mockResolvedValue(null);

      await expect(
        controller.respondToPoll('unknown-uid', respondToPollDtoFixture),
      ).rejects.toThrow(NotFoundException);
    });

    it('throws BadRequestException when invalid choiceId is given', async () => {
      pollsService.getPublicPoll.mockResolvedValue(publicPollFixture);
      pollsService.addResponseToPoll.mockRejectedValue(
        new ChoiceDoesNotExistError(-123),
      );
      await expect(
        controller.respondToPoll('some-poll', unknownIdRespondToPollDtoFixture),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('getAdminPoll', () => {
    it('throw when poll is not found', async () => {
      pollsService.getAdminPoll.mockResolvedValue(null);

      await expect(controller.getAdminPoll('unknown-uid')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('returns existing poll', async () => {
      pollsService.getAdminPoll.mockResolvedValue(adminPollFixture);
      await expect(
        controller.getAdminPoll('JpqviwUSYa6P3Tbhb4iwc'),
      ).resolves.toEqual(adminPollFixture);
    });
  });

  describe('deletePoll', () => {
    it('throw when poll is not found', async () => {
      pollsService.deletePoll.mockResolvedValue(null);

      await expect(controller.deletePoll('unknown-uid')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('deletes existing poll', async () => {
      pollsService.deletePoll.mockResolvedValue(adminPollFixture);
      await expect(
        controller.deletePoll('JpqviwUSYa6P3Tbhb4iwc'),
      ).resolves.toBeUndefined();
    });
  });

  describe('updatePoll', () => {
    it('throws when poll is not found', async () => {
      pollsService.updatePoll.mockResolvedValue(null);

      await expect(
        controller.updatePoll('unknown-uid', updatePollDtoFixture),
      ).rejects.toThrow(NotFoundException);
    });

    it('updates existing poll', async () => {
      pollsService.updatePoll.mockResolvedValue(adminPollFixture);
      await expect(
        controller.updatePoll('JpqviwUSYa6P3Tbhb4iwc', updatePollDtoFixture),
      ).resolves.toEqual(adminPollFixture);
    });

    it('throws BadRequestException when a choice does not exist on the poll', async () => {
      pollsService.updatePoll.mockRejectedValue(
        new ChoiceDoesNotExistError(12),
      );
      await expect(
        controller.updatePoll('JpqviwUSYa6P3Tbhb4iwc', updatePollDtoFixture),
      ).rejects.toThrow(BadRequestException);
    });

    it("throws BadRequestException when attempting to update exsting choice's date", async () => {
      pollsService.updatePoll.mockRejectedValue(
        new CannotChangeChoiceDateError(12, new Date(), new Date()),
      );
      await expect(
        controller.updatePoll('JpqviwUSYa6P3Tbhb4iwc', updatePollDtoFixture),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('requestPollListEmail', () => {
    it('send an email if polls are found', async () => {
      pollsService.getPollsByEmail.mockResolvedValue(adminPollListFixture);
      await controller.requestPollListEmail({ adminEmail: 'bob@domain.com' });
      expect(pollsService.sendPollListByEmail).toHaveBeenCalledWith(
        'bob@domain.com',
        adminPollListFixture,
      );
    });

    it('does not send an email if no polls are found', async () => {
      pollsService.getPollsByEmail.mockResolvedValue([]);
      await controller.requestPollListEmail({ adminEmail: 'bobby@domain.com' });
      expect(pollsService.sendPollListByEmail).not.toHaveBeenCalled();
    });
  });
});
