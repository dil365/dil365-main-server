import { CreateUserDetailDto } from './dto/create-user_detail.dto';
import { UpdateUserDetailDto } from './dto/update-user_detail.dto';
import { PrismaService } from 'src/prisma.service';
export declare class UserDetailsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(id: number, createUserDetailDto: CreateUserDetailDto): Promise<{
        first_name: string;
        last_name: string;
        user_id: number;
        birthdate: Date | null;
    }>;
    findAll(): void;
    findOne(id: number): void;
    update(id: number, updateUserDetailDto: UpdateUserDetailDto): void;
    remove(id: number): void;
}
