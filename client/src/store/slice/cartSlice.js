import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {},
    reducers: {
        getCart: (state, action) => {
            return action.payload[0]
        },

        update: (state, action) => {
            return action.payload;
        },
    },
});


export const { getCart, deleteCart, update } = cartSlice.actions;

export default cartSlice.reducer;

