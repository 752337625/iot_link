import type { VbenFormProps } from '#/adapter/form';

import { h } from 'vue';

import { UploadOutlined } from '@ant-design/icons-vue';
import { Button, message } from 'ant-design-vue';

import { z } from '#/adapter/form';

export const formOptions: VbenFormProps = {
  showDefaultActions: false,
  wrapperClass: 'grid-cols-1',
  schema: [
    {
      fieldName: 'groupName',
      component: 'Input',
      label: '名称',
      rules: 'required',
      componentProps: {
        placeholder: '设备名称',
        maxLength: 10,
      },
    },
    {
      fieldName: 'remark',
      component: 'Textarea',
      label: '介绍',
      rules: z.string().min(20, { message: '请输入至少20个字符' }),
      componentProps: {
        placeholder: '设备介绍',
        rows: 3,
        maxlength: 100,
        size: 'small',
      },
    },
    {
      fieldName: 'imageFile',
      component: 'Upload',
      label: '图片',
      rules: 'required',
      renderComponentContent: () => {
        return {
          default: () =>
            h(Button, null, [h(UploadOutlined), h('span', '上传照片')]),
        };
      },
      componentProps: {
        showUploadList: true,
        maxCount: 1,
        accept: 'image/*',
        customRequest: () => {},
        beforeUpload: (file: File) => {
          const allowedMimeTypes = [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/bmp',
            'image/webp',
          ];
          if (!allowedMimeTypes.includes(file.type)) {
            message.error('请上传有效的图片文件');
            return false;
          }
          return Promise.resolve(file);
        },
      },
    },
  ],
};
