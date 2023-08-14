import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, CheckBox } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MapView, { Marker, Polyline } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { getDelivery, deleteDelivery } from './../store/slice/deliverySlice'; 
import { currentLocationContext } from '../utils/Context';
import { images, SIZES, COLORS } from '../constants';
import axios from 'axios';
import API_LINK from '../../default-value';

const { width, height } = Dimensions.get('window');

const DeliveryScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const currentLocation = useContext(currentLocationContext);
    const dispatch = useDispatch();

    const [deliveryInfo, setDeliveryInfo] = useState(null);
    const [restaurantLocation, setRestaurantLocation] = useState({
        latitude: 0,
        longitude: 0,
    });
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const cartId = await AsyncStorage.getItem('cartId');
                if (cartId) {
                    axios.get(`${API_LINK}/delivery/${cartId}`)
                        .then(response => {
                            setDeliveryInfo(response.data);

                            if (response.data.restaurant) {
                                axios.get(`${API_LINK}/restaurant/${response.data.restaurant}`)
                                    .then(restaurantResponse => {
                                        const restaurant = restaurantResponse.data;
                                        setRestaurantLocation({
                                            latitude: restaurant.location.latitude,
                                            longitude: restaurant.location.longitude,
                                        });
                                    })
                                    .catch(error => {
                                        console.log('Error fetching restaurant data:', error);
                                    });
                            }
                        })
                        .catch(error => {
                            console.log('Error fetching delivery data:', error);
                        });
                }
            } catch (error) {
                console.log('Error fetching cart data:', error);
            }
        };
        fetchCartData();
    }, []);

    const handleConfirmDelivery = () => {
        if (selectedPaymentMethod === 'COD') {
            dispatch(deleteDelivery());
            navigation.navigate('PaymentComplete');
        } else if (selectedPaymentMethod === 'Other') {
            // Do something for other payment methods
        }
    };
    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            {deliveryInfo && (
                <View>
                    <View style={styles.deliveryInfoContainer}>
                        <View style={styles.deliveryInfo}>
                            <Image source={images.avatar_1} style={styles.courierAvatar} />
                            <View style={styles.deliveryText}>
                                <Text style={styles.courierName}>Amy</Text>
                                <Text style={styles.durationText}>{deliveryInfo.duration}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.restaurantInfoContainer}>
                        <Image source={images.burger_restaurant_1} style={styles.restaurantImage} />
                        <View style={styles.restaurantDetails}>
                            <Text style={styles.restaurantName}>{deliveryInfo.restaurant.name}</Text>
                            <Text style={styles.restaurantAddress}>{deliveryInfo.restaurant.address}</Text>
                        </View>
                    </View>

                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: restaurantLocation.latitude,
                            longitude: restaurantLocation.longitude,
                            latitudeDelta: 0.05,
                            longitudeDelta: 0.05,
                        }}
                    >
                        <Marker coordinate={currentLocation.gps} title="Người giao hàng" description="Amy" />

                        <Polyline
                            coordinates={[
                                {
                                    latitude: restaurantLocation.latitude,
                                    longitude: restaurantLocation.longitude,
                                },
                                currentLocation.gps,
                            ]}
                            strokeWidth={3}
                            strokeColor={COLORS.primary}
                        />
                    </MapView>

                    <View style={styles.paymentContainer}>
                        <Text style={styles.paymentLabel}>Select Payment Method:</Text>
                        <View style={styles.paymentButtons}>
                            <View style={styles.paymentOption}>
                                <CheckBox
                                    value={selectedPaymentMethod === 'COD'}
                                    onValueChange={() => setSelectedPaymentMethod('COD')}
                                />
                                <Text style={styles.paymentOptionText}>Cash on Delivery</Text>
                            </View>
                            <View style={styles.paymentOption}>
                                <CheckBox
                                    value={selectedPaymentMethod === 'Other'}
                                    onValueChange={() => setSelectedPaymentMethod('Other')}
                                />
                                <Text style={styles.paymentOptionText}>Other Payment Method</Text>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmDelivery}>
                        <Text style={styles.confirmButtonText}>Confirm Delivery</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray4,
    },
    map: {
        width: width,
        height: height * 0.7,
    },
    deliveryInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        padding: SIZES.padding,
    },
    deliveryInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    courierAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: SIZES.radius,
    },
    deliveryText: {
        justifyContent: 'center',
    },
    courierName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    durationText: {
        color: COLORS.gray,
    },
    restaurantInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SIZES.padding,
    },
    restaurantImage: {
        width: 80,
        height: 80,
        borderRadius: SIZES.radius,
        marginRight: SIZES.padding,
    },
    restaurantDetails: {
        flex: 1,
    },
    restaurantName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    restaurantAddress: {
        fontSize: 14,
        color: COLORS.gray,
    },
    confirmButton: {
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.radius,
        paddingVertical: 12,
        paddingHorizontal: 24,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 16,
    },
    confirmButtonText: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
    paymentContainer: {
        marginTop: 20,
        paddingHorizontal: SIZES.padding,
    },
    paymentLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    paymentButtons: {
        flexDirection: 'column',
    },
    paymentOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    paymentOptionText: {
        fontSize: 16,
        marginLeft: 10,
    },
});

export default DeliveryScreen;
