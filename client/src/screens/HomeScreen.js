import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList
} from "react-native";
import Swiper from "react-native-swiper";
import { icons, images, SIZES, COLORS } from '../constants'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HomeScreen = ({ navigation }) => {

    const initialCurrentLocation = {
        streetName: "Hanoi",
        gps: {
            latitude: 1.12345678,
            longitude: 110.324234
        }
    }

    const categoryData = [
        {
            id: 1,
            name: "Rice",
            icon: icons.rice_bowl,
        },
        {
            id: 2,
            name: "Noodles",
            icon: icons.noodle,
        },
        {
            id: 3,
            name: "Hot Dogs",
            icon: icons.hotdog,
        },
        {
            id: 4,
            name: "Salads",
            icon: icons.salad,
        },
        {
            id: 5,
            name: "Burgers",
            icon: icons.hamburger,
        },
        {
            id: 6,
            name: "Pizza",
            icon: icons.pizza,
        },
        {
            id: 7,
            name: "Snacks",
            icon: icons.fries,
        },
        {
            id: 8,
            name: "Sushi",
            icon: icons.sushi,
        },
        {
            id: 9,
            name: "Desserts",
            icon: icons.donut,
        },
        {
            id: 10,
            name: "Drinks",
            icon: icons.drink,
        },

    ]

    // price rating
    const affordable = 1
    const fairPrice = 2
    const expensive = 3

    const restaurantData = [
        {
            id: 1,
            name: "Burger",
            rating: 4.8,
            categories: [5, 7],
            priceRating: affordable,
            photo: images.burger_restaurant_1,
            duration: "10 - 15 min",
            location: {
                latitude: 1.5347282806345879,
                longitude: 110.35632207358996,
            },
            courier: {
                avatar: images.avatar_1,
                name: "Amy"
            },
            menu: [
                {
                    menuId: 1,
                    name: "Crispy Chicken Burger",
                    photo: images.crispy_chicken_burger,
                    description: "Burger with crispy chicken, cheese and lettuce",
                    calories: 200,
                    price: 10
                },
                {
                    menuId: 2,
                    name: "Crispy Chicken Burger with Honey Mustard",
                    photo: images.honey_mustard_chicken_burger,
                    description: "Crispy Chicken Burger with Honey Mustard Coleslaw",
                    calories: 250,
                    price: 15
                },
            ]
        },
        {
          id: 2,
          name: "Pizza",
          rating: 4.8,
          categories: [2, 4, 6],
          priceRating: expensive,
          photo: images.pizza_restaurant,
          duration: "15 - 20 min",
          location: {
              latitude: 1.556306570595712,
              longitude: 110.35504616746915,
          },
          courier: {
              avatar: images.avatar_2,
              name: "Jackson"
          },
          menu: [
              {
                  menuId: 4,
                  name: "Hawaiian Pizza",
                  photo: images.hawaiian_pizza,
                  description: "Canadian bacon, homemade pizza crust, pizza sauce",
                  calories: 250,
                  price: 15
              },
              {
                  menuId: 5,
                  name: "Tomato & Basil Pizza",
                  photo: images.pizza,
                  description: "Fresh tomatoes, aromatic basil pesto and melted bocconcini",
                  calories: 250,
                  price: 20
              },
              {
                  menuId: 6,
                  name: "Tomato Pasta",
                  photo: images.tomato_pasta,
                  description: "Pasta with fresh tomatoes",
                  calories: 100,
                  price: 10
              },
              {
                  menuId: 7,
                  name: "Mediterranean Chopped Salad ",
                  photo: images.salad,
                  description: "Finely chopped lettuce, tomatoes, cucumbers",
                  calories: 100,
                  price: 10
              }
          ]
      },
      
    ]

    const [categories, setCategories] = React.useState(categoryData)
    const [selectedCategory, setSelectedCategory] = React.useState(null)
    const [restaurants, setRestaurants] = React.useState(restaurantData)
    const [currentLocation, setCurrentLocation] = React.useState(initialCurrentLocation)
    const insets = useSafeAreaInsets();

    function onSelectCategory(category) {
        //filter restaurant
        let restaurantList = restaurantData.filter(a => a.categories.includes(category.id))

        setRestaurants(restaurantList)

        setSelectedCategory(category)
    }

    function getCategoryNameById(id) {
        let category = categories.filter(a => a.id == id)

        if (category.length > 0)
            return category[0].name

        return ""
    }

    function renderHeader() {
        return (
          <View style={{ flexDirection: 'row', height: 50 }}>
            <TouchableOpacity
              style={{
                width: 50,
                paddingLeft: SIZES.padding * 2,
                justifyContent: 'center'
              }}
            >
              <Image
                source={icons.nearby}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30
                }}
              />
            </TouchableOpacity>
      
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <View
                style={{
                  width: '70%',
                  height: "100%",
                  backgroundColor: COLORS.lightGray3,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: SIZES.radius
                }}
              >
                <Text>{currentLocation.streetName}</Text>
              </View>
            </View>
      
            <TouchableOpacity
              style={{
                width: 50,
                paddingRight: SIZES.padding * 2,
                justifyContent: 'center'
              }}
            >
              <Image
                source={icons.basket}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30
                }}
              />
            </TouchableOpacity>
          </View>
        );
      }      

    function renderMainCategories() {
        const renderItem = ({ item }) => {
          return (
            <TouchableOpacity
              style={{
                padding: SIZES.padding,
                paddingBottom: SIZES.padding ,
                backgroundColor: selectedCategory?.id === item.id ? COLORS.primary : COLORS.white,
                borderRadius: SIZES.radius,
                alignItems: "center",
                justifyContent: "center",
                marginRight: SIZES.padding,
                ...styles.shadow,
              }}
              onPress={() => onSelectCategory(item)}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: selectedCategory?.id === item.id ? COLORS.white : COLORS.lightGray,
                }}
              >
                <Image
                  source={item.icon}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
              </View>
    
              <Text
                style={{
                 
                  color: selectedCategory?.id === item.id ? COLORS.white : COLORS.black,
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        };
    
        return (
          <View style={{ padding: SIZES.padding * 2 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>Categories</Text>
    
            <FlatList
              data={categories}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => `${item.id}`}
              renderItem={renderItem}
              contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
            />
          </View>
        );
      }
      function renderRestaurantSwiper() {
        const renderItem = ({ item }) => (
          <TouchableOpacity
            style={{ marginBottom: SIZES.padding * 2 }}
            onPress={() =>
              navigation.navigate("Restaurant", {
                item,
                currentLocation,
              })
            }
          >
            {/* Image */}
            <View style={{ marginBottom: SIZES.padding }}>
              <Image
                source={item.photo}
                resizeMode="cover"
                style={{
                  width: "100%",
                  height: 200,
                  borderRadius: SIZES.radius,
                }}
              />
    
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  height: 50,
                  width: SIZES.width * 0.3,
                  backgroundColor: COLORS.white,
                  borderTopRightRadius: SIZES.radius,
                  borderBottomLeftRadius: SIZES.radius,
                  alignItems: "center",
                  justifyContent: "center",
                  ...styles.shadow,
                }}
              >
                <Text>{item.duration}</Text>
              </View>
            </View>
    
            {/* Restaurant Info */}
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.name}</Text>
    
            <View
              style={{
                marginTop: SIZES.padding,
                flexDirection: "row",
              }}
            >
              {/* Rating */}
              <Image
                source={icons.star}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: COLORS.primary,
                  marginRight: 10,
                }}
              />
              <Text>{item.rating}</Text>
    
              {/* Categories */}
              <View
                style={{
                  flexDirection: "row",
                  marginLeft: 10,
                }}
              >
                {item.categories.map((categoryId) => {
                  return (
                    <View style={{ flexDirection: "row" }} key={categoryId}>
                      <Text>{getCategoryNameById(categoryId)}</Text>
                      <Text style={{ fontSize: 18, color: COLORS.darkgray }}> . </Text>
                    </View>
                  );
                })}
    
                {/* Price */}
                {[1, 2, 3].map((priceRating) => (
                  <Text
                    key={priceRating}
                    style={{
                      fontSize: 16,
                      color: priceRating <= item.priceRating ? COLORS.black : COLORS.darkgray,
                    }}
                  >
                    $
                  </Text>
                ))}
              </View>
            </View>
          </TouchableOpacity>
        );
    
        return (
          <Swiper
            showsButtons={false}
            loop={false}
            style={styles.swiperContainer} 
            activeDotColor={COLORS.primary}
          >
            {restaurants.map((item) => (
              <View key={item.id} style={styles.swiperSlide}>
                {renderItem({ item })}
              </View>
            ))}
          </Swiper>
        );
      }
    
      function renderRestaurantList() {
        const renderItem = ({ item }) => (
          <TouchableOpacity
            style={{ marginBottom: SIZES.padding * 2 }}
            onPress={() =>
              navigation.navigate("Restaurant", {
                item,
                currentLocation,
              })
            }
          >
            {/* Image */}
            <View
              style={{
                marginBottom: SIZES.padding,
              }}
            >
              <Image
                source={item.photo}
                resizeMode="cover"
                style={{
                  width: "100%",
                  height: 200,
                  borderRadius: SIZES.radius,
                }}
              />
    
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  height: 50,
                  width: SIZES.width * 0.3,
                  backgroundColor: COLORS.white,
                  borderTopRightRadius: SIZES.radius,
                  borderBottomLeftRadius: SIZES.radius,
                  alignItems: "center",
                  justifyContent: "center",
                  ...styles.shadow,
                }}
              >
                <Text>{item.duration}</Text>
              </View>
            </View>
    
            {/* Restaurant Info */}
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.name}</Text>
    
            <View
              style={{
                marginTop: SIZES.padding,
                flexDirection: "row",
              }}
            >
              {/* Rating */}
              <Image
                source={icons.star}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: COLORS.primary,
                  marginRight: 10,
                }}
              />
              <Text>{item.rating}</Text>
    
              {/* Categories */}
              <View
                style={{
                  flexDirection: "row",
                  marginLeft: 10,
                }}
              >
                {item.categories.map((categoryId) => {
                  return (
                    <View
                      style={{ flexDirection: "row" }}
                      key={categoryId}
                    >
                      <Text>{getCategoryNameById(categoryId)}</Text>
                      <Text style={{ fontSize: 18, color: COLORS.darkgray }}> . </Text>
                    </View>
                  );
                })}
    
                {/* Price */}
                {[1, 2, 3].map((priceRating) => (
                  <Text
                    key={priceRating}
                    style={{
                      fontSize: 16,
                      color: priceRating <= item.priceRating ? COLORS.black : COLORS.darkgray,
                    }}
                  >
                    $
                  </Text>
                ))}
              </View>
            </View>
          </TouchableOpacity>
        );
    
        return (
          <FlatList
            data={restaurants}
            keyExtractor={(item) => `${item.id}`}
            renderItem={renderItem}
            contentContainerStyle={{
              paddingHorizontal: SIZES.padding * 2,
              paddingBottom: 30,
            }}
          />
        );
      }
    
      return (
        <SafeAreaView style={[styles.container, {paddingTop: insets.top}]}>
          {renderHeader()}
          {renderMainCategories()}
          {renderRestaurantSwiper()}
          {renderRestaurantList()}
        </SafeAreaView>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: COLORS.lightGray4,
        marginTop:10
      },
      shadow: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
      },
      swiperContainer: {
        height: 240,
      },
      swiperSlide: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
    });
    
    export default HomeScreen;