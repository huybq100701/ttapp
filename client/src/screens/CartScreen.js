import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { themeColors } from '../theme';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

export default function CartScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };

    const handleDelivery = () => {
        navigation.navigate('Delivery');
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <StatusBar style={{ backgroundColor: themeColors.bg }} />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ArrowLeftIcon size={20} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Cart</Text>
            </View>

            <View style={styles.foodContainer}>
                <Image source={require('../assets/images/burger-restaurant-2.jpg')} style={styles.foodImage} />
                <View style={styles.foodText}>
                    <Text style={styles.foodName}>Burger</Text>
                    <Text style={styles.foodPrice}>$4</Text>
                </View>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity style={styles.quantityButton} onPress={decreaseQuantity}>
                        <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{quantity}</Text>
                    <TouchableOpacity style={styles.quantityButton} onPress={increaseQuantity}>
                        <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.totalContainer}>
                <Text style={styles.totalLabel}>Total:</Text>
                <Text style={styles.totalAmount}>${4 * quantity}</Text>
            </View>
            <TouchableOpacity style={styles.payButton} onPress={handleDelivery}>
                <LinearGradient colors={['#FF6600', '#F7941D']} start={[0, 0.5]} end={[1, 0.5]} style={styles.gradient}>
                    <Text style={styles.payButtonText}>Pay Now</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeColors.bg,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal: 16,
        paddingTop: 16,
        alignItems: 'center',
    },
    backButton: {
        backgroundColor: '#F59E0B',
        padding: 10,
        borderRadius: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 20,
    },
    foodContainer: {
        marginHorizontal: 20,
        backgroundColor: '#EEEEEE',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
    },
    foodImage: {
        width: 70,
        height: 70,
        borderRadius: 10,
    },
    foodText: {
        flex: 1,
        marginLeft: 10,
    },
    foodName: {
        fontSize: 18,
    },
    foodPrice: {
        fontSize: 16,
        color: '#777',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: 'red',
        marginHorizontal: 5,
    },
    quantityButtonText: {
        fontSize: 18,
        color: 'white',
    },
    quantityText: {
        fontSize: 18,
        marginHorizontal: 8,
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
});
