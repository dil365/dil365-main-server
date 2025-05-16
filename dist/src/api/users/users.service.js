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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma.service");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserDto) {
        try {
            const hashed = await bcrypt.hash(createUserDto.password, parseInt(process.env.BCRYPT_SALT_VALUE));
            return await this.prisma.users.create({
                data: {
                    email: createUserDto.email,
                    password: hashed,
                    created_at: new Date(),
                    email_registered: false,
                }
            });
        }
        catch (error) {
            throw error;
        }
        finally {
            this.prisma.$disconnect();
        }
    }
    async findAll() {
        try {
            return await this.prisma.users.findMany();
        }
        catch (error) {
            throw error;
        }
        finally {
            this.prisma.$disconnect();
        }
    }
    async findOne(id) {
        try {
            return await this.prisma.users.findUnique({ where: { id: Number(id) } });
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
            return await this.prisma.users.findFirst({ where: args });
        }
        catch (error) {
            throw error;
        }
        finally {
            this.prisma.$disconnect();
        }
    }
    async findByLogin(args) {
        try {
            const user = await this.findBy({ email: args.email });
            if (user) {
                const compare = await bcrypt.compare(args.password, user.password);
                if (compare) {
                    return this.filter(user);
                }
            }
            return null;
        }
        catch (error) {
            throw error;
        }
        finally {
            this.prisma.$disconnect();
        }
    }
    update(id, updateUserDto) {
        try {
        }
        catch (error) {
            throw error;
        }
        finally {
            this.prisma.$disconnect();
        }
    }
    remove(id) {
        try {
        }
        catch (error) {
            throw error;
        }
        finally {
            this.prisma.$disconnect();
        }
    }
    filter(data) {
        delete data['password'];
        delete data['email_registered'];
        return data;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map