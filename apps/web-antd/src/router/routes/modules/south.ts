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
      icon: 'ion:hardware-chip-sharp',
      order: 3,
      title: $t('south.system.title'),
    },
    name: 'South',
    path: '/south/group',
    children: [
      {
        name: 'Group',
        path: '/south/group',
        component: () => import('#/views/south/group/index.vue'),
        meta: {
          title: $t('south.system.group.title'),
        },
      },
      {
        name: 'Device',
        path: '/south/device/:id',
        component: () => import('#/views/south/device/index.vue'),
        meta: {
          activePath: '/south/group',
          hideInMenu: true,
          maxNumOfOpenTab: 3,
          title: $t('south.system.device.title'),
        },
      },
      {
        name: 'Variable',
        path: '/south/variable/:id',
        component: () => import('#/views/south/variable/index.vue'),
        meta: {
          activePath: '/south/group',
          hideInMenu: true,
          maxNumOfOpenTab: 3,
          title: $t('south.system.variable.title'),
        },
      },
      {
        name: 'Config',
        path: '/south/config/:id',
        component: () => import('#/views/south/config/index.vue'),
        meta: {
          activePath: '/south/group',
          hideInMenu: true,
          maxNumOfOpenTab: 3,
          title: $t('south.system.config.title'),
        },
      },
    ],
  },
];

export default routes;
