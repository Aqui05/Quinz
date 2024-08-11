const express = require('express');
const connectDB = require('./db');
const menuRoutes = require('./routes/Menu');
const orderRoutes = require('./routes/Order');

const app = express();
const port = 4000;

// Connect to MongoDB
connectDB();

// Middleware for parsing JSON
app.use(express.json());

// Use menu routes
app.use('/api/menus', menuRoutes);

// Use order routes
app.use('/api/orders', orderRoutes);

// Start the server on port 3000


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
