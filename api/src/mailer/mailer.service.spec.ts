import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import nodemailer, { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import { MailerService } from './mailer.service';

describe('PollsService', () => {
  let mailerService: MailerService;
  let transporter: DeepMockProxy<Transporter>;

  beforeEach(async () => {
    transporter = mockDeep<Transporter<SMTPTransport.SentMessageInfo>>();
    jest.spyOn(nodemailer, 'createTransport').mockReturnValue(transporter);

    const module: TestingModule = await Test.createTestingModule({
      providers: [MailerService],
    }).compile();

    mailerService = module.get<MailerService>(MailerService);
  });

  describe('sendEmail', () => {
    it('sends a mail', async () => {
      transporter.sendMail.mockResolvedValue(null);

      jest.replaceProperty(process, 'env', {
        MAILER_USER: 'do-not-reply@date-poll.com',
      });

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
