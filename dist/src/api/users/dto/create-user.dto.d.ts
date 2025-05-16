export declare class CreateUserDto {
    id: number;
    email: string;
    password: string;
    email_registered: boolean;
    created_at: Date;
}
export declare class LoginUserDto {
    email: CreateUserDto['email'];
    password: CreateUserDto['password'];
}
