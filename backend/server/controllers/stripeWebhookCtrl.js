import stripe from 'stripe';
import dotenv from 'dotenv';
import Order from '../models/orderModel.js';


// this whole thing needs to be fixed, it doesnt work


dotenv.config();

const handleWebhook = async (req, res) => {
  let data;
  let eventType;

  // Retrieve the webhook secret from your environment variables
  const webhookSecret = process.env.WEBHOOK_SECRET;

  // Retrieve the raw body of the request
  const rawBody = req.rawBody; // Access the raw body directly from the request

  // Check if webhook signing is configured
  const sig = req.headers['stripe-signature'];

  try {
    // Construct the event using the raw body as Buffer
    const event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);

    // Extract data from the event
    data = event.data.object;
    eventType = event.type;
  } catch (err) {
    console.log(`⚠️  Webhook signature verification failed:  ${err}`);
    return res.sendStatus(400);
  }

  // Handle the checkout.session.completed event
  if (eventType === 'checkout.session.completed') {
    try {
      const customer = await stripeInstance.customers.retrieve(data.customer);
      // CREATE ORDER
      await createOrder(customer, data);
    } catch (err) {
      console.error('Error creating order:', err);
      return res.status(500).send('Error creating order');
    }
  }

  res.status(200).end();
};

const createOrder = async (customer, data) => {
  // Your order creation logic using customer and session data
  // For example:
  const Items = JSON.parse(customer.metadata.cart);

  const products = Items.map((item) => {
    return {
      productId: item.id,
      quantity: item.cartQuantity,
    };
  });

  const newOrder = new Order({
    userId: customer.metadata.userId,
    customerId: data.customer,
    paymentIntentId: data.payment_intent,
    products,
    subtotal: data.amount_subtotal,
    total: data.amount_total,
    shipping: data.customer_details,
    payment_status: data.payment_status,
  });

  try {
    const savedOrder = await newOrder.save();
    console.log('Processed Order:', savedOrder);
  } catch (err) {
    console.log(err);
  }
};

export { handleWebhook };
