<script lang="ts" setup>
import { ref } from 'vue';
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';

import { useVbenModal } from '@vben/common-ui';

import { Tabs } from 'ant-design-vue';

const activeKey = ref(1);
const rocord = ref<Record<string, string>>({
  message: '',
  requestParam: '',
  returnResult: '',
});

const [Modal, modalApi] = useVbenModal({
  draggable: true,
  class: 'w-11/12',
  title: '日志详情',
  async onOpenChange(isOpen: boolean) {
    if (!isOpen) return;
    rocord.value = modalApi.getData<Record<string, string>>();
  },
});
</script>
<template>
  <Modal>
    <Tabs v-model:active-key="activeKey" type="card">
      <Tabs.TabPane :key="1" tab="日志消息">
        <pre>{{ rocord.message }}</pre>
      </Tabs.TabPane>
      <Tabs.TabPane :key="2" force-render tab="请求参数">
        <VueJsonPretty
          :data="rocord.requestParam"
          :deep="3"
          :show-double-quotes="true"
          :show-icon="true"
          :show-length="true"
          :show-line-number="true"
          path="res"
        />
      </Tabs.TabPane>
      <Tabs.TabPane :key="3" tab="返回内容">
        <VueJsonPretty
          :data="rocord.returnResult"
          :deep="3"
          :show-double-quotes="true"
          :show-icon="true"
          :show-length="true"
          :show-line-number="true"
          path="res"
        />
      </Tabs.TabPane>
    </Tabs>
  </Modal>
</template>
