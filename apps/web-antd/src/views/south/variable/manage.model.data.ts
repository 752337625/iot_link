import type { VbenFormProps } from '#/adapter/form';

import { enumDataListApiPage } from '#/api';

export const formOptions: VbenFormProps = {
  showDefaultActions: false,
  schema: [
    {
      fieldName: 'name',
      component: 'Input',
      label: '名称',
      rules: 'required',
      componentProps: {
        placeholder: '名称',
        maxLength: 10,
      },
    },
    {
      fieldName: 'method',
      component: 'ApiSelect',
      label: 'FC（方法）',
      rules: 'required',
      componentProps: {
        fieldNames: { label: 'methodsText', value: 'methodsValue' },
        optionFilterProp: 'methodsText',
        showSearch: true,
        allowClear: true,
        placeholder: 'FC（方法）',
        class: 'w-full',
      },
    },

    {
      fieldName: 'dataType',
      component: 'ApiSelect',
      label: '数据类型',
      rules: 'required',
      componentProps: {
        api: enumDataListApiPage,
        params: {
          enumName: 'DataTypeEnum',
        },
        fieldNames: { label: 'describe', value: 'value' },
        optionFilterProp: 'describe',
        showSearch: true,
        allowClear: true,
        placeholder: '数据类型',
        class: 'w-full',
      },
    },
    {
      fieldName: 'deviceAddress',
      component: 'Input',
      label: '地址',
      rules: 'required',
      componentProps: {
        placeholder: '地址',
      },
    },
    {
      fieldName: 'protectType',
      component: 'ApiSelect',
      label: '读写',
      rules: 'required',
      componentProps: {
        api: enumDataListApiPage,
        params: {
          enumName: 'ProtectTypeEnum',
        },
        fieldNames: { label: 'describe', value: 'value' },
        optionFilterProp: 'describe',
        showSearch: true,
        allowClear: true,
        placeholder: '读写',
        class: 'w-full',
      },
    },
    {
      fieldName: 'endianType',
      component: 'ApiSelect',
      label: '大小端',
      rules: 'required',
      componentProps: {
        api: enumDataListApiPage,
        params: {
          enumName: 'EndianEnum',
        },
        fieldNames: { label: 'describe', value: 'value' },
        optionFilterProp: 'describe',
        showSearch: true,
        allowClear: true,
        placeholder: '大小端',
        class: 'w-full',
      },
    },
    {
      fieldName: 'description',
      component: 'Textarea',
      label: '描述',
      formItemClass: 'col-span-2',
      componentProps: {
        placeholder: '描述',
        rows: 3,
        maxlength: 100,
        size: 'small',
      },
    },
  ],
  wrapperClass: 'grid-cols-2',
};
