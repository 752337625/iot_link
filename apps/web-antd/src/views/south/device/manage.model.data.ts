import type { VbenFormProps } from '#/adapter/form';

export const formOptions: VbenFormProps = {
  showDefaultActions: false,
  wrapperClass: 'grid-cols-2',
  schema: [
    {
      fieldName: 'deviceName',
      component: 'Input',
      label: '分组名称',
      rules: 'required',
      componentProps: {
        placeholder: '分组名称',
      },
    },
    {
      fieldName: 'driverId',
      component: 'Select',
      label: '驱动名称',
      rules: 'required',
      componentProps: {
        placeholder: '驱动名称',
        class: 'w-full',
        allowClear: true,
        fieldNames: {
          label: 'driverName',
          value: 'id',
        },
      },
    },
    {
      fieldName: 'autoStart',
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
    // {
    //   fieldName: 'cgUpload',
    //   component: 'Switch',
    //   label: '变化上传',
    //   rules: 'required',
    //   defaultValue: 0,
    //   componentProps: {
    //     placeholder: '变化上传',
    //     checkedChildren: '上传',
    //     unCheckedChildren: '不上传',
    //     checkedValue: 1,
    //     unCheckedValue: 0,
    //   },
    // },

    // {
    //   fieldName: 'enforcePeriod',
    //   component: 'InputNumber',
    //   label: '归档周期',
    //   rules: 'required',
    //   componentProps: {
    //     placeholder: '归档周期',
    //     class: 'w-full',
    //     addonAfter: 'ms',
    //     precision: 0,
    //     min: 500,
    //   },
    // },
    {
      fieldName: 'pollPeriod',
      component: 'InputNumber',
      label: '轮询周期',
      rules: 'required',
      componentProps: {
        placeholder: '轮询周期',
        class: 'w-full',
        addonAfter: 'ms',
        precision: 0,
        min: 500,
      },
    },
    {
      fieldName: 'order',
      component: 'InputNumber',
      label: '排序',
      rules: 'required',
      componentProps: {
        placeholder: '排序',
        class: 'w-full',
        precision: 0,
        min: 0,
      },
    },
    {
      fieldName: 'description',
      component: 'Textarea',
      label: '介绍',
      rules: 'required',
      formItemClass: 'col-span-2',
      componentProps: {
        placeholder: '监控介绍',
        rows: 3,
        maxlength: 100,
        size: 'small',
      },
    },
  ],
};
