const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_KEY);

// CREATE ORDER - This starts the payment process
router.post('/create_order', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: req.body.items, 
            mode: 'payment',
            success_url: 'https://stork-main.onrender.com?success=true',
            cancel_url: 'https://stork-main.onrender.com?canceled=true',
        });
        
        // This URL is what sends the customer to the Stripe payment page
        res.json({ url: session.url });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// UPDATE STATUS - For when the food is "Out for Delivery"
router.post('/update_status', (req, res) => {
    const { orderId, status } = req.body;
    res.json({ 
        message: `Order #${orderId} status updated to: ${status}`,
        updatedBy: "STORK Logistics Engine"
    });
});

module.exports = router;
