import { AxiosRequestHeaders } from 'axios';

interface AuthHeader {
  Authrization: string;
}

/**
 *  local storage의 토큰을 헤더 형태로 가공해 반환한다.
 */
export default function authHeader(): AxiosRequestHeaders | undefined {
  const userInfoString = localStorage.getItem('user');
  if (userInfoString) {
    const userInfo = JSON.parse(userInfoString);
    if (userInfo && userInfo.accessToken) {
      return { Authorization: `Bearer ${userInfo.accessToken}` };
    }
  }
  return undefined;
}
