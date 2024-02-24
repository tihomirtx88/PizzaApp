import { createSlice } from "@reduxjs/toolkit";

const initialCartstate = {
    cart: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialCartstate,
    reducers: {
      addCart(state, action){
        // payload === newItem
        state.cart.push(action.payload);
      },
      deleteItem(state, action){
        // payload === pizzaId
        state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
      },
      increaseItemQuantity(state, action){
         // payload === pizzaId
        const item = state.cart.find((item) => item.pizzaId === action.payload);
        item.quantity++;
        item.totalPrice = item.quantity * item.unitPrice;
      },
      decreaseItemQuantity(state, action){
           // payload === pizzaId
           const item = state.cart.find((item) => item.pizzaId === action.payload);
           item.quantity--;
           item.totalPrice = item.quantity * item.unitPrice;
      },
      clearCart(state){
        state.cart = [];
      },
    }
});

export const {addCart, deleteItem, increaseItemQuantity, decreaseItemQuantity, clearCart} = cartSlice.actions;

export default cartSlice.reducer;