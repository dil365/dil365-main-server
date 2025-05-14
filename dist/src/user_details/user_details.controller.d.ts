import { UserDetailsService } from './user_details.service';
import { CreateUserDetailDto } from './dto/create-user_detail.dto';
import { UpdateUserDetailDto } from './dto/update-user_detail.dto';
export declare class UserDetailsController {
    private readonly userDetailsService;
    constructor(userDetailsService: UserDetailsService);
    create(createUserDetailDto: CreateUserDetailDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateUserDetailDto: UpdateUserDetailDto): string;
    remove(id: string): string;
}
