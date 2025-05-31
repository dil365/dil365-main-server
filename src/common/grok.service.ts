import { Injectable, OnModuleInit } from '@nestjs/common';
import { OpenAI } from 'openai';

@Injectable()
export class GrokService extends OpenAI implements OnModuleInit {
  client: OpenAI;
  availableModels = {
    "Grok_3": "grok-3",
    "Grok_3_Mini": "grok-3-mini",
    "Grok_3_Think": "grok-3-think",
    "Grok_3_Mini_Think": "grok-3-mini-think",
    "Grok-beta": "grok-beta",
    "Grok-vision-beta": "grok-vision-beta",
    "Grok-2": "grok-2",
    "Grok-2_Mini": "grok-2-mini",
    "Grok-2-1212": "grok-2-1212",
    "Grok-2-vision-1212": "grok-2-vision-1212",
  };
  async onModuleInit() {
    this.client = new OpenAI({
      apiKey: process.env.GROK_API_KEY,
      baseURL: process.env.GROK_BASE_URL
    });
  }
}

