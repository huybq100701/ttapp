import { configureStore } from "@reduxjs/toolkit";
import restaurantSlice from "./slice/restaurantSlice";
import cartSlice from "./slice/cartSlice";
import menuSlice from "./slice/menuSlice";

export const store = configureStore({
    reducer: {
        restaurant: restaurantSlice,
        cart: cartSlice,
        menu: menuSlice,
    },
});
