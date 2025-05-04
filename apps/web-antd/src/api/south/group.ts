import { requestClient } from '#/api/request';

export async function groupApiPage(params: Record<string, any>) {
  return requestClient.post('/groupApi/page', params);
}

export async function groupApiAdd(params: Record<string, any>) {
  return requestClient.post('/groupApi/add', params, {
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
  });
}

export async function groupApiDelete(params: Record<string, any>) {
  return requestClient.post('/groupApi/delete', params);
}

export async function groupApiUpdate(params: Record<string, any>) {
  return requestClient.post('/groupApi/update', params, {
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
  });
}
