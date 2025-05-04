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
      title: $t('north.system.title'),
    },
    name: 'North',
    path: '/north/mqtt-client',
    children: [
      {
        name: 'MqttClient',
        path: '/north/mqtt-client',
        component: () => import('#/views/north/mqtt-client/index.vue'),
        meta: {
          title: $t('north.system.mqtt-client.title'),
        },
      },
    ],
  },
];

export default routes;
