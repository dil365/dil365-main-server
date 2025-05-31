import { Module } from '@nestjs/common';
import { GrokService } from '../grok.service';
import { DeepSeekService } from '../deepseek.service';
@Module({
  providers: [GrokService, DeepSeekService],
})
export class AiModule { }
