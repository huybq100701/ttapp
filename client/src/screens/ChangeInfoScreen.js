import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, TextInput } from 'react-native';
import React, { useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeftIcon, CheckIcon } from 'react-native-heroicons/solid';
import { StatusBar } from 'expo-status-bar';
import * as MediaLibrary from 'expo-media-library';

import { themeColors } from '../theme';

export default function ChangeInfoScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const [isUpdatePicture, setIsUpdatePicture] = useState(false);
    const [isSave, setIsSave] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [fullName, setFullName] = useState('Nguyen Van A');
    const [birth, setBirth] = useState('1/1/2001');
    const [address, setAddress] = useState('Ha Noi, Viet Nam');
    const [email, setEmail] = useState('nva@gmail.com');
    const [phone, setPhone] = useState('0232342354');
    const [imageUri, setImageUri] = useState('');

    const handleSave = () => {
        setIsSave(false);
        setIsEditable(false);
    };

    const handleUpdateImage = () => {
        if (imageUri !== '') {
            setIsUpdatePicture(true);
        }
        navigation.navigate('Camera', { setImageUri: setImageUri });
        setIsSave(true);
    };

    const handleChangeInput = () => {
        setIsEditable(true);
        setIsSave(true);
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <StatusBar style={{ backgroundColor: themeColors.bg }} />
            <View style={styles.header}>
                <View style={styles.safeArea}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <ArrowLeftIcon size={20} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.safeArea}>
                    <TouchableOpacity
                        onPress={handleSave}
                        style={[styles.saveButton, { backgroundColor: isSave ? '#F59E0B' : '#E7B172' }]}
                    >
                        <CheckIcon size={20} color={isSave ? '#000' : '#ddd'} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.imageContainer}>
                <Image
                    source={isUpdatePicture ? { uri: imageUri } : require('../../assets/images/bglogin.jpg')}
                    style={styles.image}
                />
                <TouchableOpacity style={styles.changeImage}>
                    <Text onPress={handleUpdateImage} style={styles.textChangeImage}>
                        Update
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.formContainer}>
                <View style={styles.itemInfo}>
                    <Text style={styles.label}>Full name: </Text>
                    <TextInput
                        style={styles.info}
                        editable={isEditable}
                        value={fullName}
                        onChangeText={(e) => setFullName(e)}
                    />
                </View>
                <View style={styles.itemInfo}>
                    <Text style={styles.label}>Birth: </Text>
                    <TextInput
                        style={styles.info}
                        editable={isEditable}
                        value={birth}
                        onChangeText={(e) => setBirth(e)}
                    />
                </View>
                <View style={styles.itemInfo}>
                    <Text style={styles.label}>Address: </Text>
                    <TextInput
                        style={styles.info}
                        editable={isEditable}
                        value={address}
                        onChangeText={(e) => setAddress(e)}
                    />
                </View>
                <View style={styles.itemInfo}>
                    <Text style={styles.label}>Email: </Text>
                    <TextInput
                        style={styles.info}
                        editable={isEditable}
                        value={email}
                        onChangeText={(e) => setEmail(e)}
                    />
                </View>
                <View style={styles.itemInfo}>
                    <Text style={styles.label}>Phone: </Text>
                    <TextInput
                        style={styles.info}
                        editable={isEditable}
                        value={phone}
                        onChangeText={(e) => setPhone(e)}
                    />
                </View>
                <TouchableOpacity style={styles.changeInfo}>
                    <Text onPress={handleChangeInput} style={styles.textChangeInfo}>
                        Change
                    </Text>
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
    header: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    safeArea: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    backButton: {
        backgroundColor: '#F59E0B',
        padding: 10,
        borderRadius: 20,
    },
    saveButton: {
        padding: 10,
        borderRadius: 20,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 900,
    },
    changeImage: {
        margin: 10,
    },
    textChangeImage: {
        fontSize: 20,
        color: '#F59E0B',
    },
    formContainer: {
        paddingTop: 20,
        borderRadius: 32,
        backgroundColor: 'white',
        paddingHorizontal: 18,
        flex: 1,
        alignItems: 'flex-end',
    },
    itemInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    label: {
        fontSize: 20,
        width: 95,
        fontWeight: 'bold',
    },
    info: {
        fontSize: 20,
        flex: 1,
        marginLeft: 15,
    },
    textChangeInfo: {
        marginTop: 160,
        fontSize: 20,
        color: '#F59E0B',
    },
});
