import { apiURL } from "../../config";
import { User } from "./types";

export const fetchUsers = () => {
  return fetch(`${apiURL}/users`);
};

export const fetchUserDetails = (id: string) => {
  return fetch(`${apiURL}/users/${id}`);
};

export const deleteUser = (id: string) => {
  return fetch(`${apiURL}/users/${id}`, { method: 'DELETE'});
};

export const updateUserDetails = (id: string, data: User) => {
  return fetch(`${apiURL}/users/${id}`, { method: 'PUT', body: JSON.stringify(data) });
};
