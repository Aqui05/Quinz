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
        const menus = await Menu.find();
        res.status(200).send(menus);
    } catch (error) {
        res.status(500).send(error);
    }
});


module.exports = router;
