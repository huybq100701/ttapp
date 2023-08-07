import React from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Cog6ToothIcon } from 'react-native-heroicons/solid';
import { useSelector } from 'react-redux';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function UserScreen() {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();

    const user = useSelector((state) => state.user);

    const handleSetting = () => {
        navigation.navigate('Setting');
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <StatusBar style={{ backgroundColor: themeColors.bg }} />
            <View style={styles.settings}>
                <TouchableOpacity style={styles.settingButton} onPress={handleSetting}>
                    <Cog6ToothIcon size={windowWidth * 0.07} color="black" />
                </TouchableOpacity>
            </View>
            <View style={[styles.imageContainer, { height: windowHeight * 0.2 }]}>
                <Image source={user.image ? { uri: user.image } : require('../../assets/images/bglogin.jpg')} style={styles.image} />
            </View>
            <View style={styles.usernameContainer}>
                <Text style={[styles.username, { fontSize: windowWidth * 0.06 }]}>{user.username}</Text>
            </View>
            <View style={[styles.formContainer, { minHeight: windowHeight * 0.5 }]}>
                <View style={styles.infoContainer}>
                    <Text style={[styles.label, { fontSize: windowWidth * 0.05 }]}>Information</Text>
                </View>
                <View style={styles.divider}></View>
                <View style={styles.infoContainer}>
                    <Text style={[styles.label, { fontSize: windowWidth * 0.04 }]}>Email:</Text>
                    <Text style={[styles.content, { fontSize: windowWidth * 0.04 }]}>{user.mail}</Text>
                </View>
                <View style={styles.divider}></View>
                <View style={styles.infoContainer}>
                    <Text style={[styles.label, { fontSize: windowWidth * 0.04 }]}>Fullname:</Text>
                    <Text style={[styles.content, { fontSize: windowWidth * 0.04 }]}>{user.fullname}</Text>
                </View>
                <View style={styles.divider}></View>
                <View style={styles.infoContainer}>
                    <Text style={[styles.label, { fontSize: windowWidth * 0.04 }]}>Birthday:</Text>
                    <Text style={[styles.content, { fontSize: windowWidth * 0.04 }]}>{user.birthday}</Text>
                </View>
                <View style={styles.divider}></View>
                <View style={styles.infoContainer}>
                    <Text style={[styles.label, { fontSize: windowWidth * 0.04 }]}>Address:</Text>
                    <Text style={[styles.content, { fontSize: windowWidth * 0.04 }]}>{user.address}</Text>
                </View>
                <View style={styles.divider}></View>
                <View style={styles.infoContainer}>
                    <Text style={[styles.label, { fontSize: windowWidth * 0.04 }]}>Phone:</Text>
                    <Text style={[styles.content, { fontSize: windowWidth * 0.04 }]}>{user.phone}</Text>
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
        paddingHorizontal: windowWidth * 0.05,
        paddingTop: 16,
    },
    settingButton: {
        backgroundColor: '#F59E0B',
        padding: windowWidth * 0.03,
        borderRadius: 20,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        borderRadius: windowWidth * 0.2,
        width: windowWidth * 0.4,
        height: windowWidth * 0.4,
    },
    usernameContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    username: {
        fontSize: windowWidth * 0.06,
        color: '#4B5563',
        fontWeight: 'bold',
    },
    formContainer: {
        backgroundColor: 'white',
        borderRadius: 32,
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
        fontWeight: 'bold',
    },
    content: {
        flex: 5,
    },
    divider: {
        backgroundColor: '#ccc',
        height: 1,
        marginHorizontal: 12,
    },
});
