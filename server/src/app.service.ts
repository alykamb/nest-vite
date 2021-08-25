import { Injectable } from '@nestjs/common'
import axios from 'axios'
import { Response } from 'express'
import { lookup } from 'mime-types'
import { extname, join, resolve } from 'path'

@Injectable()
export class AppService {
    public sendStaticFile(requestedFile: string, res: Response): void {
        const fileName = requestedFile
        const clientDist = resolve(__dirname, '..', '..', 'client', 'dist')
        res.sendFile(join(clientDist, fileName))
    }

    public getFileFromVite(requestedFile: string, res: Response): void {
        if (requestedFile === 'index.html') {
            const fileName = requestedFile
            const clientDist = resolve(__dirname, '..', '..', 'client')
            res.sendFile(join(clientDist, fileName))
            return
        }
        //quebra o caminho do arquivo para usar a extensão verdadeira, não a da query string
        let extension = extname(requestedFile.split('?')[0])
        //troca de ts pra js
        if (extension === '.ts') {
            extension = '.js'
        }

        const mimeType = lookup(extension) || 'application/javascript'

        res.setHeader('Content-Type', mimeType)
        void axios(`http://localhost:3001/${requestedFile}`, {
            method: 'GET',
            responseType: 'stream',
        }).then((response) => response?.data.pipe(res))
    }

    public getFile(requestedFile: string, res: Response): void {
        if (process.env.NODE_ENV === 'production') {
            return this.sendStaticFile(requestedFile, res)
        }
        return this.getFileFromVite(requestedFile, res)
    }
}
