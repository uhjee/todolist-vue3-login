export enum TodoStatus {
  NOT_DONE = 'NOT_DONE', // not done
  DOING = 'DOING', // doing
  DONE = 'DONE', // done
}

export type Todo = {
  id: number;
  content: string;
  status: TodoStatus;
  user: any;
}
