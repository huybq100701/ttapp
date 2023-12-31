import axios from 'axios';
import { API_LINK } from '../../default-value';
import { addRestaurantList, getRestaurantList } from './slice/restaurantSlice';
import { getCart, update } from './slice/cartSlice';
import { getMenuList } from './slice/menuSlice';
import { getUser, updateUser } from './slice/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchRestaurantList = async (dispatch) => {
    try {
        const url = `${API_LINK}/restaurants`;
        const res = await axios.get(url);
        dispatch(getRestaurantList(res.data.restaurants));
    } catch (error) {
        console.log('Error fetching RestaurantList data:', error);
    }
};

export const addRestaurant = async (dispatch, data) => {
    try {
        const url = `${API_LINK}/restaurants`;
        const res = await axios.post(url, data);
        dispatch(addRestaurantList(res.data.restaurant))
    } catch (error) {
        console.log('Error o add Restaurant', error)
    }
}

export const fetchCart = async (dispatch, userId) => {
    try {
        const url = `${API_LINK}/cart/${userId}`;
        const res = await axios.get(url);
        dispatch(getCart(res.data.cart));
    } catch (error) {
        console.log('Error fetching cart data:', error);
    }
};

export const fetchCartForLocal = async (userId) => {
    try {
        const url = `${API_LINK}/cart/local/${userId}`;
        const res = await axios.get(url);
        await AsyncStorage.setItem('orderItems', JSON.stringify(res.data.cart[0].items));
    } catch (error) {
        console.log('Error fetching cart data:', error);
    }
};

export const fetchMenuOfRestaurant = async (dispatch, restaurantId) => {
    try {
        const url = `${API_LINK}/restaurants/${restaurantId}`;
        const res = await axios.get(url);
        dispatch(getMenuList(res.data.data));
    } catch (error) {
        console.log('Error fetching restaurant data:', error);
    }
};

export const fetchUser = async (dispatch, userId) => {
    try {
        const url = `${API_LINK}/users/${userId}`;
        const res = await axios.get(url);
        await dispatch(getUser(res.data?.user[0]));
    } catch (error) {
        console.log('Error fetching user data:', error);
    }
};

export const updateUserById = async (dispatch, userId, updateData) => {
    try {
        const url = `${API_LINK}/users/update/${userId}`;
        const res = await axios.put(url, updateData);
        dispatch(updateUser(res.data.user));
    } catch (error) {
        console.log('Error update user data:', error);
    }
};

export const saveCart = async (dispatch, userId, cartId, restaurantId, items) => {
    try {
        const updateData = {
            userId,
            restaurantId,
            items,
        };
        const url = `${API_LINK}/cart/${cartId}`;
        const res = await axios.put(url, updateData);
        dispatch(update(res.data.cart));
    } catch (error) {
        console.error('Error saving cart ', error);
    }
};

export const saveOrder = async (dispatch, cart) => {
    try {
        const url = `${API_LINK}/order`;
        const url2 = `${API_LINK}/cart/${cart._id}`;
        const res = await axios.post(url, cart);
        const res2 = await axios.put(url2, {
            userId: cart.userId,
            restaurantId: '',
            items: [],
        });
        await AsyncStorage.removeItem('orderItems');
        dispatch(update(res2.data.cart));
    } catch (error) {
        console.error('Error saving order ', error);
    }
};
