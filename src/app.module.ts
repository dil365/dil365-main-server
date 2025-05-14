import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { UserDetailsModule } from "./user_details/user_details.module";
import { TokenSessionsModule } from "./token_sessions/token_sessions.module";

@Module({
  imports: [UsersModule, UserDetailsModule, TokenSessionsModule],
  providers: [],
})
export class AppModule {}
