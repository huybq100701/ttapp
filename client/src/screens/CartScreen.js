import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { themeColors } from '../theme';
import { useSelector } from 'react-redux';

export default function CartScreen({ navigation }) {
    const insets = useSafeAreaInsets();

    const cart = useSelector((state) => state.cart);
    const menus = useSelector((state) => state.menu);
    const menu = menus.menu;
    
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const calculateCart = () => {
            let total = 0;
            for (let i = 0; i < cart.items.length; i++) {
                total += cart.items[i].total;
            }
            setTotalPrice(total);
        };
        calculateCart();
    }, [cart])


    const handleDelivery = () => {
        navigation.navigate('Delivery');
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            {cart && cart.items.length > 0 ? (
                <View>
                    <View style={styles.cartHeader}>
                        <Text style={styles.cartHeaderText}>Your Cart</Text>
                    </View>
                    <View style={styles.cartItems}>
                        {cart.items.map((item, index) => {
                            console.log("Item Name:", item.menu.name);
                            console.log("Item Photo:", item.menu.photo);

                            return (
                                <View key={index} style={styles.cartItem}>
                                    <Image
                                        source={{ uri: item.menu.photo }} 
                                        style={styles.itemImage}
                                    />
                                    <View style={styles.itemDetails}>
                                        <Text style={styles.itemName}>{item.menu.name}</Text>
                                        <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
                                    </View>
                                </View>
                            );
                        })}
                    </View>

                    <View style={styles.totalContainer}>
                        <Text style={styles.totalLabel}>Total:</Text>
                        <Text style={styles.totalAmount}>${totalPrice.toFixed(2)}</Text>
                    </View>
                    <TouchableOpacity style={styles.payButton} onPress={handleDelivery}>
                        <LinearGradient
                            colors={['#FF6600', '#F7941D']}
                            start={[0, 0.5]}
                            end={[1, 0.5]}
                            style={styles.gradient}
                        >
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
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        paddingHorizontal: 20,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    itemDetails: {
        marginLeft: 10,
        flex: 1,
        justifyContent: 'center',
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemQuantity: {
        fontSize: 14,
        color: themeColors.text,
    },
});
