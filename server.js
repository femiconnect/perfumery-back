const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: './.env' }); //.env loads the environment variables
const createCheckoutSession = require('./checkout.js');

const app = express();

app.use(express.json());

app.use(cors({ origin: true }));

app.get('/', (req, res) => {
   res.send(
      'Welcome to Perfumery e-shop backend for Stripe payment implementation.... '
   );
});

app.post('/create-checkout-session', createCheckoutSession);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
