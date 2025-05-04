<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';

import { h } from 'vue';
import { useRoute } from 'vue-router';

import { Page, useVbenModal } from '@vben/common-ui';

import { PlusOutlined } from '@ant-design/icons-vue';
import { Button, Popconfirm, Tag } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { deviceConfigApiDelete, deviceConfigApiPage } from '#/api';

import { formOptions } from './index.data';
import ManageModel from './manageModel.vue';

const route = useRoute();
const gridOptions: VxeGridProps = {
  columns: [
    { title: '序号', type: 'seq', width: 50 },
    { field: 'deviceName', title: '监控分组名称', width: 150 },
    { field: 'configName', title: '配置名称', width: 100 },
    { field: 'configValue', title: '值', width: 100 },
    {
      field: 'dataSide',
      title: '属性侧',
      width: 120,
      slots: { default: 'dataSide' },
    },
    { field: 'description', title: '描述' },
    { field: 'enumInfo', title: '备注' },
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
        return await deviceConfigApiPage({
          page: page.currentPage,
          pageSize: page.pageSize,
          deviceId: route.params.id,
          ...formValues,
        });
      },
    },
  },
};

const [Grid, gridApi] = useVbenVxeGrid({ formOptions, gridOptions });

const delHandle = async (row: Record<string, any>) => {
  await deviceConfigApiDelete({ id: row.id });
  gridApi.reload();
};

const [Modal, modalApi] = useVbenModal({
  connectedComponent: ManageModel,
});
const addHandle = async () => {
  modalApi.setData({ isUpdate: false });
  modalApi.open();
};
const updateHandle = (row: Record<string, any>) => {
  modalApi.setData({ isUpdate: true, record: row });
  modalApi.open();
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
      <template #dataSide="{ row }">
        <Tag :color="row.dataSide ? 'red' : 'blue'">
          {{ row.dataSideName }}
        </Tag>
      </template>
      <template #action="{ row }">
        <Button type="link" @click="updateHandle(row)" size="small">
          编辑
        </Button>
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
