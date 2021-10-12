import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-jwt'

import { JWT_COOKIE, JWT_SECRET } from './jwt.constants'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: (req: Request) => {
                return req.headers?.['cookie']
                    ?.split('; ')
                    .find((value) => value.indexOf(JWT_COOKIE) === 0)
                    ?.split('=')[1]
            },
            ignoreExpiration: false,
            secretOrKey: JWT_SECRET,
        })
    }

    public async validate(payload: any): Promise<any> {
        return { userId: payload.userId, username: payload.username }
    }
}
