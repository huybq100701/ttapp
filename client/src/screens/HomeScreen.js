import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { icons, images, SIZES, COLORS } from '../constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { currentLocationContext, categoryContext } from '../utils/Context';
import { fetchCart, fetchRestaurantList, fetchUser } from '../store/apiCall';
import { getItem } from '../utils/asyncStorage.js';

const HomeScreen = ({ navigation }) => {
    const initialCurrentLocation = useContext(currentLocationContext);
    const categoryData = useContext(categoryContext);

    const [categories, setCategories] = React.useState(categoryData);
    const [selectedCategory, setSelectedCategory] = React.useState(null);
    const [currentLocation, setCurrentLocation] = React.useState(initialCurrentLocation);
    const [hasNotification, setHasNotification] = useState(false);
    const [filteredRestaurant, setFilteredRestaurant] = useState([]);
    const restaurants = useSelector((state) => state.restaurant);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            try {
                let userId = await getItem('userId');
                if (userId) {
                    await fetchRestaurantList(dispatch);
                    await fetchCart(dispatch, userId);
                }
            } catch (error) {
                console.log('Error o HomeScreen', error);
            }
        })();
    }, []);

    useEffect(() => {
        setFilteredRestaurant(restaurants);
    }, [restaurants]);

    const insets = useSafeAreaInsets();
    function onSelectCategory(category) {
        let restaurantList = restaurants;
        if (category) {
            restaurantList = restaurants.filter((a) => a.categories.includes(category.id));
        }
        //filter restaurant
        setFilteredRestaurant(restaurantList);
        setSelectedCategory(category);
    }

    function getCategoryNameById(id) {
        let category = categories.filter((a) => a.id == id);

        if (category.length > 0) return category[0].name;

        return '';
    }

    const handleCart = async () => {
        navigation.navigate('Cart');
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
                        navigation.navigate('Restaurant', { restaurantId: item._id });
                    }}
                >
                    {/* Image */}
                    <View
                        style={{
                            marginBottom: SIZES.padding,
                        }}
                    >
                        <Image
                            source={{ uri: item.photo }}
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
                data={filteredRestaurant}
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
