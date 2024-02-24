import { createSlice } from "@reduxjs/toolkit";

const initialCartstate = {
    cart: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialCartstate,
    reducers: {
      addCart(state, action){},
      deleteItem(state, action){},
      increaseItemQuantity(state, action){},
      decreaseItemQuantity(state, action){},
      clearCart(state, action){},
    }
});