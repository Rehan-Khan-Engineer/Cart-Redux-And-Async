import { createSlice } from "@reduxjs/toolkit";

const initialMyCartButtonState = { showCart: false, notification: null };

const showCartSlice = createSlice({
  name: "myCartButton",
  initialState: initialMyCartButtonState,
  reducers: {
    showCart(state) {
      state.showCart = !state.showCart;
    },

    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export const myCartButtonActions = showCartSlice.actions;
export default showCartSlice;
