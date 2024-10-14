import { Status } from "./types";

export type TableIds =
  | 'customerName'
  | 'date'
  | 'total'
  | 'status';

export type TableHeaderType = Array<{
  id: TableIds;
  title?: string;
}>;

export const TableHeaders:TableHeaderType = [
  {
    id: 'customerName',
    title: 'Customer Name', // if the dashboard is multi language we can set here the key of title in localization file
  },
  {
    id: 'date',
    title: 'Date',
  },
  {
    id: 'total',
    title: 'Total',
  },
  {
    id: 'status',
    title: 'Status',
  }
];

export const StatusToColor: Record<Status, string> = {
  Pending: 'yellow',
  Shipped: 'blue',
  Delivered: 'green',
  Cancelled: 'gray',
};