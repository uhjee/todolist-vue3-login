import { User } from '@/types/RegisterUser';

export enum TodoStatus {
  NOT_DONE = 'NOT_DONE', // not done
  DOING = 'DOING', // doing
  DONE = 'DONE', // done
}

export type Todo = {
  id: number;
  content: string;
  status: TodoStatus;
  createAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  user: User;
}

export interface TodosGroupByStatus {
  notDone: Todo[];
  doing: Todo[];
  done: Todo[];
}

export interface AddedEmitPayload {
  id: number;
  status: TodoStatus;
}
