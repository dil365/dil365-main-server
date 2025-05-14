import {
  IsEmail,
  IsStrongPassword,
} from "class-validator";

export class CreateUserDto {
  id: number;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
  
  email_registered: boolean;
  
  created_at: Date;
}
