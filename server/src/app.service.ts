import { Injectable } from '@nestjs/common'
import { FastifyReply } from 'fastify'
import { createReadStream } from 'fs'
import { lookup } from 'mime-types'
import { extname, join, resolve } from 'path'

@Injectable()
export class AppService {
    public sendStaticFile(requestedFile: string, res: FastifyReply, folder = ''): void {
        let clientDist = resolve(__dirname, '..', '..', 'client', folder)
        let fileName = requestedFile
        const ext = extname(fileName)

        // if it's not a file, send the index and let the spa handle the route (or 404)
        if (!ext.length) {
            fileName = 'index.html'
        }
        if (fileName === 'index.html') {
            clientDist = resolve(__dirname, '..', '..', 'client')
        }

        const type = lookup(extname(fileName))

        void res.header('Content-Type', type)
        void res.send(createReadStream(join(clientDist, fileName)))
    }

    public async getFile(requestedFile: string, res: FastifyReply): Promise<void> {
        if (process.env.NODE_ENV === 'production') {
            return this.sendStaticFile(requestedFile, res, 'dist')
        }
        return this.sendStaticFile(requestedFile, res)
    }
}
