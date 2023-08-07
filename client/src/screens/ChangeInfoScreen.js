import { View, Text, StyleSheet, Modal, TouchableOpacity, Image, TextInput, ToastAndroid } from 'react-native';
import React, { useState, useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeftIcon, CheckIcon, XMarkIcon } from 'react-native-heroicons/solid';
import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';
import { themeColors } from '../theme';
import { updateUserById } from '../store/apiCall';
import * as ImagePicker from 'expo-image-picker';

export default function ChangeInfoScreen({ navigation }) {
    const insets = useSafeAreaInsets();

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [isUpdatePicture, setIsUpdatePicture] = useState(false);
    const [isSave, setIsSave] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [fullName, setFullName] = useState(user.fullname);
    const [birth, setBirth] = useState(user.birthday);
    const [address, setAddress] = useState(user.address);
    const [email, setEmail] = useState(user.mail);
    const [phone, setPhone] = useState(user.phone);
    const [imageUri, setImageUri] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const handleSave = async () => {
        try {
            const updateUser = {
                fullname: fullName,
                phone: phone,
                birthday: birth,
                address: address,
                mail: email,
            };
            await updateUserById(dispatch, user._id, updateUser);
            ToastAndroid.showWithGravity('Cập nhật thành công', ToastAndroid.SHORT, ToastAndroid.CENTER);
            setIsSave(false);
            setIsEditable(false);
        } catch (error) {
            ToastAndroid.showWithGravity('Cập nhật không thành công', ToastAndroid.SHORT, ToastAndroid.CENTER);
        }
    };

    const handleUpdateImage = () => {
        setModalVisible(true);
    };

    const handleCamera = () => {
        setModalVisible(false);
        navigation.navigate('Camera', { setImageUri: setImageUri });
        setIsSave(true);
        if (imageUri !== '') {
            setIsUpdatePicture(true);
        }
    };

    const handleCollection = async () => {
        setModalVisible(false);
        setIsSave(true);
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
            setIsUpdatePicture(true);
        }
    };

    const handleChangeInput = () => {
        setIsEditable(true);
        setIsSave(true);
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <StatusBar style={{ backgroundColor: themeColors.bg }} />
            <Modal animationType="fade" transparent={true} visible={modalVisible}>
                <View style={styles.modalContainer}>
                    <View style={styles.optionContainer}>
                        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={styles.closeButton}>
                            <XMarkIcon size={20} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleCamera} style={styles.optionButton}>
                            <Text style={styles.textOption}>TAKE PHOTO</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleCollection} style={styles.optionButton}>
                            <Text style={styles.textOption}>COLLECTION</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0 , 0, 0.4 )',
    },
    optionContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 36,
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionButton: {
        backgroundColor: '#2596be',
        paddingVertical: 16,
        alignItems: 'center',
        width: 220,
        marginTop: 12,
        borderRadius: 6,
    },
    textOption: {
        color: 'white',
        fontSize: 18,
        fontWeight: 600,
    },
    closeButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F59E0B',
        width: 50,
        padding: 16,
        borderRadius: 25,
        marginBottom: 8,
    },
});
