import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-jwt'

import { JWT_COOKIE } from './jwt.constants'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private config: ConfigService) {
        super({
            jwtFromRequest: (req: Request) => {
                return req.headers?.['cookie']
                    ?.split('; ')
                    .find((value) => value.indexOf(JWT_COOKIE) === 0)
                    ?.split('=')[1]
            },
            ignoreExpiration: false,
            secretOrKey: config.get('jwt.publicKey'),
        })
    }

    /**
     * Recebe o token se descriptografou com sucesso.
     * Aqui é o lugar em que mais informações podem ser injetadas pro back usar
     */
    public async validate(payload: any): Promise<any> {
        return { userId: payload.userId, username: payload.username }
    }
}
