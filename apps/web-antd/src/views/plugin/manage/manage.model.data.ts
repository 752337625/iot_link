import type { VbenFormProps } from '#/adapter/form';

import { h } from 'vue';

import { UploadOutlined } from '@ant-design/icons-vue';
import { Button, message } from 'ant-design-vue';

export const formOptions: VbenFormProps = {
  wrapperClass: 'grid-cols-1 ',
  showDefaultActions: false,
  schema: [
    {
      fieldName: 'driverName',
      component: 'Input',
      label: '驱动名',
      rules: 'required',
      componentProps: {
        placeholder: '驱动名',
        maxLength: 10,
      },
    },
    {
      fieldName: 'driverDllFile',
      component: 'Upload',
      label: '驱动文件',
      help: '请上传.dll驱动文件',
      rules: 'required',
      renderComponentContent: () => {
        return {
          default: () =>
            h(Button, null, [h(UploadOutlined), h('span', '上传驱动文件')]),
        };
      },
      componentProps: {
        showUploadList: true,
        maxCount: 1,
        accept: '.dll',
        customRequest: () => {},
        beforeUpload: (file: File) => {
          if (file.type !== 'application/x-msdownload') {
            message.error('请上传.dll文件');
            return false;
          }
          return Promise.resolve(file);
        },
      },
    },
  ],
};
