import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDetailsService } from 'src/user_details/user_details.service';
import { CreateUserDetailDto } from 'src/user_details/dto/create-user_detail.dto';
export declare class UsersController {
    private readonly usersService;
    private readonly usersDetailsService;
    constructor(usersService: UsersService, usersDetailsService: UserDetailsService);
    create(createUserDto: CreateUserDto & CreateUserDetailDto): Promise<{
        success: boolean;
        message: string;
        date: Date;
    }>;
    findAll(): Promise<{
        email: string;
        password: string;
        id: number;
        email_registered: boolean;
        created_at: Date;
    }[]>;
    findOne(id: string): Promise<{
        email: string;
        password: string;
        id: number;
        email_registered: boolean;
        created_at: Date;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): void;
    remove(id: string): void;
}
