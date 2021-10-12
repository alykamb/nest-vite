import { Injectable } from '@nestjs/common'
import { JwtModuleOptions } from '@nestjs/jwt'
import { JWT_SECRET } from './jwt.constants'

@Injectable()
export class JwtConfigService {
    constructor() {}

    public async createJwtOptions(): Promise<JwtModuleOptions> {
        return {
            secret: JWT_SECRET,
            verifyOptions: {
                algorithms: ['HS256'],
            },
            signOptions: {
                expiresIn: '1d',
                algorithm: 'HS256',
            },
        }
    }
}

/**
 * equivalente ao provider com factory:
 */

// useFactory: (config: ConfigService) => {
//     return {
//         publicKey: config.get('jwt.publicKey'),
//         privateKey: config.get('jwt.privateKey'),
//         verifyOptions: {
//             algorithms: ['RS256'],
//         },
//         signOptions: {
//             expiresIn: '1d',
//             algorithm: 'RS256',
//         },
//     }
// },
// inject: [ConfigService]
