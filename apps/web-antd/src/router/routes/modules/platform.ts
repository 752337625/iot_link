/**
 * @description 系统管理
 */
import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'icon-park-outline:system',
      order: 6,
      title: $t('platform.system.title'),
    },
    name: 'Platform',
    path: '/platform',
    children: [
      {
        name: 'Server',
        path: '/platform/server',
        component: () => import('#/views/platform/server/index.vue'),
        meta: {
          title: $t('platform.system.server.title'),
        },
      },
    ],
  },
];

export default routes;
