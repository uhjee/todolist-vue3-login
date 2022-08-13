import axios from 'axios';
import { LoggedUser, LoginUser, User } from '@/types/User';

// const API_URL = 'http://localhost:3000/api/auth';
const API_URL = '/api/auth';

class AuthService {
  /**
   * 로그인을 진행한다.
   * @param user
   */
  login = (user: LoginUser): Promise<LoggedUser> =>
    axios
      .post(`${API_URL}/signin`, {
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          // save token in local storage
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });

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
  register = (user: User) =>
    axios.post(`${API_URL}/signup`, {
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
    });
}

// export service instance
export default new AuthService();
