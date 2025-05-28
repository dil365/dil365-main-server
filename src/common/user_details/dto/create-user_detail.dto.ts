import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDetailDto {
    user_id?: number;
    
    @IsString()
    @IsNotEmpty()
    first_name: string;
    
    @IsString()
    @IsNotEmpty()
    last_name: string;
    
    @IsNotEmpty()
    @IsDateString()
    birthdate?: Date
}
