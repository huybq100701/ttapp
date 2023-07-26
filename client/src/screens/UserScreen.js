import React from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Cog6ToothIcon } from 'react-native-heroicons/solid';

export default function UserScreen() {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const handleSetting = () => {
        navigation.navigate('Setting');
    }

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <StatusBar style={{ backgroundColor: themeColors.bg }} />
            <View style={styles.settings}>
                <TouchableOpacity style={styles.settingButton} onPress={handleSetting}>
                    <Cog6ToothIcon size={28} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
                <Image source={require('../../assets/images/bglogin.jpg')} style={styles.image} />
            </View>
            <View style={styles.usernameContainer}>
                <Text style={styles.username}>Username</Text>
            </View>
            <View style={styles.formContainer}>
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Infomation</Text>
                </View>
                <View style={styles.divider}></View>
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.content}>user@user.com</Text>
                </View>
                <View style={styles.divider}></View>
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Fullname:</Text>
                    <Text style={styles.content}>Nguyễn Văn A</Text>
                </View>
                <View style={styles.divider}></View>
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Birthday:</Text>
                    <Text style={styles.content}>dd/mm/yyyy</Text>
                </View>
                <View style={styles.divider}></View>
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Address:</Text>
                    <Text style={styles.content}>Hai Phong, Vietnam</Text>
                </View>
                <View style={styles.divider}></View>
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Phone:</Text>
                    <Text style={styles.content}>0795256013</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeColors.bg,
    },
    settings: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    settingButton: {
        backgroundColor: '#F59E0B',
        padding: 10,
        borderRadius: 20,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
    },
    image: {
        borderRadius: 100,
        width: 200,
        height: 200,
    },
    usernameContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        fontSize: 20,
        color: '#4B5563',
        fontWeight: 'bold',
    },
    username: {
        fontSize: 28,
        color: '#4B5563',
        fontWeight: 'bold',
    },
    formContainer: {
        backgroundColor: 'white',
        borderRadius: 32,
        minHeight: 500,
        marginTop: 12,
        padding: 8,
        paddingTop: 20,
    },
    infoContainer: {
        flexDirection: 'row',
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    label: {
        flex: 2,
        fontSize: 20,
        color: '#4B5563',
        fontWeight: 'bold',
    },
    content: {
        flex: 5,
        fontSize: 20,
        color: '#4B5563',
    },
    divider: {
        backgroundColor: '#ccc',
        height: 1,
        marginHorizontal: 12,
    },
});
