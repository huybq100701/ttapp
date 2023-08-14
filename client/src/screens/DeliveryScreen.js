import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCart } from '../store/slice/cartSlice';
import { currentLocationContext } from '../utils/Context';
import { images, SIZES, COLORS } from '../constants';
import axios from 'axios';
import { API_LINK } from '../../default-value';

const { width, height } = Dimensions.get('window');

const DeliveryScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const currentLocation = useContext(currentLocationContext);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const [deliveries, setDeliveries] = useState({
        location: {
            latitude: 0,
            longitude: 0
        }
    });

    useEffect(() => {
        const fetchDelivery = async () => {
            try {
                const url = `${API_LINK}/restaurants/location/${cart.restaurantId}`;
                const res = await axios.get(url);
                setDeliveries(res.data.restaurant);
            } catch (error) {
                console.log('Error o fetch delivery', error);
            }
        };
        fetchDelivery();
    }, []);

    const handlePayment = () => {
        dispatch(deleteCart());
        navigation.navigate('PaymentComplete');
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.deliveryInfoContainer}>
                <View style={styles.deliveryInfo}>
                    <Image source={images.avatar_1} style={styles.courierAvatar} />
                    <View style={styles.deliveryText}>
                        <Text style={styles.courierName}>Amy</Text>
                        <Text style={styles.durationText}>{deliveries?.duration}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.restaurantInfoContainer}>
                <Image source={{uri: deliveries.photo}} style={styles.restaurantImage} />
                <View style={styles.restaurantDetails}>
                    <Text style={styles.restaurantName}>
                        {deliveries?.name}
                    </Text>
                    <Text style={styles.restaurantAddress}>
                        {deliveries?.address}
                    </Text>
                </View>
            </View>

            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: currentLocation.gps.latitude,
                    longitude: currentLocation.gps.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
            >
                <Marker coordinate={currentLocation.gps} title="Người giao hàng" description="Amy" />

                <Polyline
                    coordinates={[
                        {
                            latitude: deliveries?.location?.latitude,
                            longitude: deliveries?.location?.longitude,
                        },
                        currentLocation.gps,
                    ]}
                    strokeWidth={3}
                    strokeColor={COLORS.primary}
                />
            </MapView>

            <TouchableOpacity style={styles.confirmButton} onPress={handlePayment}>
                <Text style={styles.confirmButtonText}>Confirm Delivery</Text>
            </TouchableOpacity>
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
});

export default DeliveryScreen;
