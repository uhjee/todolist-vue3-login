import axios from 'axios';
import { LoggedUser, LoginUser, RegisterUser } from '@/types/RegisterUser';
import { ResponseEntity } from '@/types/ResponseEntity';

// const API_URL = 'http://localhost:3000/api/auth';
const API_URL = '/api/auth';

class AuthService {
  /**
   * 로그인을 진행한다.
   * @param user
   */
  login = async (user: LoginUser): Promise<LoggedUser> => {
    const { data: resData } = await axios.post<ResponseEntity<LoggedUser>>(`${API_URL}/signin`, {
      email: user.email,
      password: user.password,
    });

    if (resData?._data?.accessToken) {
      // save token in local storage
      localStorage.setItem('user', JSON.stringify(resData));
      return resData._data;
    }
    throw new Error('Login Failure');
  };

  /**
   * 로그아웃을 처리한다.
   */
  logout = () => {
    // remove token
    localStorage.removeItem('user');
  };

  /**
   * 회원가입을 진행한다.
   * @param user
   */
  register = async (user: RegisterUser) => {
    const { data: resData } = await axios.post(`${API_URL}/signup`, {
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
    });
    return resData;
  };
}

// export service instance
export default new AuthService();
