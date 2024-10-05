import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const cartAdatper = createEntityAdapter();

const initialState = cartAdatper.getInitialState({
  count: 0,
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      cartAdatper.addMany(state, action.payload);
    },
    removeAllFromCart(state, action) {
      cartAdatper.removeAll(state, action.payload);
      state.count = 0;
    },
    removeOneFromCart(state, action) {
      cartAdatper.removeOne(state, action.payload);
      state.count -= 1;
    },
  },
});

const { actions, reducer } = cartSlice;

export default reducer;

export const { selectAll } = cartAdatper.getSelectors((state) => state.cart);

export const { addToCart, removeAllFromCart, removeOneFromCart } = actions;
