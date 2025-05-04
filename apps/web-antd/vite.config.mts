import { defineConfig } from '@vben/vite-config';

export default defineConfig(async () => {
  return {
    application: {},
    vite: {
      server: {
        proxy: {
          '/api': {
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, '/api'),
            // mock代理目标地址
            target: 'http://192.168.101.99:8126',
            ws: true,
          },
          '/mqtt': {
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/mqtt/, '/mqtt'),
            // mock代理目标地址
            target: 'http://192.168.101.99:8126',
            ws: true,
          },
        },
      },
    },
  };
});
