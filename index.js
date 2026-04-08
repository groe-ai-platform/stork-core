const express = require('express');
const app = express();
const stripe = require('stripe')(process.env.STRIPE_KEY);

// STORK ENGINE ROUTES
const authRoutes = require('./routes/auth');
const restaurantRoutes = require('./routes/restaurants');
const orderRoutes = require('./routes/orders');

// Middleware to process payments and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// PLUG IN THE NEW STORK ENGINES
app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/orders', orderRoutes);

// Global stats for the Mission Control dashboard
let stats = { donated: 0, miles: 0, lives: 0, gross: 0 };

// Main Route: The Mission Control Website
app.get('/', (req, res) => {
    res.send(`
        <body style="background:#ffffff;color:#1a1a1a;text-align:center;font-family:sans-serif;padding:50px;">
            <img src="https://groentertainment.com/edited-image.png" alt="STORK" style="width:300px;margin-bottom:20px;">
            <h1 style="color:#0056b3;margin:0;letter-spacing:1px;text-transform:uppercase;">STORK MISSION CONTROL</h1>
            <p style="opacity:0.7;font-weight:bold;color:#444;">EXECUTIVE PRODUCER: MR. COLLINS</p>
            
            <div style="display:flex;justify-content:center;gap:20px;margin-top:30px;">
                <div style="border:2px solid #238636;padding:20px;border-radius:12px;background:#f6f8fa;min-width:180px;">
                    <h2 style="margin:0;color:#238636;font-size:0.8em;">LIVES SAVED</h2>
                    <span style="font-size:2.5em;font-weight:bold;">${stats.lives}</span>
                </div>
                <div style="border:2px solid #0056b3;padding:20px;border-radius:12px;background:#f6f8fa;min-width:180px;">
                    <h2 style="margin:0;color:#0056b3;font-size:0.8em;">ABBI WALLET</h2>
                    <span style="font-size:2.5em;font-weight:bold;">$${stats.donated.toFixed(2)}</span>
                </div>
            </div>

            <div style="margin-top:40px;">
                <form action="/create-checkout-session" method="POST">
                    <button type="submit" style="background:#238636;color:white;padding:20px 40px;border:none;border-radius:50px;font-size:1.2em;font-weight:bold;cursor:pointer;box-shadow:0 10px 20px rgba(35,134,54,0.3);">
                        ORDER NOW ($25.00 TEST)
                    </button>
                </form>
            </div>
            <p style="margin-top:20px;font-size:0.8em;color:#888;">GROE Entertainment, Inc. | Illinois Division</p>
        </body>
    `);
});

// Original Stripe Checkout Route (Legacy)
app.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [{
                price_data: { 
                    currency: 'usd', 
                    product_data: { name: 'STORK DELIVERY TEST' }, 
                    unit_amount: 2500 
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: 'https://stork-main.onrender.com?success=true',
            cancel_url: 'https://stork-main.onrender.com?cancel=true',
        });
        res.redirect(303, session.url);
    } catch (err) {
        res.status(500).send(`Stripe Error: ${err.message}`);
    }
});

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`STORK ENGINE ONLINE ON PORT ${PORT}`);
});
