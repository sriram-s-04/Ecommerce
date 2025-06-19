import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/CounterSlice";
import e_comReducer from "./slices/E_comSlice";

const store = configureStore({
  reducer: {
    // counter: counterReducer,
    products: e_comReducer,
  },
});
export default store;     