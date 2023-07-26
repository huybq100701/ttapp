import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const OtpScreen = ({ navigation, route }) => {
  const { useremail, userVerificationCode } = route.params;
  console.log(useremail, userVerificationCode);

  const [verificationCode, setVerificationCode] = useState('');

  const handleVerificationCode = () => {
    if (verificationCode === userVerificationCode) {
      alert('Verification Code Matched');
      navigation.navigate('Signup_ChooseUsername', { email: useremail });
    } else {
      alert('Invalid Verification Code. Please Try Again');
    }
  };

  return (
    <View style={containerFull}>
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={goback}>
        <MaterialIcons name="arrow-back-ios" size={24} color="gray" />
      </TouchableOpacity>

      <Image source={logo} style={logo1} />
      <Text style={formHead3}>A verification code has been sent to your email</Text>
      <TextInput
        placeholder="Enter 6-Digit Code here"
        style={formInput}
        onChangeText={(text) => setVerificationCode(text)}
        keyboardType="numeric"
        maxLength={6}
      />

      <TouchableOpacity style={formbtn} onPress={handleVerificationCode}>
        <Text>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({});