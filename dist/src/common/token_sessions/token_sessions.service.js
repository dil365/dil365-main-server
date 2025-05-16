"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenSessionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const jwt_1 = require("@nestjs/jwt");
let TokenSessionsService = class TokenSessionsService {
    prisma;
    jwt;
    constructor(prisma, jwt) {
        this.prisma = prisma;
        this.jwt = jwt;
    }
    #expiredTimesMinute(created_for) {
        switch (created_for) {
            case 'access_token':
                return 60;
            case 'refresh_token':
                return 3600;
            default:
                return 5;
        }
    }
    async create(user_id, createTokenSessionDto) {
        try {
            const exist = await this.findBy({ owner_id: user_id, created_for: createTokenSessionDto.created_for });
            const expiresIn = this.#expiredTimesMinute(createTokenSessionDto.created_for);
            const expiresInDate = new Date();
            expiresInDate.setMinutes(expiresInDate.getMinutes() + expiresIn);
            const token = await this.jwt.signAsync(createTokenSessionDto.payload, {
                secret: process.env.JWT_TOKEN_SECRET,
                expiresIn: `${expiresIn}m`,
            });
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
            }
            else {
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
            return {
                token,
                expiresIn
            };
        }
        catch (error) {
            throw error;
        }
        finally {
            this.prisma.$disconnect();
        }
    }
    async verify(args) {
        try {
            const session = await this.prisma.tokenSessions.findFirst({
                where: { token: args.token }
            });
            if (!session) {
                return null;
            }
            const result = await this.jwt.verifyAsync(args.token, {
                secret: process.env.JWT_TOKEN_SECRET
            });
            if (!result) {
                await this.prisma.tokenSessions.delete({
                    where: {
                        id: session.id
                    }
                });
                return null;
            }
            return session;
        }
        catch (error) {
            throw error;
        }
        finally {
            this.prisma.$disconnect();
        }
    }
    async findBy(args) {
        try {
            return await this.prisma.tokenSessions.findFirst({ where: args });
        }
        catch (error) {
            throw error;
        }
        finally {
            this.prisma.$disconnect();
        }
    }
    async remove(id) {
        try {
            return await this.prisma.tokenSessions.delete({ where: { id } });
        }
        catch (error) {
            throw error;
        }
        finally {
            this.prisma.$disconnect();
        }
    }
};
exports.TokenSessionsService = TokenSessionsService;
exports.TokenSessionsService = TokenSessionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, jwt_1.JwtService])
], TokenSessionsService);
//# sourceMappingURL=token_sessions.service.js.map