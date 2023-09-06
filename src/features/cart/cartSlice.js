import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  products: [],
  badgeAmount: null
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    pushProductsToCart: (state, action) => {
      state.products.push(action.payload)
    },
    addBadgeAmount: (state) => {
      state.badgeAmount += 1
    },
    clearCart: (state) => {
      state.products = []
    },
    clearBadgeNumber: (state) => {
      state.badgeAmount = null
    }
  },
});

export const { pushProductsToCart, addBadgeAmount, clearCart, clearBadgeNumber } = cartSlice.actions;
export const selectProductsInsideCart = (state) => state.cart.products;
export const selectBadgeAmount = state => state.cart.badgeAmount
export default cartSlice.reducer;
