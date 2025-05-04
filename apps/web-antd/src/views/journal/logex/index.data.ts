import type { VbenFormProps } from '#/adapter/form';

export const formOptions: VbenFormProps = {
  showCollapseButton: false, // 是否展示折叠按钮
  commonConfig: {
    labelWidth: 0,
  },
  wrapperClass:
    '3xl:grid-cols-5 2xl:grid-cols-5 xl:grid-cols-5 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1',
  actionWrapperClass: 'col-auto text-left',
  schema: [
    {
      fieldName: 'controllerName',
      component: 'Input',
      componentProps: {
        placeholder: '模块名称',
      },
    },
    {
      fieldName: 'actionName',
      component: 'Input',
      componentProps: {
        placeholder: '方法名称',
      },
    },
    {
      fieldName: 'account',
      component: 'Input',
      componentProps: {
        placeholder: '账号名称',
      },
    },
    {
      fieldName: 'status',
      component: 'Select',
      componentProps: {
        placeholder: '状态',
        allowClear: true,
        class: 'w-full',
        options: [
          { label: '成功', value: 200 },
          { label: '失败', value: 400 },
        ],
      },
    },
    {
      fieldName: 'elapsed',
      component: 'Input',
      componentProps: {
        placeholder: '耗时>?MS',
      },
    },
    {
      fieldName: 'elapsed',
      component: 'Input',
      componentProps: {
        placeholder: '耗时>?MS',
      },
    },
    {
      fieldName: 'startTime',
      component: 'DatePicker',
      componentProps: {
        placeholder: '开始时间',
        format: 'YYYY-MM-DD HH:mm:ss',
        showTime: true,
        class: 'w-full',
      },
    },
    {
      fieldName: 'endTime',
      component: 'DatePicker',
      componentProps: {
        placeholder: '结束时间',
        format: 'YYYY-MM-DD HH:mm:ss',
        showTime: true,
        class: 'w-full',
      },
    },
  ],
};
