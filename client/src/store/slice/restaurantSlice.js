import { createSlice } from '@reduxjs/toolkit';

export const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState: [],
    reducers: {
        getRestaurantList: (state, action) => {
            state.splice(0, state.length, ...action.payload);
        },

        addRestaurantList: (state, action) => {
            state.push(action.payload)
        }
    },
});

export const { getRestaurantList, addRestaurantList } = restaurantSlice.actions;

export default restaurantSlice.reducer;
