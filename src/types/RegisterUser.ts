export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  USER = 'USER',
}

export type User = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  isBlackUser: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

}

export type RegisterUser = Pick<User, 'name' | 'email' | 'role'>
  & {
  password: string;
}

export type LoginUser = Pick<RegisterUser, 'email' | 'password'>;

export type LoggedUser = Omit<User, 'password'> & {
  accessToken: string;
}

// export type User
