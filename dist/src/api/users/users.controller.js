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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const user_details_service_1 = require("../../common/user_details/user_details.service");
const token_sessions_service_1 = require("../../common/token_sessions/token_sessions.service");
let UsersController = class UsersController {
    usersService;
    usersDetailsService;
    tokenSessionsService;
    constructor(usersService, usersDetailsService, tokenSessionsService) {
        this.usersService = usersService;
        this.usersDetailsService = usersDetailsService;
        this.tokenSessionsService = tokenSessionsService;
    }
    async create(createUserDto) {
        const exist = await this.usersService.findBy({ email: createUserDto.email });
        if (exist) {
            throw new common_1.ConflictException();
        }
        const created_user = await this.usersService.create(createUserDto);
        const created_user_detail = await this.usersDetailsService.create(created_user.id, createUserDto);
        return {
            success: true,
            message: "Done",
            date: created_user.created_at
        };
    }
    async login(loginUserDto) {
        const user = await this.usersService.findByLogin(loginUserDto);
        if (!user) {
            throw new common_1.ForbiddenException({
                message: "Email or password is worng!"
            });
        }
        const access_token = await this.tokenSessionsService.create(user.id, {
            created_for: 'access_token',
            payload: {
                email: user.email,
                id: user.id
            },
        });
        return access_token;
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)('/register'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.LoginUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        user_details_service_1.UserDetailsService,
        token_sessions_service_1.TokenSessionsService])
], UsersController);
//# sourceMappingURL=users.controller.js.map