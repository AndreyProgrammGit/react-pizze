import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const cartAdatper = createEntityAdapter();

// const initialState = cartAdatper.getInitialState({
//   count: 0,
// });

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.items.push(action.payload);
      // cartAdatper.addMany(state, action.payload);
    },
    buttonPlus(state) {
      state.items = state.items.map((pizza) => ({
        ...pizza,
        count: pizza.count + 1,
      }));
    },
    buttonMinus(state) {
      state.items = state.items.map((pizza) => ({
        ...pizza,
        count: pizza.count - 1,
      }));
    },
    removeAllFromCart(state) {
      state.items = state.items.slice(0, state.items.length);
      // cartAdatper.removeAll(state, action.payload);
    },
    removeOneFromCart(state, action) {
      state.items = state.items.fitler((obj) => obj.id !== action.payload);
      // cartAdatper.removeOne(state, action.payload);
    },
  },
});

const { actions, reducer } = cartSlice;

export default reducer;

export const { selectAll, selectIds } = cartAdatper.getSelectors(
  (state) => state.cart
);

export const {
  addToCart,
  removeAllFromCart,
  removeOneFromCart,
  buttonPlus,
  buttonMinus,
} = actions;
