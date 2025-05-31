import { Injectable } from '@nestjs/common';
import { CreateTokenSessionDto } from './dto/create-token_session.dto';
import { UpdateTokenSessionDto } from './dto/update-token_session.dto';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenSessionsService {
  constructor(private prisma: PrismaService, private jwt: JwtService) { }

  #expiredTimesMinute(created_for: CreateTokenSessionDto['created_for']) {
    switch (created_for) {
      case 'access_token':
        return 60;
      case 'refresh_token':
        return 3600;
      default:
        return 5;
    }
  }

  async create(user_id: CreateTokenSessionDto['owner_id'], createTokenSessionDto: CreateTokenSessionDto) {
    try {
      /**
       * Check if already have token by created_for
       */
      const exist = await this.findBy({ owner_id: user_id, created_for: createTokenSessionDto.created_for })

      /**
       * Parse expires dates to string and date type
       */
      const expiresIn = this.#expiredTimesMinute(createTokenSessionDto.created_for);
      const expiresInDate = new Date();
      expiresInDate.setMinutes(expiresInDate.getMinutes() + expiresIn);


      /**
       * Generate token with credentials
       */
      const token = await this.jwt.signAsync(createTokenSessionDto.payload, {
        secret: process.env.JWT_TOKEN_SECRET,
        expiresIn: `${expiresIn}m`,
      });

      /**
       * Set values to `TokenSessions` table
       */
      if (exist) {
        await this.prisma.tokenSessions.update({
          where: {
            id: exist.id
          },
          data: {
            token,
            expired_in: expiresInDate,
            created_at: new Date(),
          }
        });
      } else {
        await this.prisma.tokenSessions.create({
          data: {
            token,
            created_for: createTokenSessionDto.created_for,
            expired_in: expiresInDate,
            created_at: new Date(),
            owner_id: user_id,
          }
        });
      }
      /**
       * Return session data;
       */
      return {
        token,
        expiresIn
      };
    } catch (error) {
      throw error;
    } finally {
      this.prisma.$disconnect();
    }
  }

  async verify(args: { token: CreateTokenSessionDto['token'] }) {
    try {
      /*
       * Look for is there any session with the token;
       * - If token not found than return null;
       * */
      const session = await this.prisma.tokenSessions.findFirst({
        where: { token: args.token }
      });
      if (!session) {
        return null;
      }

      /*
       * Verify the token via jwt and must be async progress;
       * - If verifing faild return null and remove token session from `TokenSessions` table;
       * */
      try {
        const result: CreateTokenSessionDto['payload'] = await this.jwt.verifyAsync(args.token, {
          secret: process.env.JWT_TOKEN_SECRET
        });
        if (!result) {
          throw new Error('Something went wrong')
        }
      } catch(error) {
        await this.prisma.tokenSessions.delete({
          where: {
            id: session.id
          }
        });
        throw error;
      }

      /*
       * Return session data;
       * */
      return session;
    } catch (error) {
      throw error;
    } finally {
      this.prisma.$disconnect();
    }
  }

  async findBy(args: {
    created_for?: CreateTokenSessionDto['created_for'],
    owner_id?: CreateTokenSessionDto['owner_id'],
    token?: CreateTokenSessionDto['token'],
    id?: CreateTokenSessionDto['id'],
  }) {
    try {
      return await this.prisma.tokenSessions.findFirst({ where: args });
    } catch (error) {
      throw error;
    } finally {
      this.prisma.$disconnect()
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.tokenSessions.delete({ where: { id } })
    } catch (error) {
      throw error;
    } finally {
      this.prisma.$disconnect()
    }
  }
}
