import {
  Injectable,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "src/prisma.service";
import * as bcrypt from "bcrypt";
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    try {
      /**
       * hash user password before saving progress
       */
      const hashed = await bcrypt.hash(createUserDto.password, 10);
      
      return await this.prisma.users.create({
        data: {
          email: createUserDto.email,
          password: hashed,
          created_at: new Date(),
          email_registered: false,
        }
      });

    } catch (error) {
      throw error;
    } finally {
      this.prisma.$disconnect()
    }
  }

  async findAll() {
    try {
      return await this.prisma.users.findMany();
    } catch (error) {
      throw error;
    } finally {
      this.prisma.$disconnect()
    }
  }

  async findOne(id: string | number) {
    try {
      return await this.prisma.users.findUnique({ where: { id: Number(id) } });
    } catch (error) {
      throw error;
    } finally {
      this.prisma.$disconnect()
    }
  }

  async findBy(args: { email?: string; id?: number }) {
    try {
      return await this.prisma.users.findFirst({ where: args });
    } catch (error) {
      throw error;
    } finally {
      this.prisma.$disconnect()
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
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
