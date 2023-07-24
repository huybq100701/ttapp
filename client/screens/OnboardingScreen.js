import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import Lottie from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { setItem } from '../utils/asyncStorage';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen() {
  const navigation = useNavigation();

  const handleDone = () => {
    navigation.navigate('Home');
    setItem('onboarded', '1');
  };

  const doneButton = ({ ...props }) => {
    return (
      <TouchableOpacity style={styles.doneButton} {...props}>
        <Text>Done</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <Onboarding
        onDone={handleDone}
        onSkip={handleDone}
        DoneButtonComponent={doneButton}
        containerStyles={{ paddingHorizontal: 15 }}
        pages={[
          {
            backgroundColor: '#FFCC99',
            image: (
              <View style={styles.lottie}>
                <Lottie
                  source={require('../assets/animations/food.json')}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'Food Productivity',
            subtitle: 'Anything you want to eat',
          },
          {
            backgroundColor: '#fef3c7',
            image: (
              <View style={styles.lottie}>
                <Lottie
                  source={require('../assets/animations/shipping.json')}
                  autoPlay
                  loop
                  style={{ resizeMode: 'contain' }}
                />
              </View>
            ),
            title: 'Fast Delivery',
            subtitle: "And don't wanna take up too much of your time",
          },
          {
            backgroundColor: '#FF9966',
            image: (
              <View style={styles.lottie}>
                <Lottie
                  source={require('../assets/animations/service.json')}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'Amazing Service',
            subtitle: "I'll serve you with my perfection",
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  lottie: {
    width: width * 0.9,
    height: width,
  },
  doneButton: {
    padding: 20,
  },
});
