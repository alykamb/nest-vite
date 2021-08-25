import { NestFactory } from '@nestjs/core'
import * as expressCookie from 'express-cookie'

import { AppModule } from './app.module'
import { AppService } from './app.service'
import { NotFoundExceptionFilter } from './filters/NotFoundException.filter'

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule)
    app.use(expressCookie())

    const appService = app.get(AppService)
    app.useGlobalFilters(new NotFoundExceptionFilter(appService))

    await app.listen(3000)
}

void bootstrap()
