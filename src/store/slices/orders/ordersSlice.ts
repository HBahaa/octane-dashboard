
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Order } from "../../../pages/orders/types";

type OrdersState = {
  orders: Order[],
}

const initialState : OrdersState = {
  orders: [],
};


const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) =>{
      state.orders = action.payload;
    },
  },
});

export const { setOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
