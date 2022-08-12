export type User = {
  name: string;
  email: string;
  password: string;
  role: string;
};

export type LoginUser = Pick<User, 'email' | 'password'>;
