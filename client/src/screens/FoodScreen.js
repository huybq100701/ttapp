import React from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, Button } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
export default function FoodScreen() {
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
            <View style={styles.formContainer}>
                <View style={styles.form}>
                    
                </View>
                
                <View style={styles.footer}>
                    <View >
                        <Text style ={{color: '#CCCCCC'}}>Price</Text>
                        <Text style ={{color: 'white', fontSize: 20}}>$4</Text>
                    </View>
                    <TouchableOpacity style = {styles.add}>
                            <Text style= {styles.addtext}>Add to Cart</Text>
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
      height: 200,
    },
    formContainer: {
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      backgroundColor: 'white',
      flex: 1,
      justifyContent: 'space-between', 
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
    footer: {
      flexDirection: 'row',
      backgroundColor: '#002200',
      alignItems: 'center',
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      height: 80,
      justifyContent: 'space-between', 
      paddingHorizontal: 24,
      position: 'absolute', 
      bottom: 0, 
      left: 0, 
      right: 0,
    },
    add: {
      backgroundColor: '#FF6600',
      borderRadius: 25,
      width: 170,
      height: 45,
      justifyContent: 'center',
      alignItems: 'center',
    },
    addtext: {
      fontSize: 17,
      color: 'white',
    },
  });
  