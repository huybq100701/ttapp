import { createSlice } from '@reduxjs/toolkit';

export const menuSlice = createSlice({
    name: 'menu',
    initialState: {},
    reducers: {
        getMenuList: (state, action) => {
            return action.payload
        },
    },
});

export const { getMenuList } = menuSlice.actions;

export default menuSlice.reducer;
