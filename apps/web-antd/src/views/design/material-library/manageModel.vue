<script lang="ts" setup>
import { computed, ref, unref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { groupApiPage, mqttClientApiAdd, mqttClientApiUpdate } from '#/api';

import { formOptions } from './manage.model.data';

const emit = defineEmits(['success']);
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
    const { items = [] } = await groupApiPage({
      page: 1,
      pageSize: 1_000_000,
    });
    formApi.updateSchema([
      {
        fieldName: 'deviceIds',
        componentProps: {
          options: items.map((item: { groupName: string; id: number }) => ({
            label: item.groupName,
            value: item.id,
            isLeaf: false,
          })),
        },
      },
    ]);
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
      form.deviceIds = form.deviceIds.map((i) => i[1]);
      if (unref(isUpdate)) {
        const { id } = modalApi.getData().record;
        await mqttClientApiUpdate({ ...form, id });
        message.success('操作成功');
      } else {
        await mqttClientApiAdd(form);
        message.success('操作成功');
      }
      modalApi.close();
      emit('success');
    } catch {
      modalApi.setState({ confirmLoading: false });
    }
  },
});
const getTitle = computed(() =>
  unref(isUpdate) ? '编辑Mqtt客户端' : '新增Mqtt客户端',
);
</script>
<template>
  <Modal :title="getTitle"><Form /></Modal>
</template>
