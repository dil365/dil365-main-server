import { Injectable } from '@nestjs/common';
import { CreateUserDetailDto } from './dto/create-user_detail.dto';
import { UpdateUserDetailDto } from './dto/update-user_detail.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserDetailsService {
  constructor(private prisma: PrismaService) { }
  async create(id: number, createUserDetailDto: CreateUserDetailDto) {
    try {
      return await this.prisma.userDetails.create({
        data: {
          user_id: id,
          first_name: createUserDetailDto.first_name,
          last_name: createUserDetailDto.last_name,
          birthdate: createUserDetailDto.birthdate
        }
      });
    } catch (error) {
      throw error;
    } finally {
      this.prisma.$disconnect()
    }
  }

  findAll() {
    try {

    } catch (error) {
      throw error;
    } finally {
      this.prisma.$disconnect()
    }
  }

  findOne(id: number) {
    try {

    } catch (error) {
      throw error;
    } finally {
      this.prisma.$disconnect()
    }
  }

  update(id: number, updateUserDetailDto: UpdateUserDetailDto) {
    try {

    } catch (error) {
      throw error;
    } finally {
      this.prisma.$disconnect()
    }
  }

  remove(id: number) {
    try {

    } catch (error) {
      throw error;
    } finally {
      this.prisma.$disconnect()
    }
  }
}
