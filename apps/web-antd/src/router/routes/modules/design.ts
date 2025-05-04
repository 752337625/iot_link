import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'f7:view-2d',
      order: 2,
      title: $t('design.2D.title'),
    },
    name: 'Design',
    path: '/design/chart',
    children: [
      {
        name: 'MaterialLibrary',
        path: '/design/material-library',
        component: () => import('#/views/design/material-library/index.vue'),
        meta: {
          title: $t('design.2D.materialLibrary.title'),
        },
      },
      {
        name: 'Chart',
        path: '/design/chart',
        component: () => import('#/views/design/chart/index.vue'),
        meta: {
          title: $t('design.2D.chart.title'),
        },
      },
    ],
  },
];

export default routes;
