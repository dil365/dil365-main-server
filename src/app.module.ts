import { Module } from "@nestjs/common";
import { UsersModule } from "./api/users/users.module";
@Module({
  imports: [UsersModule],
  providers: [],
})
export class AppModule {}
