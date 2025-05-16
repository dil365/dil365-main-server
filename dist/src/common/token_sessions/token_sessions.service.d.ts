import { CreateTokenSessionDto } from './dto/create-token_session.dto';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
export declare class TokenSessionsService {
    #private;
    private prisma;
    private jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
    create(user_id: CreateTokenSessionDto['owner_id'], createTokenSessionDto: CreateTokenSessionDto): Promise<{
        token: string;
        expiresIn: number;
    }>;
    verify(args: {
        token: CreateTokenSessionDto['token'];
    }): Promise<{
        id: number;
        created_for: string;
        token: string;
        expired_in: Date;
        created_at: Date;
        owner_id: number;
    }>;
    findBy(args: {
        created_for?: CreateTokenSessionDto['created_for'];
        owner_id?: CreateTokenSessionDto['owner_id'];
        token?: CreateTokenSessionDto['token'];
        id?: CreateTokenSessionDto['id'];
    }): Promise<{
        id: number;
        created_for: string;
        token: string;
        expired_in: Date;
        created_at: Date;
        owner_id: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        created_for: string;
        token: string;
        expired_in: Date;
        created_at: Date;
        owner_id: number;
    }>;
}
