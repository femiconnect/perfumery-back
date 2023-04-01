const stripeAPI = require('stripe')(process.env.SECRET_KEY);

module.exports = stripeAPI;

//stripeAPI is a stripe object instantiated in line 1. It will be used to make API calls to Stripe service
