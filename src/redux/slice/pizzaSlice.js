import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

const pizzaAdapter = createEntityAdapter();

const initialState = pizzaAdapter.getInitialState({
  pizzaLoadingStatus: "idle",
});

export const fetchPizza = createAsyncThunk("pizza/fetchPizza", async () => {
  try {
    const response = await fetch(
      "https://66f4217a77b5e88970987278.mockapi.io/items"
    );

    if (!response.ok) {
      throw new Error("Что-то пошло не так");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Ошибка 500");
  }
});

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizza.pending, (state) => {
        state.pizzaLoadingStatus = "loading";
      })
      .addCase(fetchPizza.fulfilled, (state, action) => {
        state.pizzaLoadingStatus = "idle";
        pizzaAdapter.setAll(state, action.payload);
      })
      .addCase(fetchPizza.rejected, (state) => {
        state.pizzaLoadingStatus = "error";
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = pizzaSlice;

export default reducer;

export const { selectAll, selectEntities, selectIds, selectTotal } =
  pizzaAdapter.getSelectors((state) => state.pizza);

export const { pizzaFetching, pizzaFetchingError, pizzaFetched } = actions;
