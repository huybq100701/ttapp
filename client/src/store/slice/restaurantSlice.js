import { createSlice } from '@reduxjs/toolkit';

export const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState: [],
    reducers: {
        getRestaurantList: (state, action) => {
            state.splice(0, state.length, ...action.payload);
        },
    },
});

export const { getRestaurantList } = restaurantSlice.actions;

export default restaurantSlice.reducer;
