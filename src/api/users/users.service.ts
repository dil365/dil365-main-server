import {
  Injectable,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "src/common/prisma.service";
import * as argon2 from "argon2";
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    try {
      /**
       * hash user password before saving progress
       */
      const hashed = await argon2.hash(createUserDto.password);

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

  async findBy(args: { email?: string; id?: number }, withDetails: boolean = false) {
    try {
      return await this.prisma.users.findFirst({ where: args, include: {UserDetails: withDetails} });
    } catch (error) {
      throw error;
    } finally {
      this.prisma.$disconnect()
    }
  }

  async findByLogin(args: { email: string; password: string }) {
    try {
      const user = await this.findBy({ email: args.email });
      if (user) {
        /**
         * compile user hashed password with password value
        */
        const compare = await argon2.verify(user.password, args.password);
        if (compare) {
          return this.filter(user);
        }
      }
      return null;
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

  filter(data: CreateUserDto){
    delete data['password'];
    delete data['email_registered'];
    return data;
  }
}
