import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import axios from 'axios';
import { API_LINK } from '../../default-value';
const CartScreen = ({ route, navigation }) => {
    const { userId } = route.params; 

    const [cart, setCart] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const response = await axios.get(`${API_LINK}/cart/${userId}`);
            const fetchedCart = response.data.cart;

            const calculatedTotalPrice = fetchedCart.items.reduce(
                (total, item) => total + item.menu.price * item.quantity,
                0
            );

            setCart(fetchedCart);
            setTotalPrice(calculatedTotalPrice);
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };
    const insets = useSafeAreaInsets();

    const renderCartItem = ({ item }) => (
        <View style={styles.cartItem}>
            <Text>{item.menu.name}</Text>
            <Text>${(item.menu.price * item.quantity).toFixed(2)}</Text>
        </View>
    );

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <Text style={styles.header}>Your Cart</Text>
            {cart.items && cart.items.length > 0 ? (
                <View style={styles.cartContainer}>
                    <FlatList
                        data={cart.items}
                        renderItem={renderCartItem}
                        keyExtractor={(item) => item._id}
                        ListFooterComponent={
                            <View style={styles.totalContainer}>
                                <Text style={styles.totalText}>Total:</Text>
                                <Text style={styles.totalPrice}>${totalPrice.toFixed(2)}</Text>
                            </View>
                        }
                    />
                    <TouchableOpacity
                        style={styles.orderButton}
                        onPress={() => navigation.navigate('OrderConfirmation')}
                    >
                        <Text style={styles.orderButtonText}>Place Order</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <Text style={styles.emptyText}>Your cart is empty.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 20,
    },
    cartContainer: {
        paddingHorizontal: 20,
    },
    cartItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        marginTop: 10,
    },
    totalText: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    totalPrice: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    orderButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        alignItems: 'center',
    },
    orderButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    emptyText: {
        alignSelf: 'center',
        marginTop: 100,
        fontSize: 18,
        color: '#888',
    },
});

export default CartScreen;
