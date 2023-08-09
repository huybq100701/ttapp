import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {},
    total: 0,
    reducers: {
        getCart: (state, action) => {
            return action.payload[0]
        },

        deleteCart: (state) => {
            state.restaurantId = '';
            state.items.splice(0, state.length);
        },
        addItem: (state, action) => {
            const { menuId, quantity } = action.payload;
            const existingItem = state.items.find(item => item.menu._id === menuId);
            
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                state.items.push({ menu: { _id: menuId }, quantity });
            }

            state.total = calculateTotal(state.items);
        },
    },
});
const calculateTotal = (items) => {
    return items.reduce((total, item) => total + item.menu.price * item.quantity, 0);
};

export const { getCart, deleteCart, addItem } = cartSlice.actions;

export default cartSlice.reducer;

