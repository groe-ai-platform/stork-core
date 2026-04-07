const express = require('express');
const app = express();
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc'); // Replace with your Live Key later
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let stats = { donated: 0, miles: 0, lives: 0, gross: 0 };

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
        </body>
    `);
});

app.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [{
            price_data: { currency: 'usd', product_data: { name: 'STORK DELIVERY TEST' }, unit_amount: 2500 },
            quantity: 1,
        }],
        mode: 'payment',
        success_url: 'https://groentertainment.com/',
        cancel_url: 'https://groentertainment.com/',
    });
    res.redirect(303, session.url);
});

app.listen(process.env.PORT || 3000, () => console.log('STORK PRODUCTION READY.'));
