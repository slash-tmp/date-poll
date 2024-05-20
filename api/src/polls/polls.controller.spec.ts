import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

import {
  adminPollFixture,
  createPollDtoFixture,
  publicPollFixture,
  updatePollDtoFixture,
} from '../../test/fixtures';
import { ChoiceDoesNotExistError } from './errors';
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
  });
});
