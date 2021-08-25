import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { AuthService } from './auth.service'
import { JwtAuthGuard } from './jwt.guard'
import { JwtStrategy } from './jwt.strategy'
import { JwtConfigService } from './jwtConfig.service'
import { LocalStrategy } from './local.strategy'

@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            useClass: JwtConfigService,
        }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy, JwtAuthGuard],
    exports: [AuthService, JwtModule],
})
export class AuthModule {}
