const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Menu = require('../models/Menu');
const { v4: uuidv4 } = require('uuid'); // Pour générer un reçu unique


const mongoose = require('mongoose');

// Fonction pour formater le prix
const formatPrice = (price) => {
    return price.toFixed(2);
};

// Fonction pour générer le reçu
const generateReceipt = async (order) => {
    let receiptText = '';
    
    // En-tête du reçu
    receiptText += '==================================\n';
    receiptText += '           REÇU DE COMMANDE       \n';
    receiptText += '==================================\n\n';
    
    // Numéro de commande et date
    receiptText += `Commande #: ${order._id}\n`;
    receiptText += `Date: ${order.date.toLocaleString()}\n\n`;
    
    // Détails des articles
    receiptText += 'Articles:\n';
    receiptText += '--------------------------------\n';
    
    for (const item of order.items) {
        const menuItem = await mongoose.model('Menu').findById(item.menuItem);
        receiptText += `${menuItem.name} x${item.quantity}\n`;
        receiptText += `  Prix unitaire: $${formatPrice(menuItem.price)}\n`;
        receiptText += `  Sous-total: $${formatPrice(menuItem.price * item.quantity)}\n\n`;
    }
    
    receiptText += '--------------------------------\n';
    
    // Total
    receiptText += `TOTAL: $${formatPrice(order.total)}\n\n`;
    
    // Numéro de reçu unique
    receiptText += `Numéro de reçu: ${uuidv4()}\n`;
    
    // Pied de page
    receiptText += '==================================\n';
    receiptText += '       Merci de votre achat !     \n';
    receiptText += '==================================\n';
    
    return receiptText;
};

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
            receipt: uuidv4()
        });

        // Enregistrer la commande dans la base de données
        await newOrder.save();

        // Générer le reçu
        const receiptText = await generateReceipt(newOrder);

        // Répondre avec la commande nouvellement créée
        res.status(201).json({
            Order: newOrder,
            receipt: receiptText
    });
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create order' });
    }
});


//liste order
router.get('/', async(req, res) => {
    try {
            const orders = await Orders.find();
            res.status(200).send(orders);
        } catch (error) {
            res.status(500).send(error);
        }
})



module.exports = router;
