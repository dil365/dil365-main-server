import { Module } from '@nestjs/common';
import { WordsService } from './words.service';
import { WordsController } from './words.controller';
import { AiService } from 'src/common/ai/ai.service';
import { GrokService } from 'src/common/grok.service';
import { PrismaService } from 'src/common/prisma.service';
import { DeepSeekService } from 'src/common/deepseek.service';
import { TokenSessionsService } from 'src/common/token_sessions/token_sessions.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [WordsController],
  providers: [WordsService, AiService, GrokService, PrismaService, DeepSeekService, TokenSessionsService, JwtService],
})
export class WordsModule {}
