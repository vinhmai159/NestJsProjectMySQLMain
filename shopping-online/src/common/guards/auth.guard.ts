import { Injectable, CanActivate, ExecutionContext, HttpStatus, HttpException } from '@nestjs/common';
import { Observable } from 'rxjs';

import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        let token = request.headers['x-access-token'] || request.headers['authorization'];
        // console.log(request.headers);
        if (token) {
            const user = await this.validateToken(token);
            request.user = user;
        } else {
            throw new HttpException('Auth token is not supplied', HttpStatus.BAD_REQUEST);
        }
        return true;
    }

    async validateToken(token: string) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, 'abc132', (err, decoded) => {
                if (err) {
                    return reject(new HttpException(err.toString(), HttpStatus.BAD_REQUEST));
                }
                return resolve(decoded);
            });
        });
    }
}
