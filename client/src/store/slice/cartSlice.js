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
        
        addItems: (state, action) => {
            state.items?.splice(0, state.items?.length, ...action.payload)
        },
    },
});


export const { getCart, deleteCart, addItems } = cartSlice.actions;

export default cartSlice.reducer;

