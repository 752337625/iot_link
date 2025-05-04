<script lang="ts" setup>
import type { GroupType } from './index.d';

import { h, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { Page, useVbenModal } from '@vben/common-ui';

import { PlusOutlined } from '@ant-design/icons-vue';
import {
  Button,
  Card,
  List,
  message,
  Popconfirm,
  Typography,
} from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { groupApiDelete, groupApiPage } from '#/api';

import ManageModel from './manageModel.vue';

const router = useRouter();
const loading = ref<boolean>(true);
const group = ref<Array<GroupType>>([]);
const [Modal, modalApi] = useVbenModal({
  connectedComponent: ManageModel,
});
// 初始化表格
const initTable = async (values: null | Record<string, any>) => {
  try {
    loading.value = true;
    const { items = [] } = await groupApiPage({
      page: 1,
      pageSize: 1_000_000,
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
  modalApi.setData({ isUpdate: true, record: row });
  modalApi.open();
};
/**
 * 删除设备
 */
const delHandle = async (row: Record<string, any>) => {
  try {
    loading.value = true;
    await groupApiDelete({ id: row.id });
    message.success('操作成功');
    initTable(null);
  } catch {
    loading.value = false;
  }
};
onMounted(async () => {
  initTable(null);
});

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
        placeholder: '设备名称',
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
  // 这里就是路由跳转，也可以用path
  router.push({ name: 'Device', params: { id: row.id } });
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
        gutter: 10,
        xs: 1,
        sm: 1,
        md: 2,
        lg: 3,
        xl: 5,
        xxl: 7,
      }"
      :loading="loading"
      :pagination="{
        defaultPageSize: 1_000_000,
        hideOnSinglePage: true,
      }"
    >
      <template #renderItem="{ item }">
        <List.Item class="!p-0">
          <Card :title="item.groupName" bordered hoverable>
            <template #cover>
              <img
                class="!rounded-none"
                style="width: 100%; height: 150px; object-fit: contain"
                v-lazy="item.imagePath"
              />
            </template>
            <Typography.Paragraph
              :content="item.remark"
              :ellipsis="{
                rows: 2,
                expandable: false,
                tooltip: true,
                symbol: 'more',
              }"
            />
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
              >
                详情
              </Button>
            </template>
          </Card>
        </List.Item>
      </template>
    </List>
    <Modal @success="initTable(null)" />
  </Page>
</template>
