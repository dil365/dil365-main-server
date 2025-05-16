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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const token_sessions_service_1 = require("../common/token_sessions/token_sessions.service");
let AuthGuard = class AuthGuard {
    session;
    constructor(session) {
        this.session = session;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const token_split = req.headers.authorization?.split(' ');
        const token = token_split[1];
        if (token_split[0] === 'Bearer') {
            try {
                const payload = await this.session.verify({ token });
                req.user = { auth: payload };
                return true;
            }
            catch (e) {
                throw new common_1.UnauthorizedException('Invalid token');
            }
        }
        throw new common_1.UnauthorizedException('Invalid token');
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [token_sessions_service_1.TokenSessionsService])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map