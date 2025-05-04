import { requestClient } from '#/api/request';

export async function driverApiPage(params: Record<string, any>) {
  return requestClient.post('/driverApi/page', params);
}

export async function driverApiAdd(params: Record<string, any>) {
  return requestClient.post('/driverApi/add', params, {
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
  });
}

export async function driverApiDelete(params: Record<string, any>) {
  return requestClient.post('/driverApi/delete', params);
}
