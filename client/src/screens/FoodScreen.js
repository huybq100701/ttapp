import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { icons, SIZES, COLORS } from '../constants';
import axios from 'axios'; 
import { API_LINK } from '../../default-value';

const FoodScreen = ({ route }) => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const { _id } = route.params.item; 

    const [comments, setComments] = useState([]);
    const [menuData, setMenuData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch menu data
        axios.get(`${API_LINK}/menu/${_id}`)
            .then(response => {
                setMenuData(response.data.menu);
            })
            .catch(error => {
                console.error('Error fetching menu:', error);
            });
            console.log(menuData);
        // Fetch comments data
        axios.get(`${API_LINK}/comment/${_id}`)
            .then(response => {
                setComments(response.data.comment);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching comments:', error);
                setIsLoading(false);
            });
    }, [_id]);

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <StatusBar style={{ backgroundColor: themeColors.bg }} />
            <View style={styles.safeArea}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ArrowLeftIcon size={20} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
                <Image source={{ uri: menuData.photo }} style={styles.image} />
            </View>
            <View style={styles.formContainer}>
                <View style={styles.form}>
                    <Text style={styles.label}>Name:</Text>
                    <Text style={styles.foodName}>{menuData.name}</Text>

                    <Text style={styles.label}>Description:</Text>
                    <Text style={styles.description}>{menuData.description}</Text>

                    <Text style={styles.label}>Calories:</Text>
                    <Text style={styles.calories}>{menuData.calories ? menuData.calories.toFixed(2) : 'N/A'} cal</Text>

                    <Text style={styles.label}>Price:</Text>
                    <Text style={styles.price}>${menuData.price ? menuData.price.toFixed(2) : 'N/A'}</Text>

                    <View style={styles.ratingContainer}>
                        <Image source={icons.star} style={styles.starIcon} />
                        <Text style={styles.ratingText}>{menuData.rating ? menuData.rating.toFixed(1) : 'N/A'}</Text>
                    </View>
                </View>

                <View style={styles.commentSection}>
                    <Text style={styles.commentHeader}>Comments:</Text>
                    {isLoading ? (
                        <Text>Loading comments...</Text>
                    ) : (
                        comments.map((item, index) => (
                            <View key={index} style={styles.comment}>
                                <Text style={styles.commentText}>User {item.userId}: {item.commentText}</Text>
                            </View>
                        ))
                    )}
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
        padding: 16,
    },
    label: {
        color: '#4B5563',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8,
    },
    foodName: {
        fontSize: 18,
    },
    description: {
        fontSize: 16,
        marginTop: 4,
        color: '#666666',
    },
    calories: {
        fontSize: 16,
        marginTop: 4,
    },
    price: {
        fontSize: 18,
        marginTop: 4,
        fontWeight: 'bold',
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
  },
  starIcon: {
      width: 20,
      height: 20,
      tintColor: COLORS.primary,
      marginRight: 4,
  },
  ratingText: {
      fontSize: 16,
      color: COLORS.primary,
      fontWeight: 'bold',
  },
    commentSection: {
        marginTop: 16,
    },
    commentHeader: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    comment: {
        marginTop: 8,
    },
    commentText: {
        fontSize: 14,
    },
});

export default FoodScreen;

