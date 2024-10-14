export type Status = 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled' | '';

export type Order = {
  id: string;
  customerName: string;
  date: string;
  total: number;
  status: Status;
};

export type MappedOrder = { 
  status: JSX.Element;
  id: string;
  customerName: string;
  date: string;
  total: number;
};