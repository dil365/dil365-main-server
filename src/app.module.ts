import { Module } from "@nestjs/common";
import { UsersModule } from "./api/users/users.module";
import { WordsModule } from './api/words/words.module';
@Module({
  imports: [UsersModule, WordsModule],
  providers: [],
})
export class AppModule {}
