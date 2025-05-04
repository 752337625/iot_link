import { requestClient } from '#/api/request';

export async function deviceConfigApiPage(params: Record<string, any>) {
  return requestClient.post('/deviceConfigApi/page', params);
}

export async function deviceConfigApiAdd(params: Record<string, any>) {
  return requestClient.post('/deviceConfigApi/add', params);
}

export async function deviceConfigApiDelete(params: Record<string, any>) {
  return requestClient.post('/deviceConfigApi/delete', params);
}

export async function deviceConfigApiUpdate(params: Record<string, any>) {
  return requestClient.post('/deviceConfigApi/update', params);
}
