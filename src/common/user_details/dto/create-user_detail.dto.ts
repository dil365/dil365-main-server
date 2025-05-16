import { IsString } from "class-validator";

export class CreateUserDetailDto {
    user_id?: number;
    
    @IsString()
    first_name: string;
    
    @IsString()
    last_name: string;
    
    birthdate?: Date
}
