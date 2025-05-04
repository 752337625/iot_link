<script setup lang="ts">
import type { UploadChangeParam } from 'ant-design-vue';

import { onMounted } from 'vue';

import { PlusOutlined } from '@ant-design/icons-vue';
import {
  Button,
  Card,
  Descriptions,
  Image,
  Input,
  InputNumber,
  Slider,
  Switch,
  Tag,
  Upload,
} from 'ant-design-vue';

import { useLayoutCanvasStore } from '#/store/component_store/canvas_page';

import Picker from '../../picker/index.vue';

const layoutCanvasStore = useLayoutCanvasStore();
onMounted(() => {
  layoutCanvasStore.initCanvasPage();
});

const handleUploadChange = (info: UploadChangeParam) => {
  if (!info.file.originFileObj) return;
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    const data = reader.result as string;
    layoutCanvasStore.setValueTopFabricBg({
      backgroundImage: data,
    });
  });
  reader.readAsDataURL(info.file.originFileObj);
};
</script>

<template>
  <div>
    <Tag color="blue" class="mb-4 w-full text-center"> 画布设置 </Tag>
    <Card title="背景设置" size="small">
      <Descriptions
        :column="1"
        size="small"
        :label-style="{
          padding: '1px',
        }"
      >
        <Descriptions.Item label="背景渲染" class="canvas-descriptions-item">
          <Switch
            checked-children="渲染"
            un-checked-children="禁用"
            v-model:checked="layoutCanvasStore.bg.backgroundEditable"
            @change="
              (v) =>
                layoutCanvasStore.setValueTopFabricBg({
                  backgroundEditable: v,
                })
            "
          />
        </Descriptions.Item>
        <Descriptions.Item label="图片" class="canvas-descriptions-item">
          <Upload
            list-type="picture-card"
            :show-upload-list="false"
            :custom-request="() => {}"
            @change="handleUploadChange"
            :disabled="!layoutCanvasStore.bg.backgroundEditable"
          >
            <Image
              v-if="layoutCanvasStore.bg.backgroundImage"
              :src="layoutCanvasStore.bg.backgroundImage"
              :preview="false"
            />
            <PlusOutlined v-else />
          </Upload>
        </Descriptions.Item>
        <Descriptions.Item label="亮度" class="canvas-descriptions-item">
          <Slider
            placeholder="请输入"
            :min="-1"
            :max="1"
            :marks="{
              '-1': '-1',
              '0': '0',
              '1': '1',
            }"
            :disabled="!layoutCanvasStore.bg.backgroundEditable"
            @change="
              (v) => layoutCanvasStore.setValueTopFabricBg({ brightness: v })
            "
            v-model:value="layoutCanvasStore.bg.brightness"
            :included="false"
            :step="0.1"
            class="w-full"
          />
        </Descriptions.Item>
        <Descriptions.Item label="对比" class="canvas-descriptions-item">
          <Slider
            placeholder="请输入"
            :min="-1"
            :max="1"
            :marks="{
              '-1': '-1',
              '0': '0',
              '1': '1',
            }"
            :disabled="!layoutCanvasStore.bg.backgroundEditable"
            @change="
              (v) => layoutCanvasStore.setValueTopFabricBg({ contrast: v })
            "
            v-model:value="layoutCanvasStore.bg.contrast"
            :included="false"
            :step="0.1"
            class="w-full"
          />
        </Descriptions.Item>
        <Descriptions.Item label="模糊" class="canvas-descriptions-item">
          <Slider
            placeholder="请输入"
            :min="0"
            :max="1"
            :marks="{
              0: '0',
              0.5: '0.5',
              1: '1',
            }"
            :disabled="!layoutCanvasStore.bg.backgroundEditable"
            @change="(v) => layoutCanvasStore.setValueTopFabricBg({ blur: v })"
            v-model:value="layoutCanvasStore.bg.blur"
            :included="false"
            :step="0.1"
            class="w-full"
          />
        </Descriptions.Item>
        <Descriptions.Item label="饱和" class="canvas-descriptions-item">
          <Slider
            placeholder="请输入"
            :min="-1"
            :max="1"
            :marks="{
              '-1': '-1',
              '0': '0',
              '1': '1',
            }"
            :disabled="!layoutCanvasStore.bg.backgroundEditable"
            @change="
              (v) => layoutCanvasStore.setValueTopFabricBg({ saturation: v })
            "
            v-model:value="layoutCanvasStore.bg.saturation"
            :included="false"
            :step="0.1"
            class="w-full"
          />
        </Descriptions.Item>
        <Descriptions.Item label="自然" class="canvas-descriptions-item">
          <Slider
            placeholder="请输入"
            :min="-1"
            :max="1"
            :marks="{
              '-1': '-1',
              '0': '0',
              '1': '1',
            }"
            :disabled="!layoutCanvasStore.bg.backgroundEditable"
            @change="
              (v) => layoutCanvasStore.setValueTopFabricBg({ vibrance: v })
            "
            v-model:value="layoutCanvasStore.bg.vibrance"
            :included="false"
            :step="0.1"
            class="w-full"
          />
        </Descriptions.Item>
        <Descriptions.Item label="色相" class="canvas-descriptions-item">
          <Slider
            placeholder="请输入"
            :min="-1"
            :max="1"
            :marks="{
              '-1': '-1',
              '0': '0',
              '1': '1',
            }"
            :disabled="!layoutCanvasStore.bg.backgroundEditable"
            @change="
              (v) => layoutCanvasStore.setValueTopFabricBg({ rotation: v })
            "
            v-model:value="layoutCanvasStore.bg.rotation"
            :included="false"
            :step="0.1"
            class="w-full"
          />
        </Descriptions.Item>
        <Descriptions.Item label="噪声" class="canvas-descriptions-item">
          <Slider
            placeholder="请输入"
            :min="0"
            :max="1000"
            :marks="{
              0: '0',
              250: '250',
              500: '500',
              750: '750',
              1000: '1000',
            }"
            :disabled="!layoutCanvasStore.bg.backgroundEditable"
            @change="(v) => layoutCanvasStore.setValueTopFabricBg({ noise: v })"
            v-model:value="layoutCanvasStore.bg.noise"
            :included="false"
            :step="1"
            class="w-full"
          />
        </Descriptions.Item>
        <!-- <Descriptions.Item label="像素" class="canvas-descriptions-item">
          <Slider
            placeholder="请输入"
            :min="0"
            :max="1000"
            :marks="{
              0: '0',
              250: '250',
              500: '500',
              750: '750',
              1000: '1000',
            }"
            :disabled="!layoutCanvasStore.bg.backgroundEditable"
            @change="
              (v) => layoutCanvasStore.setValueTopFabricBg({ blocksize: v })
            "
            v-model:value="layoutCanvasStore.bg.blocksize"
            :included="false"
            :step="1"
            class="w-full"
          />
        </Descriptions.Item> -->
        <!-- <Descriptions.Item label="反色" class="canvas-descriptions-item">
          <Switch
            checked-children="开启"
            un-checked-children="关闭"
            v-model:checked="layoutCanvasStore.bg.invert"
            @change="
              (v) => layoutCanvasStore.setValueTopFabricBg({ invert: v })
            "
          />
        </Descriptions.Item> -->

        <Descriptions.Item label="颜色" class="canvas-descriptions-item">
          <Input
            placeholder="请选择"
            v-model:value="layoutCanvasStore.bg.backgroundColor"
            :disabled="!layoutCanvasStore.bg.backgroundEditable"
          >
            <template #suffix>
              <Picker
                @save="layoutCanvasStore.setValueTopFabricBg"
                type="backgroundColor"
                :color="layoutCanvasStore.bg.backgroundColor"
              />
            </template>
          </Input>
        </Descriptions.Item>
        <Descriptions.Item label="清除" class="canvas-descriptions-item">
          <div class="flex w-11/12 justify-between">
            <Button
              type="dashed"
              @click="
                layoutCanvasStore.setValueTopFabricBg({
                  backgroundImage: '',
                })
              "
              :disabled="
                layoutCanvasStore.bg.backgroundImage &&
                !layoutCanvasStore.bg.backgroundEditable
              "
              size="small"
            >
              清除图片
            </Button>
            <Button
              type="dashed"
              @click="
                layoutCanvasStore.setValueTopFabricBg({
                  backgroundColor: '',
                })
              "
              :disabled="
                layoutCanvasStore.bg.backgroundColor &&
                !layoutCanvasStore.bg.backgroundEditable
              "
              size="small"
            >
              清除颜色
            </Button>
          </div>
        </Descriptions.Item>
      </Descriptions>
    </Card>
    <Tag color="blue" class="mb-4 mt-2 w-full text-center"> 网格设置 </Tag>
    <Card title="大网格参数" size="small" class="mb-2">
      <Descriptions
        :column="1"
        size="small"
        :label-style="{
          padding: '1px',
        }"
      >
        <Descriptions.Item label="网格渲染" class="canvas-descriptions-item">
          <Switch
            checked-children="渲染"
            un-checked-children="禁用"
            v-model:checked="layoutCanvasStore.grid.gridBigEditable"
            @change="
              (v) =>
                layoutCanvasStore.setValueTopFabricGrid({
                  gridBigEditable: v,
                })
            "
          />
        </Descriptions.Item>
        <Descriptions.Item label="大小" class="canvas-descriptions-item">
          <InputNumber
            placeholder="请输入"
            :min="0"
            :step="1"
            :precision="0"
            class="w-full"
            @change="
              (v) =>
                layoutCanvasStore.setValueTopFabricGrid({
                  gridBigSize: v,
                })
            "
            v-model:value="layoutCanvasStore.grid.gridBigSize"
            :disabled="!layoutCanvasStore.grid.gridBigEditable"
          />
        </Descriptions.Item>
        <Descriptions.Item label="线宽" class="canvas-descriptions-item">
          <InputNumber
            placeholder="请输入"
            :min="0"
            :step="1"
            :precision="0"
            class="w-full"
            @change="
              (v) =>
                layoutCanvasStore.setValueTopFabricGrid({
                  gridBigLineStroke: v,
                })
            "
            v-model:value="layoutCanvasStore.grid.gridBigLineStroke"
            :disabled="!layoutCanvasStore.grid.gridBigEditable"
          />
        </Descriptions.Item>
        <Descriptions.Item label="颜色" class="canvas-descriptions-item">
          <Input
            placeholder="请选择"
            readonly
            v-model:value="layoutCanvasStore.grid.gridBigLineColor"
            :disabled="!layoutCanvasStore.grid.gridBigEditable"
          >
            <template #suffix>
              <Picker
                @save="layoutCanvasStore.setValueTopFabricGrid"
                type="gridBigLineColor"
                :color="layoutCanvasStore.grid.gridBigLineColor"
              />
            </template>
          </Input>
        </Descriptions.Item>
        <Descriptions.Item label="透明" class="canvas-descriptions-item">
          <Slider
            placeholder="请输入"
            :min="0"
            :max="1"
            :marks="{
              0: '0',
              0.5: '0.5',
              1: '1',
            }"
            @change="
              (v) =>
                layoutCanvasStore.setValueTopFabricGrid({
                  gridBigLineOpacity: v,
                })
            "
            v-model:value="layoutCanvasStore.grid.gridBigLineOpacity"
            :included="false"
            :step="0.01"
            class="w-full"
            :disabled="!layoutCanvasStore.grid.gridBigEditable"
          />
        </Descriptions.Item>
      </Descriptions>
    </Card>
    <Card title="小网格参数" size="small">
      <Descriptions
        :column="1"
        size="small"
        :label-style="{
          padding: '2px',
        }"
      >
        <Descriptions.Item label="网格渲染" class="canvas-descriptions-item">
          <Switch
            checked-children="渲染"
            un-checked-children="禁用"
            v-model:checked="layoutCanvasStore.grid.gridSmallEditable"
            @change="
              (v) =>
                layoutCanvasStore.setValueTopFabricGrid({
                  gridSmallEditable: v,
                })
            "
          />
        </Descriptions.Item>
        <Descriptions.Item label="大小" class="canvas-descriptions-item">
          <InputNumber
            placeholder="请输入"
            :min="0"
            :step="1"
            :precision="0"
            class="w-full"
            @change="
              (v) =>
                layoutCanvasStore.setValueTopFabricGrid({
                  gridSmallSize: v,
                })
            "
            v-model:value="layoutCanvasStore.grid.gridSmallSize"
            :disabled="!layoutCanvasStore.grid.gridSmallEditable"
          />
        </Descriptions.Item>
        <Descriptions.Item label="线宽" class="canvas-descriptions-item">
          <InputNumber
            placeholder="请输入"
            :min="0"
            :step="1"
            :precision="0"
            class="w-full"
            @change="
              (v) =>
                layoutCanvasStore.setValueTopFabricGrid({
                  gridSmallLineStroke: v,
                })
            "
            v-model:value="layoutCanvasStore.grid.gridSmallLineStroke"
            :disabled="!layoutCanvasStore.grid.gridSmallEditable"
          />
        </Descriptions.Item>
        <Descriptions.Item label="颜色" class="canvas-descriptions-item">
          <Input
            placeholder="请选择"
            readonly
            v-model:value="layoutCanvasStore.grid.gridSmallLineColor"
            :disabled="!layoutCanvasStore.grid.gridSmallEditable"
          >
            <template #suffix>
              <Picker
                @save="layoutCanvasStore.setValueTopFabricGrid"
                type="gridSmallLineColor"
                :color="layoutCanvasStore.grid.gridSmallLineColor"
              />
            </template>
          </Input>
        </Descriptions.Item>
        <Descriptions.Item label="透明" class="canvas-descriptions-item">
          <Slider
            placeholder="请输入"
            :min="0"
            :max="1"
            :marks="{
              0: '0',
              0.5: '0.5',
              1: '1',
            }"
            @change="
              (v) =>
                layoutCanvasStore.setValueTopFabricGrid({
                  gridSmallLineOpacity: v,
                })
            "
            v-model:value="layoutCanvasStore.grid.gridSmallLineOpacity"
            :included="false"
            :step="0.01"
            class="w-full"
            :disabled="!layoutCanvasStore.grid.gridSmallEditable"
          />
        </Descriptions.Item>
      </Descriptions>
    </Card>
  </div>
</template>
<style scoped lang="scss">
:deep(.ant-card-body) {
  padding: 10px 8px 0;
}

:deep(.canvas-descriptions-item .ant-descriptions-item-container) {
  align-items: center;
}
</style>
