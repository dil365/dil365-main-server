import { Module } from '@nestjs/common';
import { UserDetailsService } from './user_details.service';
import { UserDetailsController } from './user_details.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [UserDetailsController],
  providers: [UserDetailsService, PrismaService],
})
export class UserDetailsModule {}
