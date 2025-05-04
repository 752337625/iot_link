<script lang="ts" setup>
import { computed, ref, unref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { groupApiAdd, groupApiUpdate } from '#/api';

import { formOptions } from './manage.model.data';

const emit = defineEmits(['success']);
const isUpdate = ref<boolean>(false);
const getTitle = computed(() => (unref(isUpdate) ? '编辑插件' : '新增插件'));
const [Form, formApi] = useVbenForm(formOptions);
const [Modal, modalApi] = useVbenModal({
  draggable: true,
  class: 'w-6/12',
  closeOnClickModal: false,
  async onOpenChange(isOpen: boolean) {
    if (!isOpen) return;
    modalApi.setState({ confirmLoading: false });
    await formApi.resetForm();
    isUpdate.value = modalApi.getData().isUpdate;
    await formApi.updateSchema([{ fieldName: 'imageFile', rules: 'required' }]);
    if (!unref(isUpdate)) return;
    await formApi.updateSchema([{ fieldName: 'imageFile', rules: '' }]);
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
      const isUpdate = modalApi.getData().isUpdate;
      const formData = new FormData();
      formData.append('GroupName', form.groupName);
      formData.append('Remark', form.remark);
      if (unref(isUpdate)) {
        const { id } = modalApi.getData().record;
        if (form.imageFile)
          formData.append('ImageFile', form.imageFile[0].originFileObj);
        formData.append('Id', id);
        await groupApiUpdate(formData);
        message.success('操作成功');
      } else {
        formData.append('ImageFile', form.imageFile[0].originFileObj);
        await groupApiAdd(formData);
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
