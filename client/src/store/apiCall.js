import axios from "axios";
import { API_LINK } from "../../default-value";
import { getRestaurantList } from "./slice/restaurantSlice";

export const fetchRestaurantList = async (dispatch) => {
    try {
        const url = `${API_LINK}/restaurants`;
        const res = await axios.get(url)
        dispatch(getRestaurantList(res.data.restaurants))
    } catch (error) {
        console.log(error);
    }
}