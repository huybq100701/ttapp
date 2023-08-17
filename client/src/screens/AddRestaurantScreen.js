import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    ToastAndroid,
} from 'react-native';
import { useState } from 'react';
import { MultiSelect } from 'react-native-element-dropdown';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { categoryContext } from '../utils/Context';
import * as ImagePicker from 'expo-image-picker';
import { addRestaurant } from '../store/apiCall';
import { useDispatch } from 'react-redux';

export default function AddRestaurantScreen() {
    const [value, setValue] = useState([]);
    const [name, setName] = useState('');
    const [duration, setDuration] = useState('');
    const [rating, setRating] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [imageUri, setImageUri] = useState('');
    const categoryData = React.useContext(categoryContext);

    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const dispatch = useDispatch();

    const handleCollection = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };
    const handleAddRestaurant = async () => {
        if (!name || !duration || !rating || !latitude || !longitude || value.length == 0) {
            ToastAndroid.show('Vui lòng điền đẩy đủ tất cả các trường', ToastAndroid.SHORT);
            return;
        }
        try {
            const newRestaurantData = {
                name,
                duration,
                rating: parseFloat(rating),
                location: {
                    latitude: parseFloat(latitude),
                    longitude: parseFloat(longitude),
                },
                photo: imageUri,
                categories: value,
            };
            await addRestaurant(dispatch, newRestaurantData);
            ToastAndroid.show('Thêm restaurant thành công', ToastAndroid.SHORT);
        } catch (error) {
            console.log('Error o handle add restaurant', error);
            ToastAndroid.show('Thêm restaurant thất bại', ToastAndroid.SHORT);
        }
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <StatusBar style={{ backgroundColor: themeColors.bg }} />
            <View style={styles.safeArea}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ArrowLeftIcon size={20} color="black" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleCollection} style={styles.imageContainer}>
                <Image
                    source={imageUri ? { uri: imageUri } : require('../../assets/images/bglogin.jpg')}
                    style={styles.image}
                />
            </TouchableOpacity>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={styles.formContainer}>
                <ScrollView style={styles.form}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
                    <Text style={styles.label}>Duration</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Duration"
                        value={duration}
                        onChangeText={setDuration}
                    />
                    <Text style={styles.label}>Rating</Text>
                    <TextInput style={styles.input} placeholder="Rating" value={rating} onChangeText={setRating} />
                    <Text style={styles.label}>Latitude</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Latitude"
                        value={latitude}
                        onChangeText={setLatitude}
                    />
                    <Text style={styles.label}>Longitude</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Longitude"
                        value={longitude}
                        onChangeText={setLongitude}
                    />
                    <Text style={styles.label}>Categories</Text>
                    <MultiSelect
                        style={styles.categories}
                        data={categoryData}
                        labelField="name"
                        valueField="id"
                        onChange={(item) => {
                            setValue(item);
                        }}
                        value={value}
                        dropdownPosition="top"
                    />
                    <TouchableOpacity style={styles.loginButton} onPress={handleAddRestaurant}>
                        <Text style={styles.loginButtonText}>Add</Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeColors.bg,
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
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,
    },
    image: {
        width: 300,
        height: 300,
        borderRadius: 20,
    },
    formContainer: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: 'white',
        paddingHorizontal: 24,
        paddingTop: 16,
        flex: 1,
        marginTop: 32,
    },
    form: {
        marginBottom: 0,
    },
    label: {
        marginTop: 8,
        color: '#4B5563',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 16,
        paddingBottom: 4,
    },
    input: {
        paddingVertical: 10,
        paddingHorizontal: 24,
        backgroundColor: '#F3F4F6',
        color: '#4B5563',
        borderRadius: 20,
        marginBottom: 8,
    },
    loginButton: {
        marginTop: 16,
        paddingVertical: 12,
        backgroundColor: '#F59E0B',
        borderRadius: 24,
    },
    loginButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4B5563',
        textAlign: 'center',
    },
    categories: {
        height: 50,
        backgroundColor: '#f3f4f6',
        borderRadius: 23,
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
});
