import { ConflictException, Injectable } from '@nestjs/common';
import { CreateWordDto, CreateWordSettingsDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { AiService } from 'src/common/ai/ai.service';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class WordsService {
  constructor(private ai: AiService, private prisma: PrismaService) { }

  async generateNewWords(data: CreateWordDto) {
    try {
      const for_example_for_you = {
        sl: "en",
        tl: "fr",
        word: "Apple",
        level: "A1",
        definition: "Apple is a type of fruite",
        syntactic: "noun",
        example: "She have an apple on her bag.",
        category: "Daily Life"
      } as CreateWordDto['settings'];

      const response = await this.ai.JSONBridge([
        {
          role: 'user',
          content: JSON.stringify({
            message: `Lets learn new words from dictonary, give me ${data.count} words by selected settings`,
            already_learned: data.already_learned || ["this is filter for you dont return already learned words"],
            new_words: ['add new words to here'],
            requested_word: data.settings,
            for_example_for_you,
          })
        }
      ]);      
      response.result.new_words.forEach(async (item) => {
        try {
          await this.setWords(item);
        } catch(err) {
          console.error(err)
        }
      })
      return response;
    } catch (error) {
      throw error;
    }
  }
  async setWords(data: CreateWordSettingsDto) {
    try {
      const already_exist = await this.prisma.words.findFirst({ where: { word: data.word, level: data.level, syntactic: data.syntactic } });
      if (!already_exist){
        return await this.prisma.words.create({
          data: {
            word: data.word,
            description: data.definition,
            level: data.level,
            syntactic: data.syntactic,
            sl: data.sl || "en",
            example: data.example,
            category: data.category
          }
        });
      }
      throw new ConflictException(`'${data.word}' already exist`);
    } catch (error) {
      throw error;
    } finally {
      this.prisma.$disconnect();
    }
  }
  async getAllWords() {
    return await this.prisma.words.findMany();
  }
}
