import { spawn } from 'child_process'
import { resolve } from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = __filename.replace(/\/[^\/]*$/, '')

spawn(`cd ${resolve(__dirname, '../server')} && yarn start`, {
    shell: true,
    stdio:'inherit',
});


spawn(`cd ${resolve(__dirname, '../client')} && yarn start`, {
    shell: true,
    stdio:'inherit'
});