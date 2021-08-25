import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        port: 3001,
        host: 'localhost',
        hmr: {
            host: 'localhost',
            port: 3001,
            protocol: 'ws',
        },
    },
})
