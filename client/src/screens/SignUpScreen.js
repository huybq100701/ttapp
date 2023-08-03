import React from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, ToastAndroid } from 'react-native';
import { themeColors } from '../theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { API_LINK } from '../../default-value';
import axios from 'axios';

export default function SignUpScreen() {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const [username, setUsername] = React.useState('');
    const [mail, setMail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [rePassword, setRePassword] = React.useState('');

    const handlePress = async () => {
        if (password != rePassword) {
            ToastAndroid.showWithGravity('Mật khẩu không khớp', ToastAndroid.SHORT, ToastAndroid.CENTER);
            return;
        }
        try {
            const res = await axios.post(`${API_LINK}/users/register`, {
                mail,
                username,
                password,
            });
            ToastAndroid.showWithGravity(res.data?.message, ToastAndroid.SHORT, ToastAndroid.CENTER);
            navigation.navigate('Login');
        } catch (error) {
            ToastAndroid.showWithGravity(error.response.data?.message, ToastAndroid.SHORT, ToastAndroid.CENTER);
        }
        return;
    };

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
            <View style={styles.formContainer}>
                <View style={styles.form}>
                    <Text style={styles.label}>Username</Text>
                    <TextInput
                        style={styles.input}
                        value={username}
                        onChangeText={setUsername}
                        placeholder="Enter Username"
                    />
                    <Text style={styles.label}>Email Address</Text>
                    <TextInput style={styles.input} value={mail} onChangeText={setMail} placeholder="Enter Email" />
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Enter Password"
                    />
                    <Text style={styles.label}>Confirm Password</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry
                        value={rePassword}
                        onChangeText={setRePassword}
                        placeholder="Enter Confirm Password"
                    />
                    <TouchableOpacity style={styles.signUpButton} onPress={handlePress}>
                        <Text style={styles.signUpButtonText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.orText}>Or</Text>
                <View style={styles.socialButtonsContainer}>
                    <TouchableOpacity style={styles.socialButton}>
                        <Image source={require('../../assets/icons/google.png')} style={styles.socialIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton}>
                        <Image source={require('../../assets/icons/apple.png')} style={styles.socialIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton}>
                        <Image source={require('../../assets/icons/facebook.png')} style={styles.socialIcon} />
                    </TouchableOpacity>
                </View>
                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.loginLink}>Login</Text>
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
        height: 200,
    },
    image: {
        width: 200,
        height: 190,
    },
    formContainer: {
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: 'white',
        paddingHorizontal: 24,
        paddingBottom: 16,
        flex: 1,
    },
    form: {
        marginBottom: 24,
    },
    label: {
        marginTop: 10,
        color: '#4B5563',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 16,
    },
    input: {
        paddingVertical: 10,
        paddingHorizontal: 24,
        backgroundColor: '#F3F4F6',
        color: '#4B5563',
        borderRadius: 20,
        marginBottom: 8,
    },
    signUpButton: {
        paddingVertical: 12,
        backgroundColor: '#F59E0B',
        borderRadius: 24,
    },
    signUpButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4B5563',
        textAlign: 'center',
    },
    orText: {
        fontSize: 20,
        color: '#4B5563',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    socialButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    socialButton: {
        padding: 8,
        backgroundColor: '#F3F4F6',
        borderRadius: 20,
        marginHorizontal: 12,
    },
    socialIcon: {
        width: 40,
        height: 40,
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    loginText: {
        color: '#6B7280',
        fontWeight: '600',
    },
    loginLink: {
        fontWeight: 'bold',
        color: '#F59E0B',
    },
});
