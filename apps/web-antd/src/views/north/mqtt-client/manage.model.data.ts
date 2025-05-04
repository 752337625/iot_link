import type { VbenFormProps } from '#/adapter/form';

import { Cascader } from 'ant-design-vue';

import { deviceApiPage } from '#/api';

export const formOptions: VbenFormProps = {
  wrapperClass: 'grid-cols-2',
  showDefaultActions: false,
  schema: [
    {
      fieldName: 'mqttIp',
      component: 'Input',
      label: 'IP',
      rules: 'required',
      componentProps: {
        placeholder: 'IP',
      },
    },
    {
      fieldName: 'mqttPort',
      component: 'InputNumber',
      label: 'Port',
      rules: 'required',
      componentProps: {
        placeholder: 'Port',
        precision: 0,
        class: 'w-full',
      },
    },
    {
      fieldName: 'mqttUName',
      component: 'Input',
      label: '用户名',
      componentProps: {
        placeholder: '用户名',
      },
    },
    {
      fieldName: 'mqttUPwd',
      component: 'Input',
      label: '密码',
      componentProps: {
        placeholder: '密码',
      },
    },
    {
      fieldName: 'status',
      component: 'Switch',
      label: '状态',
      rules: 'required',
      defaultValue: 0,
      componentProps: {
        placeholder: '状态',
        checkedChildren: '开启',
        unCheckedChildren: '关闭',
        checkedValue: 1,
        unCheckedValue: 0,
      },
    },
    {
      fieldName: 'deviceIds',
      component: 'Cascader',
      label: '订阅分组',
      rules: 'required',
      componentProps: {
        multiple: true,
        changeOnSelect: true,
        maxTagCount: 'responsive',
        placeholder: '订阅分组',
        class: 'w-full',
        showCheckedStrategy: Cascader.SHOW_CHILD,
        loadData: async (selectedOptions: any[]) => {
          const targetOption = selectedOptions[selectedOptions.length - 1];
          targetOption.loading = true;
          const { items = [] } = await deviceApiPage({
            page: 1,
            pageSize: 1_000_000,
            groupId: targetOption.value,
          });
          targetOption.loading = false;
          targetOption.children = items.map(
            (item: { deviceName: string; id: number }) => ({
              value: item.id,
              label: item.deviceName,
            }),
          );
        },
      },
    },
  ],
};
