import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import { AuthGuard } from '@nestjs/passport';
import { FastifyRequest as Request } from 'fastify';

import { ALLOW_GUEST, jwtConstants } from '../constants';
import { TokenService } from '../services/token.service';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
    constructor(
        protected jwtService: JwtService,
        protected reflector: Reflector,
        protected tokenService: TokenService,
    ) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(ALLOW_GUEST, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        const request = this.getRequest(context);
        const requestToken = this.extractTokenFromHeader(request);
        if (!requestToken) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(requestToken, {
                secret: jwtConstants.access_secret,
            });
            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            request.user = payload;
        } catch {
            // TODO: 无痛刷新
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

    getRequest(context: ExecutionContext) {
        return context.switchToHttp().getRequest();
    }

    getResponse(context: ExecutionContext) {
        return context.switchToHttp().getResponse();
    }
}
