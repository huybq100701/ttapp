import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './tabs';
import SettingScreen from '../screens/SettingScreen';
import OnboardingScreen from '../screens/OnboardingScreen.js';
import LoginScreen from '../screens/LoginScreen.js';
import SignUpScreen from '../screens/SignUpScreen';
import CartScreen from '../screens/CartScreen';
import ChangeInfoScreen from '../screens/ChangeInfoScreen';
import CameraScreen from '../screens/CameraScreen';
import RestaurantScreen from '../screens/RestaurantScreen';
import FoodScreen from '../screens/FoodScreen';
import DeliveryScreen from '../screens/DeliveryScreen';
import PaymentCompleteScreen from '../screens/PaymentCompleteScreen';

import { getItem } from '../utils/asyncStorage.js';


const Stack = createNativeStackNavigator();

export default function AppNavigation() {
    const [showOnboarding, setShowOnboarding] = useState(null);
    useEffect(() => {
        checkIfAlreadyOnboarded();
    }, []);

    const checkIfAlreadyOnboarded = async () => {
        let onboarded = await getItem('onboarded');
        if (onboarded == 1) {
            setShowOnboarding(false);
        } else {
            setShowOnboarding(true);
        }
    };

    if (showOnboarding == null) {
        return null;
    }

    if (showOnboarding) {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Onboarding">
                    <Stack.Screen name="Onboarding" options={{ headerShown: false }} component={OnboardingScreen} />
                    <Stack.Screen name="Tabs" options={{ headerShown: false }} component={Tabs} />
                    <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
                    <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUpScreen} />
                    <Stack.Screen name="Cart" options={{ headerShown: false }} component={CartScreen} />
                    <Stack.Screen name="ChangeInfo" options={{ headerShown: false }} component={ChangeInfoScreen} />
                    <Stack.Screen name="Camera" options={{ headerShown: false }} component={CameraScreen} />
                    <Stack.Screen name="Restaurant" options={{ headerShown: false }} component={RestaurantScreen} />
                    <Stack.Screen name="Food" options={{ headerShown: false }} component={FoodScreen} />
                    <Stack.Screen name="Delivery" options={{ headerShown: false }} component={DeliveryScreen} />
                    <Stack.Screen
                        name="PaymentComplete"
                        options={{ headerShown: false }}
                        component={PaymentCompleteScreen}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    } else {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Tabs">
                    <Stack.Screen name="Onboarding" options={{ headerShown: false }} component={OnboardingScreen} />
                    <Stack.Screen name="Tabs" options={{ headerShown: false }} component={Tabs} />
                    <Stack.Screen name="Setting" options={{ headerShown: false }} component={SettingScreen} />
                    <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
                    <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUpScreen} />
                    <Stack.Screen name="Cart" options={{ headerShown: false }} component={CartScreen} />
                    <Stack.Screen name="ChangeInfo" options={{ headerShown: false }} component={ChangeInfoScreen} />
                    <Stack.Screen name="Camera" options={{ headerShown: false }} component={CameraScreen} />
                    <Stack.Screen name="Restaurant" options={{ headerShown: false }} component={RestaurantScreen} />
                    <Stack.Screen name="Food" options={{ headerShown: false }} component={FoodScreen} />
                    <Stack.Screen name="Delivery" options={{ headerShown: false }} component={DeliveryScreen} />
                    <Stack.Screen
                        name="PaymentComplete"
                        options={{ headerShown: false }}
                        component={PaymentCompleteScreen}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}
