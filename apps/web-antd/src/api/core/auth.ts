import { baseRequestClient, requestClient } from '#/api/request';

export namespace AuthApi {
  /** 登录接口参数 */
  export interface LoginParams {
    password?: string;
    username?: string;
    codeId?: number;
  }

  /** 登录接口返回值 */
  export interface LoginResult {
    accessToken: string;
    refreshToken: string;
  }
  /** 无感刷新前端Token参数 */
  export interface refreshTokenParams {
    accessToken: null | string;
  }
}

/**
 * 登录
 */
export async function loginApi(params: AuthApi.LoginParams) {
  return requestClient.post<AuthApi.LoginResult>('/sysAuth/login', params);
}

/**
 * 刷新accessToken
 */
export async function refreshTokenApi(params: AuthApi.refreshTokenParams) {
  return baseRequestClient.get(
    `/sysAuth/refreshToken?accessToken=${params.accessToken}`,
  );
}

/**
 * 退出登录
 */
export async function logoutApi() {
  return baseRequestClient.post('/sysAuth/logout', {
    withCredentials: true,
  });
}

/**
 * 获取用户权限码
 */
// export async function getAccessCodesApi() {
//   return requestClient.get<string[]>('/sysMenu/ownBtnPermList');
// }
