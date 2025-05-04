<script lang="ts" setup>
import { Page } from '@vben/common-ui';

import ModuleDesignContentEdit from './edit-page/module-design-content-edit.vue';
import ModuleDesignLeftEdit from './edit-page/module-design-left-edit.vue';
import ModuleDesignRightEdit from './edit-page/module-design-right-edit.vue';
</script>

<template>
  <Page auto-content-height content-class="flex  h-full !p-0 overflow-hidden">
    <ModuleDesignLeftEdit
      style="width: 215px; border-right: 1px solid hsl(var(--border))"
    />
    <ModuleDesignContentEdit
      style="width: calc(100% - 420px); height: 100%; background-color: #fff"
    />
    <ModuleDesignRightEdit
      style="width: 265px; border-left: 1px solid hsl(var(--border))"
    />
  </Page>
</template>
