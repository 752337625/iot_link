import { requestClient } from '#/api/request';

// 获取指定类型的枚举数据
export async function enumDataListApiPage(param: Record<string, any>) {
  return requestClient.get('/sysEnum/enumDataList', { params: param });
}

// 获取系统所有枚举类型
export async function enumTypeListApiPage() {
  return requestClient.get('/sysEnum/enumTypeList');
}
