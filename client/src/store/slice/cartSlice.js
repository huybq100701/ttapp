import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: null,
    reducers: {
        getRestaurantList: (state, action) => {
            state.splice(0, state.length, ...action.payload);
        },
    },
});

export const { getRestaurantList } = restaurantSlice.actions;

export default restaurantSlice.reducer;