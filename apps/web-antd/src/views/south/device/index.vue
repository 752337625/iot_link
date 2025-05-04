<script lang="ts" setup>
import type { GroupType } from './index.d';

import { h, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { Page, useVbenModal } from '@vben/common-ui';

import { PlusOutlined } from '@ant-design/icons-vue';
import {
  Button,
  Card,
  Descriptions,
  List,
  message,
  Popconfirm,
  Tag,
} from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { deviceApiDelete, deviceApiDetail, deviceApiPage } from '#/api';

import ManageModel from './manageModel.vue';

const router = useRouter();
const route = useRoute();
const loading = ref<boolean>(true);
const group = ref<Array<GroupType>>([]);
const [Modal, modalApi] = useVbenModal({
  connectedComponent: ManageModel,
});
// 初始化表格
const initTable = async (values: null | Record<string, any>) => {
  try {
    loading.value = true;
    const { items = [] } = await deviceApiPage({
      page: 1,
      pageSize: 1_000_000,
      groupId: route.params.id,
      ...values,
    });
    group.value = items;
    loading.value = false;
  } catch {
    loading.value = false;
  }
};
/**
 *新增插件
 */
const addHandle = async () => {
  modalApi.setData({ isUpdate: false });
  modalApi.open();
};
/**
 * 编辑插件
 */
const updateHandle = async (row: Record<string, any>) => {
  const record = await deviceApiDetail({ id: row.id });
  modalApi.setData({ isUpdate: true, record });
  modalApi.open();
};
/**
 * 删除设备
 */
const delHandle = async (row: Record<string, any>) => {
  try {
    loading.value = true;
    await deviceApiDelete({ ids: [row.id] });
    message.success('操作成功');
    initTable(null);
  } catch {
    loading.value = false;
  }
};
onMounted(async () => initTable(null));

const [Form, formApi] = useVbenForm({
  showCollapseButton: false, // 是否展示折叠按钮
  commonConfig: {
    labelWidth: 0,
  },
  wrapperClass:
    '3xl:grid-cols-5 2xl:grid-cols-5 xl:grid-cols-5 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1',
  actionWrapperClass: 'col-auto text-left',
  submitButtonOptions: {
    content: '查询',
  },
  schema: [
    {
      fieldName: 'queryName',
      component: 'Input',
      componentProps: {
        placeholder: '监控名称',
      },
    },
    {
      fieldName: 'autoStart',
      component: 'Select',
      componentProps: {
        placeholder: '监控状态',
        class: 'w-full ml-2',
        allowClear: true,
        options: [
          {
            label: '启动',
            value: 1,
          },
          {
            label: '停止',
            value: 0,
          },
        ],
      },
    },
  ],
  handleReset: async () => {
    formApi.resetForm();
    initTable(null);
  },
  handleSubmit: async (values) => {
    initTable(values);
  },
});
const setHandle = (row: Record<string, any>) => {
  router.push({ name: 'Variable', params: { id: row.id } });
};
const configHandle = (row: Record<string, any>) => {
  router.push({ name: 'Config', params: { id: row.id } });
};
</script>

<template>
  <Page>
    <Form />
    <div class="mb-4 text-right">
      <Button :icon="h(PlusOutlined)" type="primary" @click="addHandle">
        新增
      </Button>
    </div>

    <List
      :data-source="group"
      :grid="{
        gutter: 15,
        xs: 1,
        sm: 1,
        md: 1,
        lg: 2,
        xl: 3,
        xxl: 5,
      }"
      :loading="loading"
      :pagination="{
        defaultPageSize: 1_000_000,
        hideOnSinglePage: true,
      }"
    >
      <template #renderItem="{ item }">
        <List.Item class="!p-0">
          <Card bordered hoverable>
            <div class="mb-5 flex items-center justify-between">
              <p class="text-neutral-400">{{ item.deviceName }}</p>
              <p>
                <Tag v-if="item.autoStart" color="green">状态：启动</Tag>
                <Tag v-else color="red">状态：停止</Tag>
                <!-- <Tag v-if="item.cgUpload" color="green">变化上传：上传</Tag>
                <Tag v-else color="red">变化上传：不上传</Tag> -->
              </p>
            </div>
            <Descriptions :column="1" bordered size="small">
              <!-- <Descriptions.Item label="归档周期">
                {{ item.enforcePeriod }}&nbsp;ms
              </Descriptions.Item> -->
              <Descriptions.Item label="轮询周期">
                {{ item.pollPeriod }}&nbsp;ms
              </Descriptions.Item>
              <Descriptions.Item label="驱动名次">
                {{ item.driverName }}
              </Descriptions.Item>
              <Descriptions.Item label="驱动版本">
                {{ item.version }}
              </Descriptions.Item>
              <Descriptions.Item label="版权信息">
                {{ item.copyRight }}
              </Descriptions.Item>
            </Descriptions>
            <template #actions>
              <Popconfirm
                placement="topRight"
                title="确定删除吗？"
                @confirm="delHandle(item)"
              >
                <Button
                  danger
                  type="link"
                  size="small"
                  style="font-size: 0.75rem"
                >
                  删除
                </Button>
              </Popconfirm>
              <Button
                danger
                type="link"
                size="small"
                style="font-size: 0.75rem; color: #6366f1"
                @click="setHandle(item)"
              >
                下钻
              </Button>
              <Button
                danger
                type="link"
                size="small"
                style="font-size: 0.75rem; color: rgb(62 175 124)"
                @click="updateHandle(item)"
              >
                编辑
              </Button>
              <Button
                danger
                type="link"
                size="small"
                style="font-size: 0.75rem; color: #1677ff"
                @click="configHandle(item)"
              >
                配置
              </Button>
            </template>
          </Card>
        </List.Item>
      </template>
    </List>
    <Modal @success="initTable(null)" />
  </Page>
</template>
