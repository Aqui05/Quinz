const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Menu = require('../models/Menu');
const { v4: uuidv4 } = require('uuid'); // Pour générer un reçu unique

// Ajouter une nouvelle commande
router.post('/add', async (req, res) => {
    try {
        const { items } = req.body;

        // Vérifier si les items sont présents
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'Items are required and should be an array' });
        }

        let total = 0;

        // Calculer le total en fonction des items
        for (const item of items) {
            const menuItem = await Menu.findById(item.menuItem);

            if (!menuItem) {
                return res.status(404).json({ error: `Menu item with ID ${item.menuItem} not found` });
            }

        total += menuItem.price * item.quantity;
        }

        // Générer un reçu unique
        const receipt = uuidv4();

        // Créer une nouvelle commande
        const newOrder = new Order({
            items,
            total,
            receipt
        });

        // Enregistrer la commande dans la base de données
        await newOrder.save();

        // Répondre avec la commande nouvellement créée
        res.status(201).json(newOrder);
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create order' });
    }
});

module.exports = router;
