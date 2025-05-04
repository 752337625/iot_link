<script lang="ts" setup>
import { computed, ref, unref } from 'vue';
import { useRoute } from 'vue-router';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import {
  deviceApiMethodDetail,
  variableApiAdd,
  variableApiUpdate,
} from '#/api';

import { formOptions } from './manage.model.data';

const emit = defineEmits(['success']);

const route = useRoute();

const isUpdate = ref<boolean>(false);

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
    formApi.updateSchema([
      {
        fieldName: 'method',
        componentProps: {
          api: deviceApiMethodDetail,
          params: {
            deviceId: route?.params?.id,
          },
        },
      },
    ]);
    if (!unref(isUpdate)) return;
    const {
      name,
      method,
      dataType,
      deviceAddress,
      protectType,
      endianType,
      isTrigger,
      isUpload,
      description,
    } = modalApi.getData().record;
    formApi.setValues({
      name,
      method,
      dataType,
      deviceAddress,
      protectType,
      endianType,
      isTrigger,
      isUpload,
      description,
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
      const { id: deviceId } = route.params;
      if (unref(isUpdate)) {
        const { id } = modalApi.getData().record;
        await variableApiUpdate({ ...res, id, deviceId });
        message.success('操作成功');
      } else {
        await variableApiAdd({ ...res, deviceId });
        message.success('操作成功');
      }
      modalApi.close();
      emit('success');
    } catch {
      modalApi.setState({ confirmLoading: false });
    }
  },
});
const getTitle = computed(() => (unref(isUpdate) ? '编辑变量' : '新增变量'));
</script>
<template>
  <Modal :title="getTitle"><Form /></Modal>
</template>
