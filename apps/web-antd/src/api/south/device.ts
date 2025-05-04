import { requestClient } from '#/api/request';

export async function deviceApiPage(params: Record<string, any>) {
  return requestClient.post('/deviceApi/page', params);
}

export async function deviceApiAdd(params: Record<string, any>) {
  return requestClient.post('/deviceApi/add', params);
}

export async function deviceApiDelete(params: Record<string, any>) {
  return requestClient.post('/deviceApi/delete', params);
}

export async function deviceApiUpdate(params: Record<string, any>) {
  return requestClient.post('/deviceApi/update', params);
}

export async function deviceApiDetail(params: Record<string, any>) {
  return requestClient.get(`/deviceApi/detail/${params.id}`);
}
export async function deviceApiMethodDetail(params: Record<string, any>) {
  return requestClient.get(`/deviceApi/driverMethods/${params.deviceId}`);
}
