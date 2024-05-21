import { Injectable } from '@nestjs/common';
import { createTransport, getTestMessageUrl, Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

@Injectable()
export class MailerService {
  private readonly transporter: Transporter<SMTPTransport.SentMessageInfo>;

  constructor() {
    this.transporter = createTransport({
      host: process.env.MAILER_SMTP_HOST,
      port: Number(process.env.MAILER_SMTP_PORT),
      secure: process.env.MAILER_SMTP_SECURE === 'true',
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASSWORD,
      },
    });
  }

  public async sendEmail(
    to: string,
    subject: string,
    text: string,
    html?: string,
  ): Promise<void> {
    await this.transporter
      .sendMail({
        to,
        from: process.env.MAILER_USER,
        subject,
        text,
        html,
      })
      .then((info) => {
        info && console.log(getTestMessageUrl(info));
      });
  }
}
