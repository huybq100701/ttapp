import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: null,
    reducers: {
        getCart: (state, action) => {
            state.splice(0, state.length, ...action.payload);
        },

        deleteCart: (state) => {
            state.restaurantId = '';
            state.items.splice(0, state.length);
        }

    },
});

export const { getCart, deleteCart } = cartSlice.actions;

export default cartSlice.reducer;

