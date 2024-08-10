const mongoose = require('mongoose');

// Table des commandes
const OrderSchema = new mongoose.Schema({
    items: [{ 
        menuItem: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Menu', 
            required: true 
        },
        quantity: { 
            type: Number, 
            required: true, 
            min: 1 // Assurez-vous que la quantité est au moins 1
        }
    }],
    total: { 
        type: Number, 
        required: true 
    },
    status: { 
        type: String, 
        default: 'pending', 
        enum: ['pending', 'delivered', 'cancelled'] 
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
    receipt: { 
        type: String, 
        required: true 
    },
});

// Exporter le modèle Order
module.exports = mongoose.model('Order', OrderSchema);
