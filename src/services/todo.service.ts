import axios, { AxiosResponse } from 'axios';
import authHeader from '@/services/auth-header';
import { ResponseEntity } from '@/types/ResponseEntity';

// const API_URL = 'http://localhost:3000/api';
const API_URL = '/api';

class TodoService {
  /**
   * 모든 Todo 목록을 반환한다.
   */
  getPublicTodos = (): Promise<AxiosResponse<ResponseEntity>> => axios.get(`${API_URL}/todo`, { headers: authHeader() });

  /**
   * 특정 id를 가진 Todo를 반환한다.
   * @param todoId
   */
  getTodoByTodoId = (todoId: number): Promise<AxiosResponse<ResponseEntity>> => axios.get(`${API_URL}/todo/${todoId}`, { headers: authHeader() });

  /**
   * 로그인한 유저의 todo 목록을 반환한다.
   */
  getUserTodos = (): Promise<AxiosResponse<ResponseEntity>> => axios.get(`${API_URL}/todo/user`, { headers: authHeader() });

  // getManagerTodos = () => {
  //
  // };
  //
  // getAdminTodos = () => {
  //
  // };
}

// export service instance
export default new TodoService();
