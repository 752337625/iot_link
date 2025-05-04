<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';

import { h } from 'vue';

import { Page, useVbenModal } from '@vben/common-ui';

import { PlusOutlined } from '@ant-design/icons-vue';
import { Button, Popconfirm, Tag } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { mqttClientApiDelete, mqttClientApiPage } from '#/api';

import { formOptions } from './index.data';
import ManageModel from './manageModel.vue';

const gridOptions: VxeGridProps = {
  columns: [
    { title: '序号', type: 'seq', width: 50 },
    { field: 'clientNo', title: '客户端编号' },
    { field: 'mqttIp', title: 'IP:Port', slots: { default: 'mqttIp' } },
    { field: 'status', title: '状态', slots: { default: 'status' } },
    {
      field: 'topicInfo',
      title: '北向主题',
      slots: { default: 'topicInfo' },
    },
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
        return await mqttClientApiPage({
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
  await mqttClientApiDelete({ id: row.id });
  await gridApi.reload();
};
/**
 * 编辑插件
 */
const updateHandle = async (row: Record<string, any>) => {
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
      <template #mqttIp="{ row }">
        <Tag color="green"> {{ row.mqttIp }}:{{ row.mqttPort }} </Tag>
      </template>
      <template #status="{ row }">
        <Tag :color="row.status === 1 ? 'green' : 'red'">
          {{ row.statusName }}
        </Tag>
      </template>
      <template #topicInfo="{ row }">
        <div v-for="item in row.topicInfo" :key="item">{{ item }}</div>
      </template>
      <template #action="{ row }">
        <Popconfirm
          placement="topRight"
          title="确定删除吗？"
          @confirm="delHandle(row)"
        >
          <Button danger type="link" size="small"> 删除 </Button>
        </Popconfirm>
        <Button
          danger
          type="link"
          size="small"
          style="color: rgb(62 175 124)"
          @click="updateHandle(row)"
        >
          编辑
        </Button>
      </template>
    </Grid>
    <Modal @success="gridApi.reload()" />
  </Page>
</template>
