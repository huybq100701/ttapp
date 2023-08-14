import { configureStore } from "@reduxjs/toolkit";
import restaurantSlice from "./slice/restaurantSlice";
import cartSlice from "./slice/cartSlice";
import menuSlice from "./slice/menuSlice";
import userSlice from "./slice/userSlice";

export const store = configureStore({
    reducer: {
        restaurant: restaurantSlice,
        cart: cartSlice,
        menu: menuSlice,
        user: userSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: { warnAfter: 128 },
        serializableCheck: { warnAfter: 128 },
    })
});
