import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

import { CreatePollDto } from './dto/create-poll.dto';
import { PollsController } from './polls.controller';
import { AdminPoll, PollsService, PublicPoll } from './polls.service';

const createPollDtoFixture: CreatePollDto = {
  title: 'Trip to the museum',
  description: 'We are going to the natural history museum.',
  choices: [
    {
      date: new Date('2024-05-14T23:13:27.986Z'),
    },
  ],
  hideVotes: true,
  endDate: new Date('2024-05-14T23:13:27.986Z'),
  notifyOnResponse: true,
  adminName: 'Bob Bobbington',
  adminEmail: 'bob@domain.com',
};

const adminPollFixture: AdminPoll = {
  id: 3,
  adminUid: 'JpqviwUSYa6P3Tbhb4iwc',
  publicUid: '-WSaWDoushkIFEWJqg_1Q',
  title: 'Trip to the museum',
  description: 'We are going to the natural history museum.',
  endDate: new Date('2024-05-14T23:13:27.986Z'),
  hideVotes: true,
  notifyOnResponse: true,
  adminEmail: 'bob@domain.com',
  adminName: 'Bob Bobbington',
  choices: [
    {
      id: 9,
      date: new Date('2024-05-14T23:13:27.986Z'),
    },
  ],
  respondents: [],
};

const publicPollFixture: PublicPoll = {
  id: 3,
  publicUid: '-WSaWDoushkIFEWJqg_1Q',
  title: 'Trip to the museum',
  description: 'We are going to the natural history museum.',
  endDate: new Date('2024-05-14T23:13:27.986Z'),
  adminName: 'Bob Bobbington',
  choices: [
    {
      id: 9,
      date: new Date('2024-05-14T23:13:27.986Z'),
    },
  ],
  respondents: [],
};

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
    it('create a poll', () => {
      pollsService.createPoll.mockResolvedValue(adminPollFixture);

      expect(controller.createPoll(createPollDtoFixture)).resolves.toEqual(
        adminPollFixture,
      );
    });
  });

  describe('getPublicPoll', () => {
    it('throw when poll is not found', () => {
      pollsService.getPublicPoll.mockResolvedValue(null);

      expect(controller.getPublicPoll('unknown-uid')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('returns existing poll', () => {
      pollsService.getPublicPoll.mockResolvedValue(publicPollFixture);
      expect(
        controller.getPublicPoll('-WSaWDoushkIFEWJqg_1Q'),
      ).resolves.toEqual(publicPollFixture);
    });
  });

  describe('getAdminPoll', () => {
    it('throw when poll is not found', () => {
      pollsService.getAdminPoll.mockResolvedValue(null);

      expect(controller.getAdminPoll('unknown-uid')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('returns existing poll', () => {
      pollsService.getAdminPoll.mockResolvedValue(adminPollFixture);
      expect(controller.getAdminPoll('-WSaWDoushkIFEWJqg_1Q')).resolves.toEqual(
        adminPollFixture,
      );
    });
  });
});
