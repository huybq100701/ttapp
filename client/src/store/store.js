import { configureStore } from "@reduxjs/toolkit";
import restaurantSlice from "./slice/restaurantSlice";
import cartSlice from "./slice/cartSlice";

export const store = configureStore({
    reducer: {
        restaurant: restaurantSlice,
        cart: cartSlice,
    },
});
