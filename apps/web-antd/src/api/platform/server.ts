import { requestClient } from '#/api/request';

/**
 * @description 系统服务器监控服务-获取服务器配置信息
 */

export async function sysServeBase() {
  return requestClient.get('/sysServer/serverBase');
}

/**
 * @description 系统服务器监控服务-获取服务器使用信息
 */

export async function sysServerUsed() {
  return requestClient.get('/sysServer/serverUsed');
}

/**
 * @description 系统服务器监控服务-获取服务器磁盘信息
 */

export async function sysServerDisk() {
  return requestClient.get('/sysServer/serverDisk');
}
