import axios from "axios";
import { API_LINK } from "../../default-value";
import { getRestaurantList } from "./slice/restaurantSlice";
import { getCart } from "./slice/cartSlice";

export const fetchRestaurantList = async (dispatch) => {
    try {
        const url = `${API_LINK}/restaurants`;
        const res = await axios.get(url)
        dispatch(getRestaurantList(res.data.restaurants))
    } catch (error) {
        console.log(error);
    }
}

export const fetchCart = async (dispatch, userId) => {
    try {
        const url = `${API_LINK}/cart/${userId}`;
        const res = await axios.get(url)
        // console.log(res.data.cart)
        dispatch(getCart(res.data.cart))
    } catch (error) {
        console.log(error);
    }
}