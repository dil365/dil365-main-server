import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TokenSessionsService } from './token_sessions.service';
import { CreateTokenSessionDto } from './dto/create-token_session.dto';
import { UpdateTokenSessionDto } from './dto/update-token_session.dto';

@Controller('token-sessions')
export class TokenSessionsController {
  constructor(private readonly tokenSessionsService: TokenSessionsService) {}

  @Post()
  create(@Body() createTokenSessionDto: CreateTokenSessionDto) {
    return this.tokenSessionsService.create(createTokenSessionDto);
  }

  @Get()
  findAll() {
    return this.tokenSessionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tokenSessionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTokenSessionDto: UpdateTokenSessionDto) {
    return this.tokenSessionsService.update(+id, updateTokenSessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tokenSessionsService.remove(+id);
  }
}
