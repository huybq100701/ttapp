import { createSlice } from '@reduxjs/toolkit';

export const deliverySlice = createSlice({
    name: 'delivery',
    initialState: [],
    reducers: {
        getDelivery: (state, action) => {
            return action.payload;
        },

        deleteDelivery: (state) => {
            return [];
        },
    },
});

export const { getDelivery, deleteDelivery } = deliverySlice.actions;

export default deliverySlice.reducer;
