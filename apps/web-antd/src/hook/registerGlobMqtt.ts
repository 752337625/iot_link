/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
window.mqttClient = mqtt.connect(`ws://${window.location.host}/mqtt`, {
  clean: true, // true: 清除会话, false: 保留会话
  // binary: false, // 我发送的是否为二进制
  clientId: `mqtt_${Math.random().toString(16).slice(2, 8)}`,
  // writeCache: true,
  // 认证信息
  username: 'admin',
  password: '123456',
  keepalive: 5, // 保持连接的心跳间隔，单位为秒。
  reconnectPeriod: 10_000, // 断开后重连的时间间隔，单位为毫秒。当设置为 0 以后将取消自动重连
  connectTimeout: 6000, // 连接超时的时间，单位为毫秒。
  protocolVersion: 5, // MQTT 版本
  rejectUnauthorized: false, // 是否拒绝未经授权（安全协议）
  resubscribe: true,
});
// @ts-ignore
window.mqttClient.on('connect', () => {
  // eslint-disable-next-line no-console
  console.log('客户端连接成功...');
});
// client.on('message', (topic, message) => {});
// 重新连接，启动触发回调
// @ts-ignore
window.mqttClient.on('reconnect', () => {
  // eslint-disable-next-line no-console
  console.log('客户端正在重连.....请稍后');
});
// 连接断开，启动触发回调
// @ts-ignore
window.mqttClient.on('close', () => {
  // eslint-disable-next-line no-console
  console.log('客户端以断开连接..... ');
}); // @ts-ignore
window.mqttClient.on('disconnect', () => {
  // eslint-disable-next-line no-console
  console.log(`disconnect..... `);
});
// 客户端脱机下线,启动触发回调
// @ts-ignore
window.mqttClient.on('offline', () => {
  // eslint-disable-next-line no-console
  console.log('客户端脱机下线..... ');
});
// 客户端无法连接或出现错误时触发回调
// @ts-ignore
window.mqttClient.on('error', () => {
  // eslint-disable-next-line no-console
  console.log(`客户端无法连接或出现错误.....`);
});
