import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

import {
  adminPollFixture,
  adminPollListFixture,
  createPollDtoFixture,
  databasePollFixture,
  databasePollListFixture,
  publicPollFixture,
  updatePollDtoFixture,
} from '../../test/fixtures';
import { MailerService } from '../mailer/mailer.service';
import { ChoiceDoesNotExistError } from './errors';
import { CannotChangeChoiceDateError } from './errors/cannot-change-choice-date.error';
import { PollsService } from './polls.service';
import { PollRepository } from './repositories/poll.repository';

describe('PollsService', () => {
  let pollsService: PollsService;
  let pollRepository: DeepMockProxy<PollRepository>;
  let mailerService: DeepMockProxy<MailerService>;
  let configService: DeepMockProxy<ConfigService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PollsService,
        {
          provide: PollRepository,
          useValue: mockDeep<PollRepository>(),
        },
        {
          provide: MailerService,
          useValue: mockDeep<MailerService>(),
        },
        {
          provide: ConfigService,
          useValue: mockDeep<ConfigService>(),
        },
      ],
    }).compile();

    pollsService = module.get<PollsService>(PollsService);
    pollRepository = module.get<DeepMockProxy<PollRepository>>(PollRepository);
    mailerService = module.get<DeepMockProxy<MailerService>>(MailerService);
    configService = module.get<DeepMockProxy<ConfigService>>(ConfigService);
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
      pollRepository.findByAdminUid.mockResolvedValueOnce(null);
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

    it('throws when updated choice date is changed', async () => {
      pollRepository.findByAdminUid.mockResolvedValue(databasePollFixture);
      await expect(
        pollsService.updatePoll('JpqviwUSYa6P3Tbhb4iwc', {
          ...updatePollDtoFixture,
          choices: [
            {
              id: 9,
              date: new Date('2024-05-14T23:45:00.000Z'),
            },
          ],
        }),
      ).rejects.toThrow(CannotChangeChoiceDateError);
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

  describe('sendSuccessfulPollCreationEmail', () => {
    it('sends a confirmation email', async () => {
      configService.get.mockReturnValueOnce('http://localhost:3000');
      await pollsService.sendSuccessfulPollCreationEmail(adminPollFixture);
      expect(mailerService.sendEmail).toHaveBeenCalledWith(
        `bob@domain.com`,
        `Sondage créé : Trip to the museum`,
        `Le sondage "Trip to the museum" a bien été créé.

Lien d'administration : http://localhost:3000/poll/admin/JpqviwUSYa6P3Tbhb4iwc
Lien de partage : http://localhost:3000/poll/-WSaWDoushkIFEWJqg_1Q/trip-to-the-museum`,
      );
    });
  });

  describe('getPollsByEmail', () => {
    it('returns existing poll', async () => {
      pollRepository.findManyByAdminEmail.mockResolvedValue(
        databasePollListFixture,
      );
      await expect(
        pollsService.getPollsByEmail('bob@domain.com'),
      ).resolves.toEqual(adminPollListFixture);
    });
  });

  describe('sendPollListByEmail', () => {
    it('send an email containing the list of polls ordered by creation date', async () => {
      configService.get.mockReturnValueOnce('http://localhost:3000');
      
      await pollsService.sendPollListByEmail(
        'bob@domain.com',
        adminPollListFixture,
      );
      expect(mailerService.sendEmail).toHaveBeenCalledWith(
        'bob@domain.com',
        'Vos sondages',
        `Bonjour, vous avez demandé la liste des sondages créés avec l'addresse bob@domain.com :
- My first poll : http://localhost:3000/poll/admin/admin-uid-3
- My second poll : http://localhost:3000/poll/admin/admin-uid-5
- My third poll : http://localhost:3000/poll/admin/admin-uid-4`,
      );
    });
  });
});
