import { Injectable } from '@nestjs/common';
import { GrokService } from '../grok.service';
import { definationExamples, dealing, resolver } from 'src/assets/aiPresets';
import { DeepSeekService } from '../deepseek.service';

type MessageItemType = {
    role: 'system' | 'user',
    content: string
}

type MessagesType = MessageItemType[]
type AIResponseType = { message: string, result: any, success: boolean };

@Injectable()
export class AiService {
    constructor(private service: GrokService) { }
    async create(messages: MessagesType, options?: { model?: string, preInform?: MessagesType }) {
        try {
            return await this.service.client.chat.completions.create({
                model: options.model,
                messages: options.preInform ? [...options.preInform, ...messages] : messages,
            });
        } catch (error) {
            throw error;
        }
    }

    async JSONBridge(messages: MessagesType) {
        try {
            const result = await this.create(
                messages,
                {
                    model: this.service.availableModels['Grok_3'],
                    preInform: [
                        { role: 'system', content: dealing('User', 'english').topic },
                    ]
                }
            );
            const converted = result.choices.map(content => resolver({
                role: content.message.role,
                content: content.message.content
            }));
            return converted[0] as AIResponseType;
        } catch (error) {
            return {
                message: "Something went wrong",
                result: null,
                success: false,
                error,
            } as AIResponseType;
        }
    }
}
