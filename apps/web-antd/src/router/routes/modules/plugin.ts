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
      icon: 'carbon:application-web',
      order: 4,
      title: $t('plugin.system.title'),
    },
    name: 'Plugin',
    path: '/plugin',
    children: [
      {
        name: 'Manage',
        path: '/plugin/manage',
        component: () => import('#/views/plugin/manage/index.vue'),
        meta: {
          title: $t('plugin.system.manage.title'),
        },
      },
      {
        name: 'Template',
        path: '/plugin/template',
        component: () => import('#/views/plugin/template/index.vue'),
        meta: {
          title: $t('plugin.system.template.title'),
        },
      },
    ],
  },
];

export default routes;
