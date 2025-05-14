import { UserDetailsService } from './user_details.service';
import { UpdateUserDetailDto } from './dto/update-user_detail.dto';
export declare class UserDetailsController {
    private readonly userDetailsService;
    constructor(userDetailsService: UserDetailsService);
    findAll(): void;
    findOne(id: string): void;
    update(id: string, updateUserDetailDto: UpdateUserDetailDto): void;
    remove(id: string): void;
}
