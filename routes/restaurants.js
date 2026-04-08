const express = require('express');
const router = express.Router();

// GET ALL RESTAURANTS - The "DoorDash" Style Grid
router.get('/', (req, res) => {
    const stores = [
        { 
            id: 1, 
            name: "Illinois Bass & BBQ", 
            rating: 4.9, 
            eta: "25 min", 
            deliveryFee: 1.99,
            image: "https://via.placeholder.com/150" 
        },
        { 
            id: 2, 
            name: "GROE Gourmet Pizza", 
            rating: 4.7, 
            eta: "15 min", 
            deliveryFee: 0.00,
            image: "https://via.placeholder.com/150" 
        },
        { 
            id: 3, 
            name: "Stork Fast Grocery", 
            rating: 4.2, 
            eta: "10 min", 
            deliveryFee: 2.50,
            image: "https://via.placeholder.com/150" 
        }
    ];
    res.json(stores);
});

// GET MENU - Fetching items for a specific restaurant
router.get('/menu/:id', (req, res) => {
    res.json({ 
        restaurantId: req.params.id, 
        items: [
            { id: 101, name: "Executive Burger", price: 12.00, description: "GROE Premium Beef" },
            { id: 102, name: "Producer Pasta", price: 15.00, description: "Homemade Sauce" },
            { id: 103, name: "Stork Soda", price: 2.50, description: "Chilled & Refreshing" }
        ] 
    });
});

module.exports = router;
