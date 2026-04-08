const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// 1. THE BRIDGE: This tells the server to show your DoorDash-style UI
app.use(express.static('public'));
app.use(express.json());

// 2. THE MENU: Your Live Restaurant Data
app.get('/api/restaurants', (req, res) => {
    res.json([
        {
            id: 1,
            name: "Illinois Bass & BBQ",
            rating: 4.9,
            eta: "25 min",
            deliveryFee: 1.99,
            image: "https://images.unsplash.com/photo-1544025162-d76694265947"
        },
        {
            id: 2,
            name: "GROE Gourmet Pizza",
            rating: 4.7,
            eta: "15 min",
            deliveryFee: 0,
            image: "https://images.unsplash.com/photo-1513104890138-7c749659a591"
        },
        {
            id: 3,
            name: "Stork Fast Grocery",
            rating: 4.2,
            eta: "10 min",
            deliveryFee: 2.50,
            image: "https://images.unsplash.com/photo-1542838132-92c53300491e"
        }
    ]);
});

// 3. THE CHECKOUT: Secure Order Logic
app.post('/api/orders', (req, res) => {
    const { item, address } = req.body;
    console.log(`STORK Order Received: ${item} to ${address}`);
    res.status(200).json({ success: true, message: "STORK is on the way!" });
});

// 4. THE HEARTBEAT: Start the Engine
app.listen(PORT, () => {
    console.log(`STORK ENGINE ONLINE ON PORT ${PORT}`);
});
