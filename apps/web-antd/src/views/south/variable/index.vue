<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';

import { h, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

import { Page, useVbenModal } from '@vben/common-ui';

import { PlusOutlined } from '@ant-design/icons-vue';
import { Button, Popconfirm, Tag } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { variableApiDelete, variableApiPage } from '#/api';

// import find from 'lodash.find';
import { formOptions } from './index.data';
import ManageModel from './manageModel.vue';

const route = useRoute();

const gridOptions: VxeGridProps = {
  rowConfig: {
    keyField: 'id',
  },
  columns: [
    { title: '序号', type: 'seq', fixed: 'left', width: 50 },
    { field: 'name', title: '名称', fixed: 'left' },
    { field: 'method', title: 'FC（方法）' },
    { field: 'deviceAddress', title: '地址' },
    { field: 'protectTypeName', title: '读写' },
    { field: 'dataTypeName', title: '数据类型' },
    { field: 'endianTypeName', title: '大小端' },
    { field: 'value', title: '值', slots: { default: 'value' } },
    { field: 'timestamp', title: '采集时间', slots: { default: 'timestamp' } },
    {
      field: 'statusTypeName',
      title: '采集状态',
      slots: { default: 'statusTypeName' },
    },
    // { field: 'isTriggerName', title: '是否触发' },
    // { field: 'isUploadName', title: '是否上传' },
    {
      field: 'action',
      fixed: 'right',
      slots: { default: 'action' },
      title: '操作',
      width: 150,
    },
  ],
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        return await variableApiPage({
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
  await variableApiDelete({ id: row.id });
  await gridApi.reload();
};
/**
 * 编辑插件
 */
const updateHandle = async (row: Record<string, any>) => {
  modalApi.setData({ isUpdate: true, record: row });
  modalApi.open();
};

const topicClient = `iotLinker/${route.params.id}`;
// @ts-ignore
window.mqttClient.subscribe(topicClient);
// @ts-ignore
window.mqttClient.on('message', (topic, message) => {
  if (topic !== topicClient) return;
  const messageParse = JSON.parse(message.toString()) || [];
  for (const element of messageParse) {
    const row = gridApi.grid.getRowById(element.varId);
    if (row) gridApi.grid.setRow(row, element);
  }
});
onUnmounted(() => {
  // @ts-ignore
  window.mqttClient.unsubscribe(topicClient);
});
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
      <template #value="{ row }">
        <Tag color="green">{{ row.value }}</Tag>
      </template>
      <template #timestamp="{ row }">
        <Tag color="purple">{{ row.timestamp }}</Tag>
      </template>
      <template #statusTypeName="{ row }">
        <Tag color="red">{{ row.statusTypeName }}</Tag>
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
