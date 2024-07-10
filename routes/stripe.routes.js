const stripe = require('stripe')('key_test_51J3');
module.exports = app => {
// Endpoint pour créer un paiement
    app.post('/create-payment-intent', async (req, res) => {
        const {amount, currency} = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: currency,
        });

        res.json({clientSecret: paymentIntent.client_secret});
    });
}
