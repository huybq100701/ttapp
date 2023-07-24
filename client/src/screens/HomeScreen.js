import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Lottie from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { removeItem } from '../src/utils/asyncStorage';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
    const navigation = useNavigation();

    const handleReset = async () => {
        await removeItem('onboarded');
        navigation.push('Onboarding');
    };
    return (
        <View style={styles.container}>
            <View style={styles.heading}>
                <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
                    <Text>Reset</Text>
                </TouchableOpacity>
                <Text style={styles.text}>Home Page</Text>
            </View>

            <View style={styles.lottie}>
                <Lottie source={require('../assets/animations/food.gif')} autoPlay loop />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    heading: {
        flexDirection: 'row',
    },
    lottie: {
        width: width * 0.9,
        height: width,
    },
    text: {
        fontSize: width * 0.06,
        marginBottom: 20,
        justifyContent: 'center',
        marginLeft: width * 0.2,
    },
    resetButton: {
        backgroundColor: '#34d399',
        padding: 10,
        borderRadius: 50,
    },
});
