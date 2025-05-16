import { CanActivate, ExecutionContext } from '@nestjs/common';
import { TokenSessionsService } from 'src/common/token_sessions/token_sessions.service';
export declare class AuthGuard implements CanActivate {
    private session;
    constructor(session: TokenSessionsService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
