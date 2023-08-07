import React, { useState } from 'react';
import { categoryContext } from './Context';
import { icons, images, SIZES, COLORS } from '../constants';

export default function CurrentLocationProvider({ children }) {
    const categoryData = [
        {
            id: 1,
            name: 'Rice',
            icon: icons.rice_bowl,
        },
        {
            id: 2,
            name: 'Noodles',
            icon: icons.noodle,
        },
        {
            id: 3,
            name: 'Hot Dogs',
            icon: icons.hotdog,
        },
        {
            id: 4,
            name: 'Salads',
            icon: icons.salad,
        },
        {
            id: 5,
            name: 'Burgers',
            icon: icons.hamburger,
        },
        {
            id: 6,
            name: 'Pizza',
            icon: icons.pizza,
        },
        {
            id: 7,
            name: 'Snacks',
            icon: icons.fries,
        },
        {
            id: 8,
            name: 'Sushi',
            icon: icons.sushi,
        },
        {
            id: 9,
            name: 'Desserts',
            icon: icons.donut,
        },
        {
            id: 10,
            name: 'Drinks',
            icon: icons.drink,
        },
    ];

    const [category, setCategory] = useState(categoryData);

    return <categoryContext.Provider value={category}>{children}</categoryContext.Provider>;
}
