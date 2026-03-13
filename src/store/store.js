import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "./orders/ordersSlice";
import driverReducer from "./drivers/DriversSlice";

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
    drivers : driverReducer,
  },
});
