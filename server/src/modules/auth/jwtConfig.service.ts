import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModuleOptions } from '@nestjs/jwt'

@Injectable()
export class JwtConfigService {
    constructor(private config: ConfigService) {}

    public async createJwtOptions(): Promise<JwtModuleOptions> {
        return {
            publicKey: this.config.get('jwt.publicKey'),
            privateKey: this.config.get('jwt.privateKey'),
            verifyOptions: {
                algorithms: ['RS256'],
            },
            signOptions: {
                expiresIn: '1d',
                algorithm: 'RS256',
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
