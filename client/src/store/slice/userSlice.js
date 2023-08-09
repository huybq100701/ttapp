import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        getUser: (state, action) => {
            return action.payload;
        },

        updateUser: (state, action) => {
            return action.payload;
        },

        deleteUser: (state) => {
            return {};
        },
    },
});

export const { getUser, updateUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
