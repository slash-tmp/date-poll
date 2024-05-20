import { Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';

@Module({
  providers: [
    {
      provide: PrismaService,
      useFactory() {
        if (process.env.DATABASE_URL) {
          return new PrismaService();
        }
      },
    },
  ],
  exports: [PrismaService],
})
export class PrismaModule {}
