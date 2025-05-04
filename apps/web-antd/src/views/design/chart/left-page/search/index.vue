<script lang="ts" setup>
import { ref } from 'vue';

import { Input } from 'ant-design-vue';

const value = ref<string>('');
</script>
<template>
  <Input
    v-model:value="value"
    :bordered="false"
    class="rounded-none border-none"
    placeholder="检索组件"
    size="small"
  />
</template>
