import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/admin/create-shipment': {
                target: 'http://localhost:5000',
                changeOrigin: true,
            },
            '/admin/update-tracking': {
                target: 'http://localhost:5000',
                changeOrigin: true,
            },
            '/admin/all-shipments': {
                target: 'http://localhost:5000',
                changeOrigin: true,
            },
            '/admin/shipment': {
                target: 'http://localhost:5000',
                changeOrigin: true,
            },
            '/admin/profile': {
                target: 'http://localhost:5000',
                changeOrigin: true,
            },
            '/track/': {
                target: 'http://localhost:5000',
                changeOrigin: true,
            },
        },
    },
})
