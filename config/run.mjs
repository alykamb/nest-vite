import { spawn } from 'child_process'
import { readFile } from 'fs/promises'
import { resolve } from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = __filename.replace(/\/[^\/]*$/, '')

const [publicKey, privateKey] = await Promise.all([
    readFile(resolve(__dirname, './jwtKey.key'), {encoding: 'utf8'}),
    readFile(resolve(__dirname, './jwtKey.key.pub'), {encoding: 'utf8'}),
])

process.env.JWT_PUBLIC_KEY = publicKey.toString('utf-8')
process.env.JWT_PRIVATE_KEY = privateKey.toString('utf-8')

spawn(`cd ${resolve(__dirname, '../server')} && yarn start`, {
    shell: true,
    stdio:'inherit',
});


spawn(`cd ${resolve(__dirname, '../client')} && yarn start`, {
    shell: true,
    stdio:'inherit'
});