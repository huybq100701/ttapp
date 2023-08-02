import React, { useState, useEffect } from 'react';
import { restaurantsContext } from './Context';
import { icons, images, SIZES, COLORS } from '../constants';

export default function RestaurantsProvider({ children }) {
    const affordable = 1;
    const fairPrice = 2;
    const expensive = 3;

    const restaurantData = [
        {
            id: 1,
            name: 'Burger',
            rating: 4.8,
            categories: [5, 7],
            priceRating: affordable,
            photo: images.burger_restaurant_1,
            duration: '10 - 15 min',
            location: {
                latitude: 21.02154,
                longitude: 105.77489,
            },
            courier: {
                avatar: images.avatar_1,
                name: 'Amy',
            },
            menu: [
                {
                    menuId: 1,
                    name: 'Crispy Chicken Burger',
                    photo: images.crispy_chicken_burger,
                    description: 'Burger with crispy chicken, cheese and lettuce',
                    calories: 200,
                    price: 10,
                    rating: 4.5,
                    comment: [
                        {
                            userId: 1,
                            commentText: 'Delicious',
                            userId: 2,
                            commentText: 'Delicious',
                        },
                    ],
                },
                {
                    menuId: 2,
                    name: 'Crispy Chicken Burger with Honey Mustard',
                    photo: images.honey_mustard_chicken_burger,
                    description: 'Crispy Chicken Burger with Honey Mustard Coleslaw',
                    calories: 250,
                    price: 15,
                    rating: 4.5,
                    comment: [
                        {
                            userId: 1,
                            commentText: 'Delicious',
                            userId: 2,
                            commentText: 'Delicious',
                        },
                    ],
                },
            ],
        },
        {
            id: 2,
            name: 'Pizza',
            rating: 4.8,
            categories: [2, 4, 6],
            priceRating: expensive,
            photo: images.pizza_restaurant,
            duration: '15 - 20 min',
            location: {
                latitude: 21.017459,
                longitude: -254.215627,
            },
            courier: {
                avatar: images.avatar_2,
                name: 'Jackson',
            },
            menu: [
                {
                    menuId: 4,
                    name: 'Hawaiian Pizza',
                    photo: images.hawaiian_pizza,
                    description: 'Canadian bacon, homemade pizza crust, pizza sauce',
                    calories: 250,
                    price: 15,
                    rating: 4.5,
                    comment: [
                        {
                            userId: 1,
                            commentText: 'Delicious',
                            userId: 2,
                            commentText: 'Delicious',
                        },
                    ],
                },
                {
                    menuId: 5,
                    name: 'Tomato & Basil Pizza',
                    photo: images.pizza,
                    description: 'Fresh tomatoes, aromatic basil pesto and melted bocconcini',
                    calories: 250,
                    price: 20,
                    rating: 4.5,
                    comment: [
                        {
                            userId: 1,
                            commentText: 'Delicious',
                            userId: 2,
                            commentText: 'Delicious',
                        },
                    ],
                },
                {
                    menuId: 6,
                    name: 'Tomato Pasta',
                    photo: images.tomato_pasta,
                    description: 'Pasta with fresh tomatoes',
                    calories: 100,
                    price: 10,
                    rating: 4.5,
                    comment: [
                        {
                            userId: 1,
                            commentText: 'Delicious',
                            userId: 2,
                            commentText: 'Delicious',
                        },
                    ],
                },
                {
                    menuId: 7,
                    name: 'Mediterranean Chopped Salad ',
                    photo: images.salad,
                    description: 'Finely chopped lettuce, tomatoes, cucumbers',
                    calories: 100,
                    price: 10,
                    rating: 4.8,
                    comment: [
                        {
                            userId: 1,
                            commentText: 'Delicious',
                            userId: 2,
                            commentText: 'Delicious',
                        },
                    ],
                },
            ],
        },
    ];

    const [restaurants, setRestaurants] = useState(restaurantData);
    const [restaurant, setRestaurant] = useState(null);
    const [idRestaurant, setIdRestaurant] = useState(null);

    // Get restaurant by id
    useEffect(() => {
        restaurants.map((item) => {
            if (item.id === idRestaurant) {
                setRestaurant(item);
            }
        });
    }, [idRestaurant]);

    return (
        <restaurantsContext.Provider value={{ restaurants, restaurant, setIdRestaurant }}>
            {children}
        </restaurantsContext.Provider>
    );
}
