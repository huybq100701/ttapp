import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { fetchCart } from '../store/apiCall'; 
import { themeColors } from '../theme';

export default function CartScreen({ navigation, route }) {
    const insets = useSafeAreaInsets();
    const [totalPrice, setTotalPrice] = useState(0); 
    const [fetchedCart, setFetchedCart] = useState(null); 

    const userId = route.params.userId; 
    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const cartData = await fetchCart(userId);
                setFetchedCart(cartData);

                const calculatedTotalPrice = cartData.items.reduce(
                    (total, item) => total + item.menu.price * item.quantity,
                    0
                );
                setTotalPrice(calculatedTotalPrice);
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        };

        fetchCartData();
    }, [userId]);

    const handleDelivery = () => {
        navigation.navigate('Delivery');
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            {fetchedCart && fetchedCart.items.length > 0 ? (
                <View>
                    <View style={styles.cartHeader}>
                        <Text style={styles.cartHeaderText}>Your Cart</Text>
                    </View>
                    <View style={styles.cartItems}>
                        {/* Render cart items */}
                    </View>
                    <View style={styles.totalContainer}>
                        <Text style={styles.totalLabel}>Total:</Text>
                        <Text style={styles.totalAmount}>${totalPrice.toFixed(2)}</Text>
                    </View>
                    <TouchableOpacity style={styles.payButton} onPress={handleDelivery}>
                        <LinearGradient colors={['#FF6600', '#F7941D']} start={[0, 0.5]} end={[1, 0.5]} style={styles.gradient}>
                            <Text style={styles.payButtonText}>Pay Now</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.emptyCartContainer}>
                    <Text style={styles.emptyCartText}>Your cart is empty</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeColors.bg,
    },
    cartHeader: {
        backgroundColor: themeColors.primary,
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    cartHeaderText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    cartItems: {
        marginVertical: 20,
        paddingHorizontal: 20,
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    totalAmount: {
        fontSize: 18,
        fontWeight: 'bold',
        fontSize: 25,
    },
    payButton: {
        alignSelf: 'center',
        marginVertical: 20,
    },
    gradient: {
        borderRadius: 25,
        width: 140,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },
    payButtonText: {
        fontSize: 17,
        color: 'white',
    },
    emptyCartContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyCartText: {
        fontSize: 18,
        color: themeColors.text,
    },
});
