import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "./slices/users/usersSlice";
import userProfileSlice from "./slices/userProfile/userProfileSlice";
import ordersSlice from "./slices/orders/ordersSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    userProfile: userProfileSlice,
    orders: ordersSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
