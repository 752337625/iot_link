<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';

import { h } from 'vue';

import { Page, useVbenModal } from '@vben/common-ui';

import { PlusOutlined } from '@ant-design/icons-vue';
import { Button, Popconfirm } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { driverApiDelete, driverApiPage } from '#/api';

import { formOptions } from './index.data';
import ManageModel from './manageModel.vue';

const gridOptions: VxeGridProps = {
  columns: [
    { title: '序号', type: 'seq', width: 50 },
    { field: 'driverName', title: '驱动名' },
    { field: 'fileName', title: '文件名' },
    { field: 'assembleName', title: '程序集名' },
    { field: 'version', title: '版本号' },
    { field: 'copyRight', title: '版权信息' },
    { field: 'createTime', title: '创建时间', formatter: 'formatDate' },
    {
      field: 'action',
      fixed: 'right',
      slots: { default: 'action' },
      title: '操作',
      width: 120,
    },
  ],
  keepSource: true,
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        return await driverApiPage({
          page: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
      },
    },
  },
};

const [Grid, gridApi] = useVbenVxeGrid({ formOptions, gridOptions });
const [Modal, modalApi] = useVbenModal({ connectedComponent: ManageModel });
/**
 *新增插件
 */
const addHandle = async () => {
  modalApi.setData({ isUpdate: false });
  modalApi.open();
};
/**
 * 删除插件
 *
 */
const delHandle = async (row: Record<string, any>) => {
  await driverApiDelete({ id: row.id });
  await gridApi.reload();
};
</script>

<template>
  <Page>
    <Grid>
      <template #toolbar-tools>
        <Button
          :icon="h(PlusOutlined)"
          class="mr-2"
          type="primary"
          @click="addHandle"
        >
          新增
        </Button>
      </template>

      <template #action="{ row }">
        <Popconfirm
          placement="topRight"
          title="确定删除吗？"
          @confirm="delHandle(row)"
        >
          <Button danger type="link" size="small"> 删除 </Button>
        </Popconfirm>
      </template>
    </Grid>
    <Modal @success="gridApi.reload()" />
  </Page>
</template>
