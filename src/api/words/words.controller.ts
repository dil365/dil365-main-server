import { Controller, Post, Body, Request, InternalServerErrorException, UseGuards, HttpStatus, HttpCode } from '@nestjs/common';
import { WordsService } from './words.service';
import { CreateWordDto, CreateWordSettingsDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) { }

  @Post('/generate')
  @UseGuards(AuthGuard)
  async generate(@Body() createWordDto: CreateWordDto) {
    try {
      createWordDto.already_learned = (await this.wordsService.getAllWords())
        .filter(item => item.level === createWordDto.settings.level || item.syntactic === createWordDto.settings.syntactic)
        .map(item => item.word)

      const response = await this.wordsService.generateNewWords(createWordDto);
      if (response) {
        console.log('reactived')
        await this.generate(createWordDto);
      }
    } catch (error) {
      throw new InternalServerErrorException({ message: error.message });
    }
  }
  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  async create(@Body() createWordSettingsDto: CreateWordSettingsDto, @Request() req) {
    const result = await this.wordsService.setWords(createWordSettingsDto, req.user.id || null);
    return {
      id: result.id,
      message: "Done",
      success: true
    }
  }

  // @Get()
  // @HttpCode(HttpStatus.OK)
  // @UseGuards(AuthGuard)
  // async findAll() {
  //   const result = await this.wordsService.getAllWords();
  //   return {
  //     message: "Done",
  //     success: true,
  //     result
  //   };
  // }
}
