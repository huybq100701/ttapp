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
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

const data = [
    { label: 'Rices', value: 'rices' },
    { label: 'Noodles', value: 'noodles' },
    { label: 'Hot Dogs', value: 'hot dogs' },
];

export default function AddFoodScreen() {
    const [value, setValue] = useState('java');

    const navigation = useNavigation();
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <StatusBar style={{ backgroundColor: themeColors.bg }} />
            <View style={styles.safeArea}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ArrowLeftIcon size={20} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
                <Image source={require('../../assets/images/bglogin.jpg')} style={styles.image} />
            </View>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                // keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
                style={styles.formContainer}
            >
                <ScrollView style={styles.form}>
                    <Text style={styles.label}>Food Name</Text>
                    <TextInput style={styles.input} placeholder="Name" value="" />
                    <Text style={styles.label}>Food Detail</Text>
                    <TextInput style={styles.input} secureTextEntry placeholder="Info" value="" multiline />
                    <Text style={styles.label}>Price</Text>
                    <TextInput style={styles.input} secureTextEntry placeholder="Price" value="" />
                    <Text style={styles.label}>Categories</Text>
                    <Dropdown
                        style={styles.categories}
                        data={data}
                        labelField="label"
                        valueField="value"
                        onChange={(item) => {
                            setValue(item.value);
                        }}
                    />
                    <TouchableOpacity style={styles.loginButton}>
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
