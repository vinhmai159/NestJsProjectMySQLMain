import { ExtractJwt,Strategy } from 'passport-jwt';
import * as jwt from 'jsonwebtoken';
import { Injectable, Req, Body } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { SerectKey } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: SerectKey.serect,
        });
    }

    async validate(payload: any): Promise<any> {
        return {
            userId: payload.id,
            email: payload.email
        }
    }
}
