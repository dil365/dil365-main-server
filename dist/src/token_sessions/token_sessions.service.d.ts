import { CreateTokenSessionDto } from './dto/create-token_session.dto';
import { UpdateTokenSessionDto } from './dto/update-token_session.dto';
export declare class TokenSessionsService {
    create(createTokenSessionDto: CreateTokenSessionDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateTokenSessionDto: UpdateTokenSessionDto): string;
    remove(id: number): string;
}
