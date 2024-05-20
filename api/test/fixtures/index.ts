import { AdminPoll } from '../../src/polls/dto/admin-poll.dto';
import { CreatePollDto } from '../../src/polls/dto/create-poll.dto';
import { PublicPoll } from '../../src/polls/dto/public-poll.dto';
import { UpdatePollDto } from '../../src/polls/dto/update-poll.dto';
import { Poll } from '../../src/polls/repositories/poll.repository';

export const createPollDtoFixture: CreatePollDto = {
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

export const updatePollDtoFixture: UpdatePollDto = {
  title: 'Trip to the museum',
  description: 'We are going to the natural history museum.',
  choices: [
    {
      date: new Date('2024-05-14T23:13:27.986Z'),
    },
    {
      id: 9,
      date: new Date('2024-05-14T23:13:27.986Z'),
    },
  ],
  hideVotes: true,
  endDate: new Date('2024-05-14T23:13:27.986Z'),
  notifyOnResponse: true,
  adminName: 'Bob Bobbington',
};

export const adminPollFixture: AdminPoll = {
  id: 3,
  createdAt: new Date('2024-05-14T23:13:27.986Z'),
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
  respondents: [
    {
      id: 12,
      name: 'Alice',
      responses: [
        {
          id: 21,
          choiceId: 9,
          value: 'MAYBE',
        },
      ],
    },
  ],
};

export const publicPollFixture: PublicPoll = {
  id: 3,
  createdAt: new Date('2024-05-14T23:13:27.986Z'),
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
  respondents: [
    {
      id: 12,
      name: 'Alice',
      responses: [
        {
          id: 21,
          choiceId: 9,
          value: 'MAYBE',
        },
      ],
    },
  ],
};

export const databasePollFixture: Poll = {
  id: 3,
  updatedAt: new Date('2024-05-14T23:13:27.986Z'),
  createdAt: new Date('2024-05-14T23:13:27.986Z'),
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
      updatedAt: new Date('2024-05-14T23:13:27.986Z'),
      createdAt: new Date('2024-05-14T23:13:27.986Z'),
      date: new Date('2024-05-14T23:13:27.986Z'),
    },
  ],
  respondents: [
    {
      id: 12,
      createdAt: new Date('2024-05-14T23:13:27.986Z'),
      updatedAt: new Date('2024-05-14T23:13:27.986Z'),
      name: 'Alice',
      responses: [
        {
          id: 21,
          createdAt: new Date('2024-05-14T23:13:27.986Z'),
          updatedAt: new Date('2024-05-14T23:13:27.986Z'),
          choiceId: 9,
          value: 'MAYBE',
        },
      ],
    },
  ],
};
