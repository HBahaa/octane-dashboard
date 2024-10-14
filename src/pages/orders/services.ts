import { apiURL } from "../../config";
import { Order } from "./types";

export const fetchOrders = () => {
  return fetch(`${apiURL}/orders`);
};

export const fetchOrderDetails = (id: string) => {
  return fetch(`${apiURL}/orders/${id}`);
};

export const deleteOrder = (id: string) => {
  return fetch(`${apiURL}/orders/${id}`, { method: 'DELETE'});
};

export const updateOrderStatus = (id: string, order: Order) => {
  return fetch(`${apiURL}/orders/${id}`, { method: 'PUT', body: JSON.stringify({...order})  });
};
