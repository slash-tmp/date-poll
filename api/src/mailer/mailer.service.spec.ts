import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import nodemailer, { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import mailerConfig from '../config/mailer.config';
import { MailerService } from './mailer.service';

describe('PollsService', () => {
  let mailerService: MailerService;
  let transporter: DeepMockProxy<Transporter>;

  beforeEach(async () => {
    transporter = mockDeep<Transporter<SMTPTransport.SentMessageInfo>>();
    jest.spyOn(nodemailer, 'createTransport').mockReturnValue(transporter);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailerService,
        {
          provide: mailerConfig.KEY,
          useValue: {
            smtp: {
              host: 'smtp.domain.com',
              port: 587,
              secure: false,
            },
            auth: {
              user: 'do-not-reply@date-poll.com',
              pass: 'password',
            },
          },
        },
      ],
    }).compile();

    mailerService = module.get<MailerService>(MailerService);
  });

  describe('sendEmail', () => {
    it('sends a mail', async () => {
      transporter.sendMail.mockResolvedValue(null);

      await mailerService.sendEmail(
        'user@domain.com',
        'Mail subject',
        'Raw text content',
        '<p>Html content</p>',
      );

      expect(transporter.sendMail).toHaveBeenCalledWith({
        from: 'do-not-reply@date-poll.com',
        to: 'user@domain.com',
        subject: 'Mail subject',
        text: 'Raw text content',
        html: '<p>Html content</p>',
      });
    });
  });
});
