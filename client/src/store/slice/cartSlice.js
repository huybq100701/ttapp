import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {},
    reducers: {
        getCart: (state, action) => {
            return action.payload[0]
        },

        deleteCart: (state) => {
            state.restaurantId = '';
            state.items.splice(0, state.length);
        },

        update: (state, action) => {
            return action.payload;
        },
    },
});


export const { getCart, deleteCart, update } = cartSlice.actions;

export default cartSlice.reducer;

