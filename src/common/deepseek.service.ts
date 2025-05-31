import { Injectable, OnModuleInit } from '@nestjs/common';
import { OpenAI } from 'openai';

@Injectable()
export class DeepSeekService extends OpenAI implements OnModuleInit {
  client: OpenAI;
  availableModels = {
    "DeepSeek-V3": "deepseek-chat",
    "DeepSeek-R1": "deepseek-reasoner",
    "DeepSeek-V3-0324": "deepseek-v3-0324",
    "DeepSeek-R1-0528": "deepseek-r1-0528",
  };
  async onModuleInit() {
    this.client = new OpenAI({
      apiKey: process.env.DEEPSEEK_API_KEY,
      baseURL: process.env.DEEPSEEK_BASE_URL
    });
  }
}

