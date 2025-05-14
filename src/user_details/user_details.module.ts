import { Module } from '@nestjs/common';
import { UserDetailsService } from './user_details.service';
import { UserDetailsController } from './user_details.controller';

@Module({
  controllers: [UserDetailsController],
  providers: [UserDetailsService],
})
export class UserDetailsModule {}
