import { Module } from '@nestjs/common';
import { TokenSessionsService } from './token_sessions.service';
import { PrismaService } from 'src/common/prisma.service';
@Module({
  providers: [TokenSessionsService, PrismaService],
})
export class TokenSessionsModule { }
