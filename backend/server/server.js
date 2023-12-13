import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './config/database.js';

// This is your test secret API key.
import Stripe from 'stripe';

const stripe = new Stripe('pk_live_51OMvuBCQQGfe7j4QEK1mwo8vVQXb5r4mrtNT1eH0SqwvyjdbVZER6IOWSYPMog5i9fB3dGdB8QHWMlHHafKqmHBL00e5TXVbEa');


import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import * as AdminJSMongoose from '@adminjs/mongoose'

import * as userRoutes from './routes/userRoutes.js';
import * as productsRoutes from './routes/productRoutes.js';

import User from './models/userModel.js';
import Product from './models/productModel.js';

import path from "path";

const app = express();
app.use(cors());
connectToDatabase();
app.use(express.static("public"));
app.use(express.json());
app.use(userRoutes.router);
app.use(productsRoutes.router);


AdminJS.registerAdapter(AdminJSMongoose)
const adminJs = new AdminJS({
    resources: [User, Product],
    rootPath: '/admin',
});


const router = AdminJSExpress.buildRouter(adminJs);
app.use(adminJs.options.rootPath, router);

const __dirname = path.resolve();
app.use('/images', express.static(path.join(__dirname, 'public')));


const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});


app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
