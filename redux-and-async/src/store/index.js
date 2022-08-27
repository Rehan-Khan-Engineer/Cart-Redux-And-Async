import { configureStore } from "@reduxjs/toolkit";
import cartUpdates from "./cart-slice";
import showCartSlice from "./showCart-slice";

const store = configureStore({
  reducer: {
    myCartButton: showCartSlice.reducer,
    cartUpdates: cartUpdates.reducer,
  },
});

export default store;
