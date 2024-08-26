const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, trim: true },
    availability: { type: Boolean, default: true },
    image: { type: String, required: true, trim: true },
    }, { timestamps: true });

module.exports = mongoose.model('Menu', MenuSchema);
