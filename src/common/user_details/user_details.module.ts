import { Module } from '@nestjs/common';
import { UserDetailsService } from './user_details.service';
import { PrismaService } from 'src/common/prisma.service';

@Module({
  providers: [UserDetailsService, PrismaService],
})
export class UserDetailsModule {}
