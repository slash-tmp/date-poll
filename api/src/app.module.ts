import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import commonConfig from './config/common.config';
import mailerConfig from './config/mailer.config';
import { PollsModule } from './polls/polls.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mailerConfig, commonConfig],
    }),
    PrismaModule,
    PollsModule,
  ],
})
export class AppModule {}
