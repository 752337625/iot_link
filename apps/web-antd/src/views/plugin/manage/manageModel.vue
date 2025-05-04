<script lang="ts" setup>
import { computed, ref, unref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';
import { driverApiAdd } from '#/api';

import { formOptions } from './manage.model.data';

const emit = defineEmits(['success']);
const isUpdate = ref<boolean>(false);

const [Form, formApi] = useVbenForm(formOptions);

const [Modal, modalApi] = useVbenModal({
  draggable: true,
  class: 'w-5/12',
  closeOnClickModal: false,
  async onOpenChange(isOpen: boolean) {
    if (!isOpen) return;
    modalApi.setState({ confirmLoading: false });
    await formApi.resetForm();
    isUpdate.value = modalApi.getData().isUpdate;
    if (!unref(isUpdate)) return;
    const record = modalApi.getData().record;
    formApi.setValues(record);
  },
  onCancel() {
    modalApi.close();
  },
  async onConfirm() {
    try {
      const { valid } = await formApi.validate();
      if (!valid) return;
      modalApi.setState({ confirmLoading: true });
      const form = await formApi.getValues();
      const formData = new FormData();
      formData.append('DriverName', form.driverName);
      formData.append('DriverDllFile', form.driverDllFile[0].originFileObj);
      await driverApiAdd(formData);
      modalApi.close();
      emit('success');
    } catch {
      modalApi.setState({ confirmLoading: false });
    }
  },
});
const getTitle = computed(() => (unref(isUpdate) ? '编辑插件' : '新增插件'));
</script>
<template>
  <Modal :title="getTitle"><Form /></Modal>
</template>
