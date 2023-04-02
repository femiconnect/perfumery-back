const stripeAPI = require('./stripe.js');

//function to create a checkout session
async function createCheckoutSession(req, res) {
   const domainUrl = process.env.WEB_APP_FRONTEND_URL; //url the ftontend app as deployed to
   const { line_items, customer_email } = req.body;

   console.log(line_items, customer_email);

   //check if req body has both line_items and customer_email
   if (!line_items || !customer_email) {
      return res
         .status(400)
         .json({ error: 'missing required session parameters' });
   }

   let session;

   try {
      //make a call to the stripeAPI  to create a checkout session
      session = await stripeAPI.checkout.sessions.create({
         payment_method_types: ['card'],
         mode: 'payment',
         line_items,
         customer_email,
         success_url: `${domainUrl}/checkout-successful?session_id={CHECKOUT_SESSION_ID}`, //redirect user back to client
         cancel_url: `${domainUrl}/checkout-cancelled`, //redirect user back to client
      });

      res.status(200).json({ sessionId: session.id });
      //res.status(200).json(session.url);
   } catch (error) {
      console.log(error);
      res.status(400).json({
         error: 'An error occured, unable to create Stripe session',
      });
   }
}

module.exports = createCheckoutSession;

//This file contains the function to create Stripe checkout function
