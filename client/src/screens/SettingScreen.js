import React from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeftIcon, ArrowRightOnRectangleIcon, UserIcon } from 'react-native-heroicons/solid';
import { removeItem } from '../utils/asyncStorage.js';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../store/slice/userSlice';

export default function SettingScreen() {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const dispatch = useDispatch();

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleLogout = () => {
        removeItem('userId');
        dispatch(deleteUser());
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <StatusBar style={{ backgroundColor: themeColors.bg }} />
            <View style={styles.goBacks}>
                <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
                    <ArrowLeftIcon size={28} color="black" />
                </TouchableOpacity>
                <View style={styles.topTextContainter}>
                    <Text style={styles.topText}>Settings</Text>
                </View>
            </View>
            <View>
                <TouchableOpacity style={styles.itemSetting} onPress={() => navigation.navigate('ChangeInfo')}>
                    <UserIcon size={20} color="black" />
                    <Text style={styles.itemText}>Change Infomation</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemSetting} onPress={handleLogout}>
                    <ArrowRightOnRectangleIcon size={20} color="black" />
                    <Text style={styles.itemText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeColors.bg,
    },
    goBacks: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 16,
        marginBottom: 12,
    },
    goBackButton: {
        backgroundColor: '#F59E0B',
        padding: 10,
        borderRadius: 20,
    },
    topTextContainter: {
        marginLeft: 80,
    },
    topText: {
        fontSize: 36,
        fontWeight: 700,
    },
    itemSetting: {
        marginHorizontal: 20,
        marginTop: 20,
        padding: 24,
        backgroundColor: '#c4dfff',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemText: {
        fontSize: 20,
        paddingLeft: 16,
    },
});
