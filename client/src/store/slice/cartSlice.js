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
        addToCart: (state, action) => {
            const { userId, items } = action.payload;
            const userCart = state.items.find(cart => cart.userId === userId);
            if (userCart) {
                userCart.items.push(...items);
            } else {
                state.items.push({ userId, items });
            }
        },

    },
});

export const { getCart, deleteCart, addToCart } = cartSlice.actions;

export default cartSlice.reducer;

