import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, SIZES } from '../constants';
import { CheckCircleIcon, InformationCircleIcon, ShieldExclamationIcon } from 'react-native-heroicons/solid';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { API_LINK } from '../../default-value';

export default NotificationScreen = () => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();

    const user = useSelector((state) => state.user);
    const [orders, setOrders] = useState([]);
    const [time, setTime] = useState(Date.now());

    const handleOrder = (item) => {
        navigation.navigate('Order', {
            order: item,
        });
    };

    useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), 1000 * 60 * 3);
        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const url = `${API_LINK}/order/${user._id}`;
                const res = await axios.get(url);
                setOrders(res.data.data);
            } catch (error) {
                console.log('Error fetch order', error);
            }
        };
        fetchOrder();
    }, []);

    const renderItem = ({ item }) => {
        let expire = Date.parse(item.createdAt) - Date.now() >= 0;
        return (
            <>
                {expire ? (
                    <TouchableOpacity style={[styles.itemNoti, styles.wait]} onPress={() => handleOrder(item)}>
                        <InformationCircleIcon size={36} color={COLORS.blue} />
                        <View style={styles.contentNoti}>
                            <Text style={styles.textNoti}>Đơn hàng #{item._id.slice(-6)} đã được nhận</Text>
                            <Text style={styles.timeNoti}>02:24 27/07/2023</Text>
                        </View>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={[styles.itemNoti, styles.success]} onPress={() => handleOrder(item)}>
                        <CheckCircleIcon size={36} color={COLORS.green} />
                        <View style={styles.contentNoti}>
                            <Text style={styles.textNoti}>Đơn hàng #{item._id.slice(-6)} đã được giao</Text>
                            <Text style={styles.timeNoti}>02:24 27/07/2023</Text>
                        </View>
                    </TouchableOpacity>
                )}
            </>
        );
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <FlatList
                data={orders}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => `${item._id}`}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingHorizontal: SIZES.padding,
                    paddingBottom: 30,
                }}
            />
            {/* <View style={[styles.itemNoti, styles.success]}>
                <CheckCircleIcon size={36} color={COLORS.green} />
                <View style={styles.contentNoti}>
                    <Text style={styles.textNoti}>Đơn hàng đã được giao</Text>
                    <Text style={styles.timeNoti}>02:24 27/07/2023</Text>
                </View>
            </View>

            <View style={[styles.itemNoti, styles.wait]}>
                <InformationCircleIcon size={36} color={COLORS.blue} />
                <View style={styles.contentNoti}>
                    <Text style={styles.textNoti}>Đơn hàng đã được nhận</Text>
                    <Text style={styles.timeNoti}>02:24 27/07/2023</Text>
                </View>
            </View>

            <View style={[styles.itemNoti, styles.cancel]}>
                <ShieldExclamationIcon size={36} color={COLORS.red} />
                <View style={styles.contentNoti}>
                    <Text style={styles.textNoti}>Đơn hàng đã bị hủy</Text>
                    <Text style={styles.timeNoti}>02:24 27/07/2023</Text>
                </View>
            </View> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray4,
        paddingHorizontal: 16,
    },
    itemNoti: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 12,
        borderWidth: 2,
        marginTop: 16,
    },
    success: {
        borderColor: COLORS.greenGray,
        backgroundColor: COLORS.greenGray2,
    },
    wait: {
        borderColor: COLORS.blueGray,
        backgroundColor: COLORS.blueGray2,
    },
    cancel: {
        borderColor: COLORS.redGray,
        backgroundColor: COLORS.redGray2,
    },
    contentNoti: {
        marginLeft: 16,
    },
    textNoti: {
        fontSize: 22,
    },
    timeNoti: {
        fontStyle: 'italic',
    },
});
