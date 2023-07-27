import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, TextInput } from 'react-native';
import React, { useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeftIcon, CheckIcon } from 'react-native-heroicons/solid';
import { StatusBar } from 'expo-status-bar';

import { themeColors } from '../theme';

export default function ChangeInfo() {
    const arr = [
        {
            FullName: 'Nguyen Van A',
        },
        {
            Birth: '1/1/2001',
        },
        {
            Address: 'Ha Noi, Viet Nam',
        },
        {
            Email: 'nva@gmail.com',
        },
        {
            Phone: '0232342354',
        },
    ];

    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const [isChecked, setIsChecked] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [infos, setInfos] = useState(arr);
    const inputRef = useRef();
    infos.map((info) => {
        console.log();
    });

    const handleSave = () => {
        setIsChecked(false);
        setIsEditable(false);
    };

    const handleChangeImage = () => {
        setIsChecked(true);
    };

    const handleChangeInput = () => {
        setIsEditable(true);
        setIsChecked(true);
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
                        style={[styles.saveButton, { backgroundColor: isChecked ? '#F59E0B' : '#E7B172' }]}
                    >
                        <CheckIcon size={20} color={isChecked ? '#000' : '#ddd'} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.imageContainer}>
                <Image source={require('../../assets/images/bglogin.jpg')} style={styles.image} />
                <TouchableOpacity style={styles.changeImage}>
                    <Text onPress={handleChangeImage} style={styles.textChangeImage}>
                        Change
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.formContainer}>
                <View style={styles.itemInfo}>
                    <Text style={styles.label}>Full name: </Text>
                    <TextInput ref={inputRef} style={styles.info} editable={isEditable} value={'Nguyen Van A'} />
                    <TouchableOpacity style={styles.changeInfo}>
                        <Text onPress={handleChangeInput} style={styles.textChangeInfo}>
                            Change
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.itemInfo}>
                    <Text style={styles.label}>Birth: </Text>
                    <TextInput ref={inputRef} style={styles.info} editable={isEditable} value={'1/1/2001'} />
                    <TouchableOpacity style={styles.changeInfo}>
                        <Text onPress={handleChangeInput} style={styles.textChangeInfo}>
                            Change
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.itemInfo}>
                    <Text style={styles.label}>Address: </Text>
                    <TextInput
                        ref={inputRef}
                        style={styles.info}
                        editable={isEditable}
                        value={'Ha Noi, Viet Nam Ha Noi, Viet Nam Ha Noi, Viet Nam'}
                    />
                    <TouchableOpacity style={styles.changeInfo}>
                        <Text onPress={handleChangeInput} style={styles.textChangeInfo}>
                            Change
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.itemInfo}>
                    <Text style={styles.label}>Email: </Text>
                    <TextInput ref={inputRef} style={styles.info} editable={isEditable} value={'nva@gmail.com'} />
                    <TouchableOpacity style={styles.changeInfo}>
                        <Text onPress={handleChangeInput} style={styles.textChangeInfo}>
                            Change
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.itemInfo}>
                    <Text style={styles.label}>Phone: </Text>
                    <TextInput ref={inputRef} style={styles.info} editable={isEditable} value={'0232342354'} />
                    <TouchableOpacity style={styles.changeInfo}>
                        <Text onPress={handleChangeInput} style={styles.textChangeInfo}>
                            Change
                        </Text>
                    </TouchableOpacity>
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
        backgroundColor: 'white',
        paddingHorizontal: 18,
        flex: 1,
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
    },
    info: {
        fontSize: 20,
        flex: 1,
        marginLeft: 15,
    },
    textChangeInfo: {
        marginLeft: 10,
        fontSize: 14,
        width: 50,
        color: '#F59E0B',
    },
});