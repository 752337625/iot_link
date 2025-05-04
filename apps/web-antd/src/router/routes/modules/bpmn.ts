import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'flowbite:shuffle-solid',
      order: 2,
      title: $t('bpmn.flow.title'),
    },
    name: 'Bpmn',
    path: '/bpmn/process',
    children: [
      {
        name: 'Process',
        path: '/bpmn/process',
        component: () => import('#/views/bpmn/process/index.vue'),
        meta: {
          title: $t('bpmn.flow.process.title'),
        },
      },
    ],
  },
];

export default routes;
