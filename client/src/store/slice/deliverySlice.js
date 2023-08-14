import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    deliveries: [],
};

export const deliverySlice = createSlice({
    name: 'delivery',
    initialState,
    reducers: {
        getDelivery: (state, action) => {
            return action.payload;
        },
        deleteDelivery: (state) => {
            state.deliveries = [];
        },
    },
});

export const { getDelivery, deleteDelivery } = deliverySlice.actions;

export default deliverySlice.reducer;
