"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDetailsModule = void 0;
const common_1 = require("@nestjs/common");
const user_details_service_1 = require("./user_details.service");
const user_details_controller_1 = require("./user_details.controller");
const prisma_service_1 = require("../prisma.service");
let UserDetailsModule = class UserDetailsModule {
};
exports.UserDetailsModule = UserDetailsModule;
exports.UserDetailsModule = UserDetailsModule = __decorate([
    (0, common_1.Module)({
        controllers: [user_details_controller_1.UserDetailsController],
        providers: [user_details_service_1.UserDetailsService, prisma_service_1.PrismaService],
    })
], UserDetailsModule);
//# sourceMappingURL=user_details.module.js.map