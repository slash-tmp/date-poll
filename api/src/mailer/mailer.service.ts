import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { readFileSync } from 'fs';
import Handlebars from 'handlebars';
import mjml2html from 'mjml';
import { createTransport, getTestMessageUrl, Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { resolve } from 'path';

import mailerConfig from '../config/mailer.config';

@Injectable()
export class MailerService {
  private readonly transporter: Transporter<SMTPTransport.SentMessageInfo>;

  constructor(
    @Inject(mailerConfig.KEY)
    private readonly config: ConfigType<typeof mailerConfig>,
  ) {
    this.transporter = createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: config.smtp.secure,
      auth: {
        user: config.auth.user,
        pass: config.auth.pass,
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
        from: this.config.auth.user,
        subject,
        text,
        html,
      })
      .then((info) => {
        info && console.log(getTestMessageUrl(info));
      });
  }

  /**
   * @param templateName Name of the MJML template to be compiled
   * @param data Variables to be included in the email
   * @returns A string of HTML
   */
  public renderMailTemplate(
    templateName: string,
    data: Record<string, any>,
  ): string {
    const mjmlPath = resolve(__dirname, `../../templates/${templateName}.mjml`);
    const mjml = readFileSync(mjmlPath, 'utf-8');
    const result = mjml2html(mjml, {
      filePath: mjmlPath,
      preprocessors: [
        (xml) => {
          const hbarsTemplate = Handlebars.compile(xml);
          const compiledTemplate = hbarsTemplate(data);
          return compiledTemplate;
        },
      ],
    });

    return result.html;
  }
}
