import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "src/prisma.service";
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        email: string;
        password: string;
        id: number;
        email_registered: boolean;
        created_at: Date;
    }>;
    findAll(): Promise<{
        email: string;
        password: string;
        id: number;
        email_registered: boolean;
        created_at: Date;
    }[]>;
    findOne(id: string | number): Promise<{
        email: string;
        password: string;
        id: number;
        email_registered: boolean;
        created_at: Date;
    }>;
    findBy(args: {
        email?: string;
        id?: number;
    }): Promise<{
        email: string;
        password: string;
        id: number;
        email_registered: boolean;
        created_at: Date;
    }>;
    update(id: number, updateUserDto: UpdateUserDto): void;
    remove(id: number): void;
}
