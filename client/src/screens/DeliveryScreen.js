import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MapView, { Marker, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import axios from 'axios';
import API_LINK from '../../default-value';
import * as Location from 'expo-location';

import { icons, images, SIZES, COLORS } from '../constants';
import { GOOGLE_API_KEY } from '../constants';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCart } from '../store/slice/cartSlice';
import { currentLocationContext } from '../utils/Context';
import { user } from '../constants/icons';

const { width, height } = Dimensions.get('window');

const DeliveryScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const currentLocation = useContext(currentLocationContext);
    const dispatch = useDispatch();

    const restaurants = useSelector((state) => state.restaurant);
    const cart = useSelector((state) => state.cart);

    const [deliveries, setDeliveries] = useState([]);
    const [restaurantLocation, setRestaurantLocation] = useState({ latitude: 0, longitude: 0 });
    const [restaurantId, setRestaurantId] = useState(cart.restaurantId);
    const [restaurant, setRestaurant] = useState(restaurants);

    useEffect(() => {
        const res = restaurants.filter((item) => {
            return item._id === restaurantId;
        });
        setRestaurant(res);
        setRestaurantLocation({
            latitude: parseFloat(res[0].location.latitude),
            longitude: parseFloat(res[0].location.longitude),
        });
    }, [restaurants]);

    const [userLocation, setUserLocation] = useState({ latitude: 21.027763, longitude: 105.83416 });
    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            setUserLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
        })();
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
                        <Text style={styles.durationText}>{deliveries.length > 0 ? deliveries[0].duration : ''}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.restaurantInfoContainer}>
                <Image source={images.burger_restaurant_1} style={styles.restaurantImage} />
                <View style={styles.restaurantDetails}>
                    <Text style={styles.restaurantName}>{restaurant[0].name}</Text>
                    <Text style={styles.restaurantDuration}>{restaurant[0].duration}</Text>
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
                <MapViewDirections
                    origin={restaurantLocation}
                    destination={userLocation}
                    apikey={GOOGLE_API_KEY}
                    optimizeWaypoints={true}
                    strokeWidth={3}
                    strokeColor={COLORS.primary}
                />
                <Marker coordinate={currentLocation.gps} />
                <Marker coordinate={restaurantLocation} anchor={{ x: 0.5, y: 0.5 }} flat={true}>
                    <Image
                        source={icons.motor}
                        style={{
                            width: 40,
                            height: 40,
                        }}
                    />
                </Marker>
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
    restaurantDuration: {
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
