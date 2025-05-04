import { requestClient } from '#/api/request';

export async function variableApiPage(params: Record<string, any>) {
  return requestClient.post('/variableApi/page', params);
}

export async function variableApiAdd(params: Record<string, any>) {
  return requestClient.post('/variableApi/add', params);
}

export async function variableApiDelete(params: Record<string, any>) {
  return requestClient.post('/variableApi/delete', params);
}

export async function variableApiUpdate(params: Record<string, any>) {
  return requestClient.post('/variableApi/update', params);
}

export async function variableApiDetail(params: Record<string, any>) {
  return requestClient.get(`/deviceApi/detail/${params.id}`);
}
