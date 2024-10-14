import { Role } from "./types";

export type TableIds =
  | 'username'
  | 'email'
  | 'role'
  | 'status';

export type TableHeaderType = Array<{
  id: TableIds;
  title?: string;
}>;

export const TableHeaders = [
  {
    id: 'username',
    title: 'Username', // if the dashboard is multi language we can set here the key of title in localization file
  },
  {
    id: 'email',
    title: 'Email',
  },
  {
    id: 'role',
    title: 'Role',
  },
  {
    id: 'status',
    title: 'Status',
  }
];

export const roles: Role[] = ['Admin', 'Guest', 'User'];