import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { icons, images, SIZES, COLORS } from '../constants';
import MapView, { Marker, Polyline } from 'react-native-maps';

import { currentLocationContext, restaurantsContext } from '../utils/Context';

const DeliveryScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    // use useContext
    const currentLocation = useContext(currentLocationContext);
    const { restaurant } = useContext(restaurantsContext);

    const deliveryData = [
        {
            id: 1,
            courier: 'Amy',
            avatar: images.avatar_1,
            duration: '15 min',
            distance: '3.5 km',
            restaurant: 'Burger',
            address: '1234, Street Name, City Name',
        },
    ];

    const handlePayment = () => {
        navigation.navigate('PaymentComplete');
    };
  
    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.deliveryList}>
                <FlatList
                    data={deliveryData}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.deliveryItemContainer}>
                            {/* Delivery Info */}
                            <View style={styles.deliveryItem}>
                                <View style={styles.deliveryInfo}>
                                    <Image source={item.avatar} style={styles.courierAvatar} />
                                    <View style={styles.deliveryText}>
                                        <Text style={styles.courierName}>{item.courier}</Text>
                                        <Text style={styles.durationText}>{item.duration}</Text>
                                    </View>
                                </View>
                                <View style={styles.distanceContainer}>
                                    <Image source={icons.pin} style={styles.pinIcon} />
                                    <Text style={styles.distanceText}>{item.distance}</Text>
                                </View>
                            </View>
                            <View style={styles.restaurantInfo}>
                                <Image source={images.burger_restaurant_1} style={styles.restaurantImage} />
                                <View style={styles.restaurantDetails}>
                                    <Text style={styles.restaurantName}>{item.restaurant}</Text>
                                    <Text style={styles.restaurantAddress}>{item.address}</Text>
                                </View>
                            </View>
                        </View>
                    )}
                />
            </View>

            {/* Map */}
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: restaurant.location.latitude,
                    longitude: restaurant.location.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
            >
                {/* Markers and Polyline */}
                <Marker coordinate={currentLocation.gps} title="Người giao hàng" description="Amy" />

                <Polyline
                    coordinates={[
                        {
                            latitude: restaurant.location.latitude,
                            longitude: restaurant.location.longitude,
                        },
                        currentLocation.gps,
                    ]}
                    strokeWidth={3}
                    strokeColor={COLORS.primary}
                />
            </MapView>

            {/* Confirm Delivery Button */}
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
        flex: 1,
    },
    deliveryList: {
        padding: SIZES.padding,
    },
    deliveryItemContainer: {
        backgroundColor: COLORS.white,
        marginBottom: SIZES.padding,
        borderRadius: SIZES.radius,
        padding: SIZES.padding,
    },
    deliveryItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SIZES.padding,
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
    distanceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pinIcon: {
        width: 20,
        height: 20,
        tintColor: COLORS.primary,
        marginRight: 5,
    },
    distanceText: {
        fontSize: 16,
        color: COLORS.gray,
    },
    restaurantInfo: {
        flexDirection: 'row',
        alignItems: 'center',
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
    },
    restaurantAddress: {
        fontSize: 16,
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