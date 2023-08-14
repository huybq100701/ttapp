const Restaurant = require('../model/Restaurant');
const Menu = require('../model/Menu');
const Cart = require('../model/Cart');
const mongoose = require('mongoose');

const RestaurantController = {
    create: async (req, res) => {
        try {
            const newRestaurant = await Restaurant.create(req.body);
            return res.status(200).json({
                message: 'Tạo restaurant thành công',
                restaurant: newRestaurant,
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Server error',
                error: error,
            });
        }
    },

    getAllRestaurants: async (req, res) => {
        try {
            const restaurants = await Restaurant.find();
            return res.status(200).json({
                message: 'Lấy restaurants thành công',
                restaurants: restaurants,
            })

        } catch (error) {
            return res.status(500).json({
                message: 'Server error',
                error: error,
            });
        }
    },

    getRestaurantById: async (req, res) => {
        try {
            const restaurant = await Restaurant.findById(req.params.id);
            return res.status(200).json({
                message: 'Lấy restaurants thành công',
                restaurant,
            })

        } catch (error) {
            return res.status(500).json({
                message: 'Server error',
                error: error,
            });
        }
    },

    getAllRestaurantsByQuery: async (req, res) => {
        try {
            const { query } = req.query;
            const regex = new RegExp(query, 'i')
            const restaurants = query === '' ? await Restaurant.find() : await Restaurant.find({name: {$regex: regex}});
            return res.status(200).json({
                message: 'Lấy restaurants thành công',
                restaurants: restaurants,
            })

        } catch (error) {
            return res.status(500).json({
                message: 'Server error',
                error: error,
            });
        }
    },

    getRestaurantMenu: async (req, res) => {
        try {
            const { id } = req.params;
            const restaurant = await Restaurant.findById(id);
            const menu = await Menu.find({ restaurantId: id })
            const result = {
                restaurant,
                menu
            }
            return res.status(200).json({
                message: 'Lấy restaurant thành công',
                data: result,
            })

        } catch (error) {
            return res.status(500).json({
                message: 'Server error',
                error: error,
            });
        }
    },

};

module.exports = RestaurantController;
