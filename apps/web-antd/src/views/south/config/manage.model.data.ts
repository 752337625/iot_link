import type { VbenFormProps } from '#/adapter/form';

import { enumDataListApiPage } from '#/api';

export const formOptions: VbenFormProps = {
  showDefaultActions: false,
  wrapperClass: 'grid-cols-2',
  schema: [
    {
      fieldName: 'configName',
      component: 'Input',
      label: '配置名称',
      rules: 'required',
      componentProps: {
        placeholder: '配置名称',
      },
    },
    {
      fieldName: 'configValue',
      component: 'Input',
      label: '配置值',
      rules: 'required',
      componentProps: {
        placeholder: '配置值',
      },
    },
    {
      fieldName: 'dataSide',
      component: 'ApiSelect',
      label: '属性侧',
      rules: 'required',
      componentProps: {
        api: enumDataListApiPage,
        params: {
          enumName: 'DataSide',
        },
        fieldNames: { label: 'describe', value: 'value' },
        optionFilterProp: 'describe',
        showSearch: true,
        allowClear: true,
        placeholder: '属性侧',
        class: 'w-full',
      },
    },
    {
      fieldName: 'description',
      component: 'Input',
      label: '描述',
      rules: 'required',
      componentProps: {
        placeholder: '描述',
      },
    },
    {
      fieldName: 'enumInfo',
      component: 'Textarea',
      label: '备注',
      formItemClass: 'col-span-2',
      componentProps: {
        placeholder: '备注',
        rows: 3,
        size: 'small',
      },
    },
  ],
};
