import { TokenSessionsService } from './token_sessions.service';
import { CreateTokenSessionDto } from './dto/create-token_session.dto';
import { UpdateTokenSessionDto } from './dto/update-token_session.dto';
export declare class TokenSessionsController {
    private readonly tokenSessionsService;
    constructor(tokenSessionsService: TokenSessionsService);
    create(createTokenSessionDto: CreateTokenSessionDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateTokenSessionDto: UpdateTokenSessionDto): string;
    remove(id: string): string;
}
