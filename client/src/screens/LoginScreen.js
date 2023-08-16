import React from 'react';
import axios from 'axios';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    StyleSheet,
    ToastAndroid,
    Dimensions,
    Platform,
    KeyboardAvoidingView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../store/apiCall';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { API_LINK } from '../../default-value';
import { setItem, getItem } from '../utils/asyncStorage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function LoginScreen() {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const dispatch = useDispatch();
    const [mail, setMail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleLogin = async () => {
        try {
            const res = await axios.post(`${API_LINK}/auth/login`, {
                mail,
                password,
            });
            await setItem('userId', res.data?.user._id);
            await fetchUser(dispatch, res.data?.user._id);
            let onboarded = await getItem('onboarded');
            if (onboarded == 1) {
                navigation.navigate('Tabs', { screen: 'Home' });
            }
            ToastAndroid.showWithGravity(res.data.message, ToastAndroid.SHORT, ToastAndroid.CENTER);
        } catch (error) {
            ToastAndroid.showWithGravity(error.response.data.message, ToastAndroid.SHORT, ToastAndroid.CENTER);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -windowHeight * 0.3}
        >
            <View style={[styles.container, { paddingTop: insets.top }]}>
                <StatusBar style={{ backgroundColor: themeColors.bg }} />
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <ArrowLeftIcon size={20} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.imageContainer}>
                    <Image source={require('../../assets/images/bglogin.jpg')} style={styles.image} />
                </View>
                <View style={styles.formContainer}>
                    <View style={styles.form}>
                        <Text style={styles.label}>Email Address</Text>
                        <TextInput style={styles.input} placeholder="Email" value={mail} onChangeText={setMail} />
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity style={styles.forgotPassword}>
                            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                            <Text style={styles.loginButtonText}>Login</Text>
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
                    <View style={styles.signupContainer}>
                        <Text style={styles.signupText}>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                            <Text style={styles.signupLink}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeColors.bg,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal: windowWidth * 0.05,
        paddingTop: Platform.OS === 'ios' ? 16 : 0,
    },
    backButton: {
        backgroundColor: '#F59E0B',
        padding: windowWidth * 0.03,
        borderRadius: 20,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: windowHeight * 0.25,
    },
    image: {
        width: windowWidth * 0.4,
        height: windowWidth * 0.4,
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
        marginTop: 15,
        color: '#4B5563',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 16,
    },
    input: {
        paddingVertical: 16,
        paddingHorizontal: 24,
        backgroundColor: '#F3F4F6',
        color: '#4B5563',
        borderRadius: 20,
        marginBottom: 8,
    },
    forgotPassword: {
        alignItems: 'flex-end',
    },
    forgotPasswordText: {
        color: '#4B5563',
        marginBottom: 5,
    },
    loginButton: {
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
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    signupText: {
        color: '#6B7280',
        fontWeight: '600',
    },
    signupLink: {
        fontWeight: 'bold',
        color: '#F59E0B',
    },
});
