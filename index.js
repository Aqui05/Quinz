const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const connectDB = require('./db');
const menuRoutes = require('./routes/Menu');
const orderRoutes = require('./routes/Order');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Middleware for parsing JSON
app.use(express.json());

// Use menu routes
app.use('/api/menus', menuRoutes);

// Use order routes
app.use('/api/orders', orderRoutes);


app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
