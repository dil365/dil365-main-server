import { Module } from '@nestjs/common';
import { TokenSessionsService } from './token_sessions.service';
import { TokenSessionsController } from './token_sessions.controller';

@Module({
  controllers: [TokenSessionsController],
  providers: [TokenSessionsService],
})
export class TokenSessionsModule {}
