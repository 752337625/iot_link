import type { App } from 'vue';

import VueLazyLoad from 'vue3-lazyload';

import Image_404 from './assets/error/image-404.png';

export function vue3Lazyload(app: App) {
  // 图片懒加载
  app.use(VueLazyLoad, {
    loading: Image_404,
    error: Image_404,
  });
}
