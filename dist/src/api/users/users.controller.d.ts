import { UsersService } from './users.service';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { UserDetailsService } from 'src/common/user_details/user_details.service';
import { CreateUserDetailDto } from 'src/common/user_details/dto/create-user_detail.dto';
import { TokenSessionsService } from 'src/common/token_sessions/token_sessions.service';
export declare class UsersController {
    private readonly usersService;
    private readonly usersDetailsService;
    private readonly tokenSessionsService;
    constructor(usersService: UsersService, usersDetailsService: UserDetailsService, tokenSessionsService: TokenSessionsService);
    create(createUserDto: CreateUserDto & CreateUserDetailDto): Promise<{
        success: boolean;
        message: string;
        date: Date;
    }>;
    login(loginUserDto: LoginUserDto): Promise<{
        token: string;
        expiresIn: number;
    }>;
}
