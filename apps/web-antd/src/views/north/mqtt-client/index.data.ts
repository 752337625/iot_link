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
      fieldName: 'mqttIp',
      component: 'Input',
      componentProps: {
        placeholder: 'Ip地址',
      },
    },
  ],
};
