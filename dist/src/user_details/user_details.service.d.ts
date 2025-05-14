import { CreateUserDetailDto } from './dto/create-user_detail.dto';
import { UpdateUserDetailDto } from './dto/update-user_detail.dto';
export declare class UserDetailsService {
    create(createUserDetailDto: CreateUserDetailDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateUserDetailDto: UpdateUserDetailDto): string;
    remove(id: number): string;
}
