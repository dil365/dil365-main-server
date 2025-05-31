import {
  IsEmail,
  IsNotEmpty,
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

export class LoginUserDto {
  @IsEmail()
  email: CreateUserDto['email']
  
  @IsNotEmpty()
  password: CreateUserDto['password']
}