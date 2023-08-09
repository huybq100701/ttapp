import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Image, Animated, ScrollView } from 'react-native';
import { icons, COLORS, SIZES } from '../constants';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenuOfRestaurant, saveCart } from '../store/apiCall';

const RestaurantScreen = ({ route, navigation }) => {
    const scrollX = new Animated.Value(0);
    const [orderItems, setOrderItems] = useState([]);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [restaurant, setRestaurant] = useState(null);
    const [menu, setMenu] = useState([{ price: 0, calories: 0 }]);
    const menus = useSelector((state) => state.menu);
    const cart = useSelector((state) => state.cart);
    const restaurantId = route.params?.restaurantId;
    const dispatch = useDispatch();

    const handleAddToCart = async () => {
        try {
            await saveCart(dispatch, cart._id, restaurantId, orderItems);
            navigation.navigate('Cart');
        } catch (error) {
            console.log('Error o handle Add to Cart');
        }
    };
    useEffect(() => {
        if (restaurantId) {
            fetchMenuOfRestaurant(dispatch, restaurantId);
        }
    }, []);

    useEffect(() => {
        setRestaurant(menus.restaurant);
        setMenu(menus.menu);
    }, [menus]);
    const handleNavigateToFoodScreen = (menuId) => {
        navigation.navigate('Food', { menuId });
    };

    function editOrder(action, menuId, price) {
        let orderList = orderItems.slice();
        let item = orderList.find((a) => a.menu === menuId);
        if (action === '+') {
            if (item) {
                item.quantity += 1;
                item.total = item.quantity * price;
            } else {
                const newItem = {
                    menu: menuId,
                    quantity: 1,
                    total: price,
                };
                orderList.push(newItem);
            }
        } else {
            if (item && item.quantity > 0) {
                item.quantity -= 1;
                item.total = item.quantity * price;
            }
        }
        setOrderItems(orderList.filter((item) => item.quantity > 0));
    }

    function getOrderQty(menuId) {
        let orderItem = orderItems.find((a) => a.menu === menuId);

        return orderItem ? orderItem.quantity : 0;
    }

    function getBasketItemCount() {
        let itemCount = orderItems.reduce((a, b) => a + (b.quantity || 0), 0);
        return itemCount;
    }

    function sumOrder() {
        let total = orderItems.reduce((a, b) => a + (b.total || 0), 0);
        return total.toFixed(2);
    }

    const dotPosition = Animated.divide(scrollX, SIZES.width);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const renderSidebar = () => {
        if (!isSidebarVisible) return null;

        return (
            <ScrollView style={styles.sidebarContainer}>
                {menu?.map((item) => (
                    <TouchableOpacity
                        key={item._id}
                        style={styles.sidebarItem}
                        onPress={() => handleNavigateToFoodScreen(item._id)}
                    >
                        <Image
                            source={{ uri: item.photo }}
                            style={{ width: 80, height: 80, borderRadius: 10 }}
                            resizeMode="cover"
                        />
                        <Text style={styles.sidebarText}>{item.name}</Text>
                        <Text style={styles.sidebarPrice}>${item?.price.toFixed(2)}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        );
    };

    const renderHeader = () => {
        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
                    <ArrowLeftIcon size={28} color="black" />
                </TouchableOpacity>

                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <View
                        style={{
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingHorizontal: SIZES.padding * 3,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.lightGray3,
                        }}
                    >
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{restaurant?.name}</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingRight: SIZES.padding * 2,
                        justifyContent: 'center',
                    }}
                    onPress={toggleSidebar}
                >
                    <Image
                        source={icons.list}
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

    const renderFoodInfo = () => {
        return (
            <Animated.ScrollView
                horizontal
                pagingEnabled
                scrollEventThrottle={16}
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                    useNativeDriver: false,
                })}
            >
                {menu?.map((item, index) => (
                    <View key={`menu-${index}`} style={{ alignItems: 'center' }}>
                        <View style={{ height: SIZES.height * 0.35 }}>
                            <Image
                                source={{ uri: item.photo }}
                                resizeMode="cover"
                                style={{
                                    width: SIZES.width,
                                    height: '100%',
                                }}
                            />

                            <View
                                style={{
                                    position: 'absolute',
                                    bottom: -20,
                                    width: SIZES.width,
                                    height: 50,
                                    justifyContent: 'center',
                                    flexDirection: 'row',
                                }}
                            >
                                <TouchableOpacity
                                    style={{
                                        width: 50,
                                        backgroundColor: COLORS.white,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderTopLeftRadius: 25,
                                        borderBottomLeftRadius: 25,
                                    }}
                                    onPress={() => editOrder('-', item._id, item.price)}
                                >
                                    <Text style={{ fontSize: 16 }}>-</Text>
                                </TouchableOpacity>

                                <View
                                    style={{
                                        width: 50,
                                        backgroundColor: COLORS.white,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Text style={{ fontSize: 20 }}>{getOrderQty(item._id)}</Text>
                                </View>

                                <TouchableOpacity
                                    style={{
                                        width: 50,
                                        backgroundColor: COLORS.white,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderTopRightRadius: 25,
                                        borderBottomRightRadius: 25,
                                    }}
                                    onPress={() => editOrder('+', item._id, item.price)}
                                >
                                    <Text style={{ fontSize: 16 }}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View
                            style={{
                                width: SIZES.width,
                                alignItems: 'center',
                                marginTop: 15,
                                paddingHorizontal: SIZES.padding * 2,
                            }}
                        >
                            <Text style={{ marginVertical: 10, textAlign: 'center', fontSize: 18 }}>
                                {item.name} - ${item?.price.toFixed(2)}
                            </Text>
                            <Text style={{ fontSize: 14 }}>{item.description}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Image
                                source={icons.fire}
                                style={{
                                    width: 20,
                                    height: 20,
                                    marginRight: 10,
                                }}
                            />
                            <Text style={{ fontSize: 14, color: COLORS.darkgray }}>
                                {item?.calories.toFixed(2)} cal
                            </Text>
                        </View>
                    </View>
                ))}
            </Animated.ScrollView>
        );
    };

    const renderDots = () => {
        return (
            <View style={{ height: 30 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: SIZES.padding,
                    }}
                >
                    {menu?.map((item, index) => {
                        const opacity = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [0.3, 1, 0.3],
                            extrapolate: 'clamp',
                        });

                        const dotSize = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
                            extrapolate: 'clamp',
                        });

                        const dotColor = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
                            extrapolate: 'clamp',
                        });

                        return (
                            <Animated.View
                                key={`dot-${index}`}
                                opacity={opacity}
                                style={{
                                    borderRadius: SIZES.radius,
                                    marginHorizontal: 6,
                                    width: dotSize,
                                    height: dotSize,
                                    backgroundColor: dotColor,
                                }}
                            />
                        );
                    })}
                </View>
            </View>
        );
    };

    const renderOrder = () => {
        const basketItemCount = getBasketItemCount();
        const totalSum = sumOrder();

        return (
            <View>
                <View>
                    <View style={{ height: 30 }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: SIZES.padding,
                            }}
                        >
                            {menu?.map((item, index) => {
                                const opacity = dotPosition.interpolate({
                                    inputRange: [index - 1, index, index + 1],
                                    outputRange: [0.3, 1, 0.3],
                                    extrapolate: 'clamp',
                                });

                                const dotSize = dotPosition.interpolate({
                                    inputRange: [index - 1, index, index + 1],
                                    outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
                                    extrapolate: 'clamp',
                                });

                                const dotColor = dotPosition.interpolate({
                                    inputRange: [index - 1, index, index + 1],
                                    outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
                                    extrapolate: 'clamp',
                                });

                                return (
                                    <Animated.View
                                        key={`dot-${index}`}
                                        opacity={opacity}
                                        style={{
                                            borderRadius: SIZES.radius,
                                            marginHorizontal: 6,
                                            width: dotSize,
                                            height: dotSize,
                                            backgroundColor: dotColor,
                                        }}
                                    />
                                );
                            })}
                        </View>
                    </View>

                    <View
                        style={{
                            backgroundColor: COLORS.white,
                            borderTopLeftRadius: 40,
                            borderTopRightRadius: 40,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingVertical: SIZES.padding * 2,
                                paddingHorizontal: SIZES.padding * 3,
                                borderBottomColor: COLORS.lightGray2,
                                borderBottomWidth: 1,
                            }}
                        >
                            <Text style={{ fontSize: 18 }}>{getBasketItemCount()} items in Cart</Text>
                            <Text style={{ fontSize: 18 }}>${sumOrder()}</Text>
                        </View>

                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingVertical: SIZES.padding * 2,
                                paddingHorizontal: SIZES.padding * 3,
                            }}
                        >
                            <View style={{ flexDirection: 'row' }}>
                                <Image
                                    source={icons.pin}
                                    resizeMode="contain"
                                    style={{
                                        width: 20,
                                        height: 20,
                                        tintColor: COLORS.darkgray,
                                    }}
                                />
                                <Text style={{ marginLeft: SIZES.padding, fontSize: 16 }}>Location</Text>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <Image
                                    source={icons.master_card}
                                    resizeMode="contain"
                                    style={{
                                        width: 20,
                                        height: 20,
                                        tintColor: COLORS.darkgray,
                                    }}
                                />
                                <Text style={{ marginLeft: SIZES.padding, fontSize: 16 }}>8888</Text>
                            </View>
                        </View>

                        <View
                            style={{
                                padding: SIZES.padding * 2,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            {basketItemCount > 0 ? (
                                <TouchableOpacity
                                    style={{
                                        width: SIZES.width * 0.9,
                                        padding: SIZES.padding,
                                        backgroundColor: COLORS.primary,
                                        alignItems: 'center',
                                        borderRadius: SIZES.radius,
                                    }}
                                    onPress={() => handleAddToCart()}
                                >
                                    <Text style={{ color: COLORS.white, fontSize: 20 }}>Order</Text>
                                </TouchableOpacity>
                            ) : (
                                <Text style={{ fontSize: 20 }}>Add items to your cart</Text>
                            )}
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    const insets = useSafeAreaInsets();

    return (
        <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
            <View style={{ flex: 1 }}>
                {renderHeader()}
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    {renderFoodInfo()}
                    {renderSidebar()}
                </View>
                {renderOrder()}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray2,
    },
    goBackButton: {
        backgroundColor: '#F59E0B',
        padding: 10,
        borderRadius: 20,
    },

    sidebarContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: '100%',
        width: SIZES.width * 0.6,
        backgroundColor: COLORS.white,
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    sidebarItem: {
        marginBottom: 15,
        padding: 10,
        borderRadius: 8,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
    },
    sidebarText: {
        color: COLORS.white,
        fontSize: 16,
    },
});

export default RestaurantScreen;