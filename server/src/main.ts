import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { FastifyCookieOptions } from 'fastify-cookie'
import fastifyCookie from 'fastify-cookie'

import { AppModule } from './app.module'
import { AppService } from './app.service'
import { NotFoundExceptionFilter } from './filters/NotFoundException.filter'

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())

    await app.register(fastifyCookie, {
        secret: 'once upon a time in the west',
    } as FastifyCookieOptions)

    const appService = app.get(AppService)
    app.useGlobalFilters(new NotFoundExceptionFilter(appService))

    await app.listen(3000)
    console.log('Listening on port 3000')
}

void bootstrap()
