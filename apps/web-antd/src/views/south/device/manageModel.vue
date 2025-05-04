<script lang="ts" setup>
import { computed, ref, unref } from 'vue';
import { useRoute } from 'vue-router';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { deviceApiAdd, deviceApiUpdate, driverApiPage } from '#/api';

import { formOptions } from './manage.model.data';

const emit = defineEmits(['success']);
const route = useRoute();
const isUpdate = ref<boolean>(false);
const getTitle = computed(() => (unref(isUpdate) ? '编辑分组' : '新增分组'));
const [Form, formApi] = useVbenForm(formOptions);
const [Modal, modalApi] = useVbenModal({
  draggable: true,
  class: 'w-6/12',
  closeOnClickModal: false,
  async onOpenChange(isOpen: boolean) {
    if (!isOpen) return;
    modalApi.setState({ confirmLoading: false });
    const { items } = await driverApiPage({ page: 1, pageSize: 10_000 });
    formApi.updateSchema([
      {
        fieldName: 'driverId',
        componentProps: {
          disabled: false,
          options: items,
        },
      },
    ]);
    await formApi.resetForm();
    isUpdate.value = modalApi.getData().isUpdate;
    if (!unref(isUpdate)) return;
    formApi.updateSchema([
      {
        fieldName: 'driverId',
        componentProps: {
          disabled: true,
        },
      },
    ]);
    const {
      deviceName,
      driverId,
      autoStart,
      cgUpload,
      enforcePeriod,
      pollPeriod,
      order,
    } = modalApi.getData().record;
    formApi.setValues({
      deviceName,
      driverId,
      autoStart,
      cgUpload,
      enforcePeriod,
      pollPeriod,
      order,
    });
  },
  onCancel() {
    modalApi.close();
  },
  async onConfirm() {
    try {
      const { valid } = await formApi.validate();
      if (!valid) return;
      modalApi.setState({ confirmLoading: true });

      const isUpdate = modalApi.getData().isUpdate;
      const res = await formApi.getValues();
      const { id: groupId } = route.params;
      if (unref(isUpdate)) {
        const { id } = modalApi.getData().record;
        await deviceApiUpdate({ ...res, id, groupId });
        message.success('操作成功');
      } else {
        await deviceApiAdd({ ...res, groupId });
        message.success('操作成功');
      }
      modalApi.close();
      emit('success');
    } catch {
      modalApi.setState({ confirmLoading: false });
    }
  },
});
</script>
<template>
  <Modal :title="getTitle"><Form /></Modal>
</template>
