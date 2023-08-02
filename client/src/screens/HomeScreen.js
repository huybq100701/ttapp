import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { icons, images, SIZES, COLORS } from '../constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import axios from 'axios';
import { API_LINK } from '../../default-value';

import { currentLocationContext, restaurantsContext } from '../utils/Context';

const HomeScreen = ({ navigation }) => {
    // Use useContext instead of params
    const initialCurrentLocation = useContext(currentLocationContext);
    const restaurantData = useContext(restaurantsContext).restaurants;

    const categoryData = [
        {
            id: 1,
            name: 'Rice',
            icon: icons.rice_bowl,
        },
        {
            id: 2,
            name: 'Noodles',
            icon: icons.noodle,
        },
        {
            id: 3,
            name: 'Hot Dogs',
            icon: icons.hotdog,
        },
        {
            id: 4,
            name: 'Salads',
            icon: icons.salad,
        },
        {
            id: 5,
            name: 'Burgers',
            icon: icons.hamburger,
        },
        {
            id: 6,
            name: 'Pizza',
            icon: icons.pizza,
        },
        {
            id: 7,
            name: 'Snacks',
            icon: icons.fries,
        },
        {
            id: 8,
            name: 'Sushi',
            icon: icons.sushi,
        },
        {
            id: 9,
            name: 'Desserts',
            icon: icons.donut,
        },
        {
            id: 10,
            name: 'Drinks',
            icon: icons.drink,
        },
    ];

    const [categories, setCategories] = React.useState(categoryData);
    const [selectedCategory, setSelectedCategory] = React.useState(null);
    const [restaurants, setRestaurants] = React.useState(restaurantData);
    const [idRestaurant, setIdRestaurant] = useState(null);
    const [currentLocation, setCurrentLocation] = React.useState(initialCurrentLocation);
    const [hasNotification, setHasNotification] = useState(false);

    useContext(restaurantsContext).setIdRestaurant(idRestaurant);

    useEffect(() => {
        const fetchRestaurants = async () => {
            const res = await axios.get(`${API_LINK}/restaurants`);
            setRestaurants(res.data.restaurants);
        }
        fetchRestaurants();
    }, [])

    const insets = useSafeAreaInsets();

    function onSelectCategory(category) {
        //filter restaurant
        let restaurantList = restaurantData.filter((a) => a.categories.includes(category.id));

        setRestaurants(restaurantList);

        setSelectedCategory(category);
    }

    function getCategoryNameById(id) {
        let category = categories.filter((a) => a.id == id);

        if (category.length > 0) return category[0].name;

        return '';
    }

    const handleCart = () => {
        navigation.navigate('Cart', {
            restaurants,
            currentLocation,
        });
    };

    const handleNotification = () => {
        setHasNotification(false);
        navigation.navigate('Notification');
    };

    const renderHeader = () => {
        return (
            <View style={{ flexDirection: 'row', height: 50 }}>
                <TouchableOpacity
                    onPress={handleNotification}
                    style={{
                        width: 50,
                        paddingLeft: 16,
                        justifyContent: 'center',
                    }}
                >
                    <Image
                        source={hasNotification ? icons.notification_with_ping : icons.notification}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30,
                        }}
                    />
                </TouchableOpacity>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View
                        style={{
                            width: '70%',
                            height: '100%',
                            backgroundColor: COLORS.lightGray3,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 20,
                        }}
                    >
                        <Text>{currentLocation.streetName}</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingRight: 16,
                        justifyContent: 'center',
                    }}
                    onPress={handleCart}
                >
                    <Image
                        source={icons.basket}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30,
                        }}
                    />
                </TouchableOpacity>
            </View>
        );
    };

    function renderMainCategories() {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{
                        padding: SIZES.padding,
                        paddingBottom: SIZES.padding,
                        backgroundColor: selectedCategory?.id === item.id ? COLORS.primary : COLORS.white,
                        borderRadius: SIZES.radius,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: SIZES.padding,
                        ...styles.shadow,
                    }}
                    onPress={() => onSelectCategory(item)}
                >
                    <View
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: selectedCategory?.id === item.id ? COLORS.white : COLORS.lightGray,
                        }}
                    >
                        <Image
                            source={item.icon}
                            resizeMode="contain"
                            style={{
                                width: 30,
                                height: 30,
                            }}
                        />
                    </View>

                    <Text
                        style={{
                            color: selectedCategory?.id === item.id ? COLORS.white : COLORS.black,
                        }}
                    >
                        {item.name}
                    </Text>
                </TouchableOpacity>
            );
        };

        return (
            <View style={{ padding: SIZES.padding }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Categories</Text>

                <FlatList
                    data={categories}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingVertical: SIZES.padding }}
                />
            </View>
        );
    }

    function renderRestaurantList() {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{ marginBottom: SIZES.padding * 2 }}
                    onPress={() => {
                        navigation.navigate('Restaurant');
                        setIdRestaurant(item.id);
                    }}
                >
                    {/* Image */}
                    <View
                        style={{
                            marginBottom: SIZES.padding,
                        }}
                    >
                        <Image
                            source={{uri: item.photo}}
                            resizeMode="cover"
                            style={{
                                width: '100%',
                                height: 200,
                                borderRadius: SIZES.radius,
                            }}
                        />

                        <View
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                height: 50,
                                width: SIZES.width * 0.3,
                                backgroundColor: COLORS.white,
                                borderTopRightRadius: SIZES.radius,
                                borderBottomLeftRadius: SIZES.radius,
                                alignItems: 'center',
                                justifyContent: 'center',
                                ...styles.shadow,
                            }}
                        >
                            <Text>{item.duration}</Text>
                        </View>
                    </View>

                    {/* Restaurant Info */}
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text>

                    <View
                        style={{
                            marginTop: SIZES.padding,
                            flexDirection: 'row',
                        }}
                    >
                        {/* Rating */}
                        <Image
                            source={icons.star}
                            style={{
                                height: 20,
                                width: 20,
                                tintColor: COLORS.primary,
                                marginRight: 10,
                            }}
                        />
                        <Text>{item.rating}</Text>

                        {/* Categories */}
                        <View
                            style={{
                                flexDirection: 'row',
                                marginLeft: 10,
                            }}
                        >
                            {item.categories.map((categoryId) => {
                                return (
                                    <View style={{ flexDirection: 'row' }} key={categoryId}>
                                        <Text>{getCategoryNameById(categoryId)}</Text>
                                        <Text style={{ fontSize: 18, color: COLORS.darkgray }}> . </Text>
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                </TouchableOpacity>
            );
        };

        return (
            <FlatList
                data={restaurants}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => `${item._id}`}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingHorizontal: SIZES.padding * 2,
                    paddingBottom: 30,
                }}
            />
        );
    }

    return (
        <SafeAreaView style={[styles.container, { paddingTop: insets.top, paddingBottom: 50 }]}>
            {renderHeader()}
            {renderMainCategories()}
            {renderRestaurantList()}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray4,
        marginTop: 10,
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
    },
    swiperContainer: {
        height: 240,
    },
    swiperSlide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeScreen;
