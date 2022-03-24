export interface IUser {
  id: number;
  username: string;
  role: string;
  email: string;
}

export interface LoginSuccess {
  user: IUser;
  token: string;
}
