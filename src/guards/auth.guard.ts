import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenSessionsService } from 'src/common/token_sessions/token_sessions.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private session: TokenSessionsService) { }
    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();
        const token_split = req.headers.authorization?.split(' ');
        const token = token_split[1];
        if (token_split[0] === 'Bearer') {
            try {
                //const payload = await this.jwt.verifyAsync(token, { secret: process.env.JWT_TOKEN_SECRET });
                const payload = await this.session.verify({ token })
                req.user = { auth: payload };
                return true;
            } catch (e) {
                throw new UnauthorizedException('Invalid token');
            }
        }
        throw new UnauthorizedException('Invalid token');
    }
}
