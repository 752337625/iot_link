import { requestClient } from '#/api/request';

export async function mqttClientApiPage(params: Record<string, any>) {
  return requestClient.post('/mqttClient/page', params);
}

export async function mqttClientApiAdd(params: Record<string, any>) {
  return requestClient.post('/mqttClient/add', params);
}

export async function mqttClientApiDelete(params: Record<string, any>) {
  return requestClient.post('/mqttClient/delete', params);
}

export async function mqttClientApiUpdate(params: Record<string, any>) {
  return requestClient.post('/mqttClient/update', params);
}
