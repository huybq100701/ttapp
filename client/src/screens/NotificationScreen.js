import React from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Image, FlatList, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../constants';
import { CheckCircleIcon, InformationCircleIcon, ShieldExclamationIcon } from 'react-native-heroicons/solid';

export default NotificationScreen = () => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={[styles.itemNoti, styles.success]}>
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
            </View>
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
