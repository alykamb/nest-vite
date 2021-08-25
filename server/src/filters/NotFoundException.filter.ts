import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    NotFoundException,
} from '@nestjs/common'

import { AppService } from '../app.service'

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
    constructor(private appService: AppService) {}

    public catch(_exception: HttpException, host: ArgumentsHost): void {
        const ctx = host.switchToHttp()
        const res = ctx.getResponse()
        const req = ctx.getRequest()

        if (req.url.indexOf('/api/') === 0) {
            throw new NotFoundException()
        }

        const url = req.originalUrl.replace(/^\//, '')
        this.appService.getFile(url || 'index.html', res)
    }
}
