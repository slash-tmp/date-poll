import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

import {
  adminPollFixture,
  createPollDtoFixture,
  databasePollFixture,
  publicPollFixture,
  updatePollDtoFixture,
} from '../../test/fixtures';
import { ChoiceDoesNotExistError } from './errors';
import { PollsService } from './polls.service';
import { PollRepository } from './repositories/poll.repository';

describe('PollsService', () => {
  let pollsService: PollsService;
  let pollRepository: DeepMockProxy<PollRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PollsService,
        {
          provide: PollRepository,
          useValue: mockDeep<PollRepository>(),
        },
      ],
    }).compile();

    pollsService = module.get<PollsService>(PollsService);
    pollRepository = module.get<DeepMockProxy<PollRepository>>(PollRepository);
  });

  describe('createPoll', () => {
    it('create and return poll', async () => {
      pollRepository.create.mockResolvedValue(databasePollFixture);
      await expect(
        pollsService.createPoll(createPollDtoFixture),
      ).resolves.toEqual(adminPollFixture);
    });
  });

  describe('getAdminPoll', () => {
    it('returns existing poll', async () => {
      pollRepository.findByAdminUid.mockResolvedValue(databasePollFixture);
      await expect(
        pollsService.getAdminPoll('JpqviwUSYa6P3Tbhb4iwc'),
      ).resolves.toEqual(adminPollFixture);
    });

    it('returns null when poll is not found', async () => {
      pollRepository.findByAdminUid.mockResolvedValue(null);
      await expect(pollsService.getAdminPoll('unknown-uid')).resolves.toEqual(
        null,
      );
    });
  });

  describe('getPublicPoll', () => {
    it('returns existing poll', async () => {
      pollRepository.findByPublicUid.mockResolvedValue(databasePollFixture);
      await expect(
        pollsService.getPublicPoll('-WSaWDoushkIFEWJqg_1Q'),
      ).resolves.toEqual(publicPollFixture);
    });

    it('returns null when poll is not found', async () => {
      pollRepository.findByPublicUid.mockResolvedValue(null);
      await expect(pollsService.getPublicPoll('unknown-uid')).resolves.toEqual(
        null,
      );
    });
  });

  describe('deletePoll', () => {
    it('returns deleted poll', async () => {
      pollRepository.deleteByAdminUid.mockResolvedValue(databasePollFixture);
      await expect(
        pollsService.deletePoll('-WSaWDoushkIFEWJqg_1Q'),
      ).resolves.toEqual(adminPollFixture);
    });

    it('returns null when poll is not found', async () => {
      pollRepository.deleteByAdminUid.mockResolvedValue(null);
      await expect(pollsService.deletePoll('unknown-uid')).resolves.toEqual(
        null,
      );
    });
  });

  describe('updatePoll', () => {
    it('returns null when poll is not found', async () => {
      pollRepository.findByAdminUid.mockResolvedValue(null);
      await expect(
        pollsService.updatePoll('unknown-uid', updatePollDtoFixture),
      ).resolves.toEqual(null);
    });

    it('throws when updated choice id does not exist', async () => {
      pollRepository.findByAdminUid.mockResolvedValue(databasePollFixture);
      await expect(
        pollsService.updatePoll('JpqviwUSYa6P3Tbhb4iwc', {
          ...updatePollDtoFixture,
          choices: [
            {
              id: 12,
              date: new Date(),
            },
          ],
        }),
      ).rejects.toThrow(ChoiceDoesNotExistError);
    });

    it('updates poll if it exists', async () => {
      pollRepository.findByAdminUid.mockResolvedValue(databasePollFixture);
      pollRepository.updateByAdminUid.mockResolvedValue({
        ...databasePollFixture,
        title: 'Updated title',
      });

      await expect(
        pollsService.updatePoll('JpqviwUSYa6P3Tbhb4iwc', updatePollDtoFixture),
      ).resolves.toEqual({
        ...adminPollFixture,
        title: 'Updated title',
      });
    });
  });
});
