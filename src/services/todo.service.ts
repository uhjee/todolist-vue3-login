import axios, { AxiosResponse } from 'axios';
import authHeader from '@/services/auth-header';
import { ResponseEntity } from '@/types/ResponseEntity';
import { Todo, TodosGroupByStatus } from '@/types/Todo';

// const API_URL = 'http://localhost:3000/api';
const API_URL = '/api';

class TodoService {
  /**
   * 모든 Todo 목록을 반환한다.
   */
  getPublicTodos = () => axios.get<ResponseEntity<Todo[]>>(`${API_URL}/todo`, { headers: authHeader() });

  /**
   * 특정 id를 가진 Todo를 반환한다.
   * @param todoId
   */
  getTodoByTodoId = (todoId: number) => axios.get<ResponseEntity<Todo[]>>(`${API_URL}/todo/${todoId}`, { headers: authHeader() });

  /**
   * 로그인한 유저의 todo 목록을 반환한다.
   */
  getUserTodos = async () => axios.get<ResponseEntity<Todo[]>>(`${API_URL}/todo/user`, { headers: authHeader() });

  // getManagerTodos = () => {
  //
  // };
  //
  // getAdminTodos = () => {
  //
  // };

  getAllTodosGroupByStatus = async () => axios.get<ResponseEntity<TodosGroupByStatus>>(`${API_URL}/todo/status`);

  updateTodo = async (todoId: number, todo: Partial<Todo>) => axios.patch<ResponseEntity<Todo>>(`${API_URL}/todo/${todoId}`, todo);
}

// export service instance
export default new TodoService();
