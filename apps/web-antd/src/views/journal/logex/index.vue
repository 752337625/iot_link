<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';

import { h } from 'vue';

import { Page, useVbenModal } from '@vben/common-ui';
import { downloadFileFromBlob } from '@vben/utils';

import { DeleteFilled, FolderOpenFilled } from '@ant-design/icons-vue';
import { Button, Tag } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  sysLogExClear,
  sysLogExDetail,
  sysLogExExport,
  sysLogExPage,
} from '#/api';

import { formOptions } from './index.data';
import logExModel from './logExModel.vue';

const gridOptions: VxeGridProps = {
  columns: [
    { title: '序号', type: 'seq', width: 50 },
    { field: 'controllerName', title: '模块名称' },
    { field: 'displayTitle', title: '显示名称' },
    { field: 'actionName', title: '方法名称' },
    { field: 'httpMethod', title: '请求方式' },
    {
      field: 'logLevel',
      title: '级别',
      slots: { default: 'logLevel' },
    },
    { field: 'eventId', title: '事件ID' },
    { field: 'threadId', title: '线程' },
    { field: 'account', title: '账号名称' },
    { field: 'realName', title: '真实姓名' },
    { field: 'remoteIp', title: 'IP地址' },
    { field: 'status', title: '状态', slots: { default: 'status' } },
    { field: 'elapsed', title: '耗时(ms)' },
    { field: 'logDateTime', title: '日志时间' },
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
        return await sysLogExPage({
          page: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
      },
    },
  },
};

const [Grid, gridApi] = useVbenVxeGrid({ formOptions, gridOptions });
const pagerConfig = gridApi.useStore((state) => state.gridOptions?.pagerConfig);
/**
 * 清空日志
 */
const clearHandle = async () => {
  await sysLogExClear();
  gridApi.reload();
};
/**
 * 导出日志
 */
const exportHandle = async () => {
  const value = await gridApi.formApi.getValues();
  gridApi.setLoading(true);
  const res = await sysLogExExport({
    ...value,
    page: pagerConfig.value?.currentPage,
    pageSize: pagerConfig.value?.pageSize,
  });
  const [, fileName] = res.headers['content-disposition'].split(';');
  downloadFileFromBlob({
    fileName: fileName.replace('filename=', ''),
    source: res.data,
  });
  gridApi.setLoading(false);
};
const [Modal, modalApi] = useVbenModal({
  connectedComponent: logExModel,
});
/**
 *打开详情
 */
const openHandle = async (row: Record<string, string>) => {
  const res = await sysLogExDetail({ id: row.id });
  modalApi.setData({
    message: res.message,
    requestParam: JSON.parse(res.requestParam),
    returnResult: JSON.parse(res.returnResult),
  });
  modalApi.open();
};
</script>

<template>
  <Page>
    <Grid>
      <template #toolbar-tools>
        <Button
          :icon="h(FolderOpenFilled)"
          class="mr-2"
          type="primary"
          @click="exportHandle"
        >
          导出
        </Button>
        <Button
          :icon="h(DeleteFilled)"
          danger
          type="primary"
          @click="clearHandle"
        >
          清空
        </Button>
      </template>
      <template #logLevel="{ row }">
        <Tag v-if="row.logLevel === 1" color="purple"> 调试 </Tag>
        <Tag v-else-if="row.logLevel === 2" color="blue"> 消息 </Tag>
        <Tag v-else-if="row.logLevel === 3" color="orange"> 警告 </Tag>
        <Tag v-else-if="row.logLevel === 4" color="red"> 错误 </Tag>
        <Tag v-else color="pink"> 其他 </Tag>
      </template>
      <template #status="{ row }">
        <Tag :color="row.status === '200' ? 'green' : 'red'">
          {{ row.status === '200' ? '成功' : '失败' }}
        </Tag>
      </template>
      <template #action="{ row }">
        <Button @click="openHandle(row)" type="link" size="small">详情</Button>
      </template>
    </Grid>
    <Modal />
  </Page>
</template>
