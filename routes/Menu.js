const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu');

// Create a new menu item
router.post('/add', async (req, res) => {
    try {
        const menu = new Menu(req.body);
        await menu.save();
        res.status(201).send(menu);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all menu items
router.get('/', async (req, res) => {
    try {
        //await Menu.findByIdAndDelete('66cc5d741a0475ddd20e6c82');
        const menus = await Menu.find();
        if (menus.length === 0) {
            return res.status(404).json({ message: "No menus found" });
        }
        res.status(200).json(menus);
        } catch (error) {
        console.error('Error fetching menus:', error);
        res.status(500).json({ message: "Internal server error", error: error.message });
        }
    });


module.exports = router;
