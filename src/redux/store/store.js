import { configureStore } from "@reduxjs/toolkit";
import pizza from "../slice/pizzaSlice";
import cart from "../slice/cartSlice";

const stringMiddleware = (store) => (next) => (action) => {
  if (typeof action === "string") {
    return next({
      type: action,
    });
  }
  return next(action);
};

const rootReducer = {
  pizza,
  cart,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: true }).concat(stringMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
