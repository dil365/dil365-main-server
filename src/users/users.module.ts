import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { PrismaService } from "src/prisma.service";
import { UserDetailsService } from "src/user_details/user_details.service";

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserDetailsService,PrismaService],
  imports: [],
})
export class UsersModule {}
