import React, { useContext, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TextInput, View, TouchableOpacity, Image, FlatList, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, SIZES, images, icons } from '../constants';
import { MagnifyingGlassIcon } from 'react-native-heroicons/solid';

import { restaurantsContext, categoryContext } from '../utils/Context';

export default SearchScreen = () => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();

    const categoryData = useContext(categoryContext);

    const popularRestaurantData = [
        {
            _id: '64ca050ea1c71c7b4e9e7e57',
            name: 'Burger',
            rating: 4.8,
            categories: [5, 7],
            photo: images.burger_restaurant_1,
        },
        {
            _id: '64ca055ba1c71c7b4e9e7e59',
            name: 'Pizza',
            rating: 4.8,
            categories: [2, 4, 6],
            photo: images.pizza_restaurant,
        },
    ];

    const restaurantData = [
        {
            _id: '64ca050ea1c71c7b4e9e7e57',
            name: 'Burger',
            rating: 4.8,
            categories: [5, 7],
            photo: images.burger_restaurant_1,
        },
        {
            _id: '64ca055ba1c71c7b4e9e7e59',
            name: 'Pizza',
            rating: 4.8,
            categories: [2, 4, 6],
            photo: images.pizza_restaurant,
        },
    ];

    const [restaurants, setRestaurants] = React.useState(restaurantData);
    const [popularRestaurants, setPopularRestaurants] = React.useState(popularRestaurantData);
    const [idRestaurantSearch, setIdRestaurantSearch] = useState(null);
    const [input, setInput] = React.useState('');

    function getCategoryNameById(id) {
        let category = categoryData.filter((a) => a.id == id);

        if (category.length > 0) return category[0].name;

        return '';
    }

    const setIdRestaurant = useContext(restaurantsContext).setIdRestaurant;
    useEffect(() => {
        setIdRestaurant(idRestaurantSearch);
    }, [idRestaurantSearch]);

    function handleFilter(searchTerm) {
        if (searchTerm === null || searchTerm === '') {
            setPopularRestaurants(popularRestaurantData);
        } else {
            setPopularRestaurants(null);
        }
        setRestaurants(
            restaurantData.filter((restaurant) => {
                return restaurant.name.toLowerCase().includes(searchTerm.toLowerCase());
            }),
        );
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => {
                    navigation.navigate('Restaurant');
                    setIdRestaurantSearch(item._id);
                }}
            >
                <Image source={item.photo} style={styles.image} />
                <View style={styles.infoItem}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <View
                        style={{
                            flexDirection: 'row',
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
                    <View style={{ flexDirection: 'row', marginTop: 16 }}>
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
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.topContainer}>
                <MagnifyingGlassIcon style={styles.searchIcon} size={20} color="black" />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search"
                    value={input}
                    onChangeText={(e) => {
                        handleFilter(e);
                        setInput(e);
                    }}
                    // onBlur={() => }
                />
            </View>
            {popularRestaurants !== null ? (
                <View style={styles.popular}>
                    <Text style={styles.popularText}>Popular Restaurant</Text>
                </View>
            ) : undefined}
            <FlatList
                style={styles.contentSearch}
                data={popularRestaurants !== null ? popularRestaurants : restaurants}
                renderItem={renderItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray4,
    },
    topContainer: {
        marginTop: 16,
        marginHorizontal: 16,
        backgroundColor: '#efeff1',
        borderRadius: 32,
    },
    searchIcon: {
        position: 'absolute',
        left: 18,
        top: 16,
    },
    searchInput: {
        padding: 12,
        fontSize: 18,
        paddingLeft: 48,
    },
    contentSearch: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
        marginBottom: 60,
    },
    popular: {
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    popularText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    itemContainer: {
        flexDirection: 'row',
        backgroundColor: '#efeff1',
        padding: 16,
        borderRadius: 10,
        marginBottom: 16,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 5,
    },
    infoItem: {
        marginLeft: 16,
    },
    itemName: {
        fontSize: 20,
        fontWeight: 600,
    },
});
