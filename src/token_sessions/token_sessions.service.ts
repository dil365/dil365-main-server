import { Injectable } from '@nestjs/common';
import { CreateTokenSessionDto } from './dto/create-token_session.dto';
import { UpdateTokenSessionDto } from './dto/update-token_session.dto';

@Injectable()
export class TokenSessionsService {
  create(createTokenSessionDto: CreateTokenSessionDto) {
    return 'This action adds a new tokenSession';
  }

  findAll() {
    return `This action returns all tokenSessions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tokenSession`;
  }

  update(id: number, updateTokenSessionDto: UpdateTokenSessionDto) {
    return `This action updates a #${id} tokenSession`;
  }

  remove(id: number) {
    return `This action removes a #${id} tokenSession`;
  }
}
