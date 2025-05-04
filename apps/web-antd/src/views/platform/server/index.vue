<script lang="ts" setup>
import type {
  MachineBaseInfo,
  MachineServerDisk,
  MachineUseInfo,
} from './index.d';

import { onMounted, ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Card, Col, Descriptions, Flex, Row } from 'ant-design-vue';

import { sysServeBase, sysServerDisk, sysServerUsed } from '#/api';

import CoreChart from './components/core.vue';
import DiskChart from './components/disk.vue';
import MemoryChart from './components/memory.vue';

const machineBaseInfo = ref<MachineBaseInfo>({});
const machineUseInfo = ref<MachineUseInfo>({});
const machineServerDisk = ref<MachineServerDisk[]>([]);

onMounted(() => {
  sysServeBase().then((res: MachineBaseInfo) => {
    machineBaseInfo.value = res;
  });
  sysServerUsed().then((res: MachineUseInfo) => {
    machineUseInfo.value = res;
  });
  sysServerDisk().then((res: MachineServerDisk[]) => {
    machineServerDisk.value = res;
  });
});
</script>

<template>
  <Page>
    <Row :gutter="[0, 5]">
      <Col :span="24">
        <Card title="系统信息">
          <Descriptions
            :column="1"
            :label-style="{ width: '120px' }"
            bordered
            size="small"
          >
            <Descriptions.Item
              :content-style="{ textAlign: 'center' }"
              label="主机名称"
            >
              {{ machineBaseInfo.hostName }}
            </Descriptions.Item>
            <Descriptions.Item
              :content-style="{ textAlign: 'center' }"
              label="操作系统"
            >
              {{ machineBaseInfo.systemOs }}
            </Descriptions.Item>
            <Descriptions.Item
              :content-style="{ textAlign: 'center' }"
              label="系统架构"
            >
              {{ machineBaseInfo.osArchitecture }}
            </Descriptions.Item>
            <Descriptions.Item
              :content-style="{ textAlign: 'center' }"
              label="CPU核数"
            >
              {{ machineBaseInfo.processorCount }}
            </Descriptions.Item>
            <Descriptions.Item
              :content-style="{ textAlign: 'center' }"
              label="运行时长"
            >
              {{ machineBaseInfo.sysRunTime }}
            </Descriptions.Item>
            <Descriptions.Item
              :content-style="{ textAlign: 'center' }"
              label="外网地址"
            >
              {{ machineBaseInfo.remoteIp }}
            </Descriptions.Item>
            <Descriptions.Item
              :content-style="{ textAlign: 'center' }"
              label="内网地址"
            >
              {{ machineBaseInfo.localIp }}
            </Descriptions.Item>
            <Descriptions.Item
              :content-style="{ textAlign: 'center' }"
              label="运行框架"
            >
              {{ machineBaseInfo.frameworkDescription }}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Col>
      <Col :span="24">
        <Card title="使用信息">
          <Descriptions
            :column="1"
            :label-style="{ width: '120px' }"
            bordered
            size="small"
          >
            <Descriptions.Item
              :content-style="{ textAlign: 'center' }"
              label="启动时间"
            >
              {{ machineUseInfo.startTime }}
            </Descriptions.Item>
            <Descriptions.Item
              :content-style="{ textAlign: 'center' }"
              label="运行时长"
            >
              {{ machineUseInfo.runTime }}
            </Descriptions.Item>
            <Descriptions.Item
              :content-style="{ textAlign: 'center' }"
              label="网站目录"
            >
              {{ machineBaseInfo.wwwroot }}
            </Descriptions.Item>
            <Descriptions.Item
              :content-style="{ textAlign: 'center' }"
              label="开发环境"
            >
              {{ machineBaseInfo.environment }}
            </Descriptions.Item>
            <Descriptions.Item
              :content-style="{ textAlign: 'center' }"
              label="环境变量"
            >
              {{ machineBaseInfo.stage }}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Col>
      <Col :span="24">
        <Row>
          <Col :span="12">
            <Card title="内存使用率">
              <MemoryChart :machine-use-info="machineUseInfo" />
            </Card>
          </Col>
          <Col :span="12">
            <Card title="CPU使用率">
              <CoreChart :machine-use-info="machineUseInfo" />
            </Card>
          </Col>
        </Row>
      </Col>
      <Col :span="24">
        <Row>
          <Col :span="24">
            <Card title="磁盘信息">
              <Flex gap="small" wrap="wrap">
                <template
                  v-for="item in machineServerDisk"
                  :key="item.diskName"
                >
                  <DiskChart :machine-server-disk="item" />
                </template>
              </Flex>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  </Page>
</template>
