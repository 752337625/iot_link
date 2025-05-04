<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';

import { h } from 'vue';

import { Page } from '@vben/common-ui';

import { DeleteOutlined } from '@ant-design/icons-vue';
import { Button, Tag } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { sysLogVisClear, sysLogVisPage } from '#/api';

import { formOptions } from './index.data';

const gridOptions: VxeGridProps = {
  columns: [
    { title: '序号', type: 'seq', width: 50 },
    { field: 'displayTitle', title: '显示名称' },
    { field: 'actionName', title: '方法名称' },
    { field: 'account', title: '账号名称' },
    { field: 'realName', title: '真实姓名' },
    { field: 'status', title: '状态', slots: { default: 'status' } },
    { field: 'elapsed', title: '耗时(ms)' },
    { field: 'logDateTime', title: '日志时间' },
  ],
  keepSource: true,
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        return await sysLogVisPage({
          page: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
      },
    },
  },
};
const [Grid, gridApi] = useVbenVxeGrid({ formOptions, gridOptions });
/**
 * 清空日志
 */
const clearHandle = async () => {
  await sysLogVisClear();
  gridApi.reload();
};
</script>

<template>
  <Page>
    <Grid>
      <template #toolbar-tools>
        <Button
          :icon="h(DeleteOutlined)"
          danger
          type="primary"
          @click="clearHandle"
        >
          清空
        </Button>
      </template>
      <template #status="{ row }">
        <Tag :color="row.status === '200' ? 'green' : 'red'">
          {{ row.status === '200' ? '成功' : '失败' }}
        </Tag>
      </template>
    </Grid>
  </Page>
</template>
