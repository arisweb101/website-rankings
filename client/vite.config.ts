import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(), tailwindcss()],
    server: {
        host: 'localhost',
        port: 3000,
        open: true,
    },
    resolve: {
        alias: {
            '@': path.resolve('src'),
            '@components': path.resolve('src/components'),
            '@directives': path.resolve('src/directives'),
            '@assets': path.resolve('src/assets'),
            '@views': path.resolve('src/views'),
        },
    },
});
