import React from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native';
import { themeColors } from '../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';

export default function SignUpScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ArrowLeftIcon size={20} color="black" />
        </TouchableOpacity>
      </SafeAreaView>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/bglogin.jpg')}
          style={styles.image}
        />
      </View>
      <View style={styles.formContainer}>
        <View style={styles.form} >
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value="full name"
            placeholder="Enter Name"
          />
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            value="@gmail.com"
            placeholder="Enter Email"
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value="12345"
            placeholder="Enter Password"
          />
          <TouchableOpacity style={styles.signUpButton}>
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
    marginTop:5,
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
