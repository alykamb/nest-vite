import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthGuard } from '@nestjs/passport'
import { Request, Response } from 'express'

import { JWT_COOKIE } from './modules/auth/jwt.constants'
import { JwtAuthGuard } from './modules/auth/jwt.guard'
import { RabbitMq } from './modules/rabbitmq/rabbitmq'

@Controller()
export class AppController {
    constructor(private jwtService: JwtService, private rabbitmq: RabbitMq) {}

    @Get('login')
    public async login(): Promise<any> {
        return 'login'
    }

    @UseGuards(AuthGuard('local'))
    @Post('api/login')
    public async apiLogin(@Req() req: Request & { user: any }, @Res() res: Response): Promise<any> {
        const tokenPayload = { id: req.user.userId, username: req.user.username }
        const signedJwt = this.jwtService.sign(tokenPayload)

        const expires = new Date()
        expires.setDate(expires.getDate() + 1)

        res.cookie(JWT_COOKIE, signedJwt, {
            // domain: '*.meucrediario.com.br', //* usar com domínio real
            expires,
            path: '/',
            httpOnly: true,
            sameSite: true,
            secure: false, //mudar para true se for https
        }).send(true)
    }

    @UseGuards(JwtAuthGuard)
    @Post('api/meaning')
    public async getMeaningOfLife(@Req() req: Request & { user: any }): Promise<number> {
        console.log(req.user)
        return 42
    }

    @Get('/probe/ready')
    public ready(): string {
        return 'service is ready'
    }

    @Get('/probe/healthy')
    public healthy(): string {
        return 'service is ready'
    }

    @Get('/probe/alive')
    public alive(): string {
        return 'service is ready'
    }

    @Post('/command/:name')
    public command(@Param('name') name: string, @Body() data: any): Promise<any> {
        return this.rabbitmq.sendCommand(name, data)
    }

    @Get('/results/:name')
    public results(@Param('name') name: string): Promise<any> {
        void this.rabbitmq.commandRunner(name, (obj: any) => `Hello ${obj.nome}`)
        return
    }
}
