import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { PrismaService } from "src/common/prisma.service";
import { UserDetailsService } from "src/common/user_details/user_details.service";
import { TokenSessionsService } from "src/common/token_sessions/token_sessions.service";
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService, 
    UserDetailsService, 
    JwtService,
    TokenSessionsService,
    PrismaService,
  ],
  imports: [],
})
export class UsersModule {}
