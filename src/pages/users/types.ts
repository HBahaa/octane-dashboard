export type Role = 'Admin' | 'User' | 'Guest';

export type User = {
  id: string;
  username: string;
  email: string;
  role: Role;
  status: boolean;
  password: string;
};

export type mappedUser = {
  status: JSX.Element;
  id: string;
  username: string;
  email: string;
  role: Role;
  password: string;
};