import { registerAs } from '@nestjs/config';
import { createTestAccount } from 'nodemailer';

export default registerAs('mailer', async () => {
  const {
    MAILER_SMTP_HOST,
    MAILER_SMTP_PORT,
    MAILER_SMTP_SECURE,
    MAILER_USER,
    MAILER_PASSWORD,
  } = process.env;

  if (MAILER_SMTP_HOST && MAILER_SMTP_PORT && MAILER_USER && MAILER_PASSWORD) {
    return {
      smtp: {
        host: MAILER_SMTP_HOST,
        port: parseInt(MAILER_SMTP_PORT, 10),
        secure: MAILER_SMTP_SECURE === 'true',
      },
      auth: {
        user: MAILER_USER,
        pass: MAILER_PASSWORD,
      },
    };
  }

  console.log(
    '⚠️ Mailer configuration is missing or incomplete. Creating ethereal.email test account...',
  );
  const account = await createTestAccount();
  console.log('Using test account : ', account.user);

  return {
    auth: {
      user: account.user,
      pass: account.pass,
    },
    smtp: {
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
    },
  };
});
