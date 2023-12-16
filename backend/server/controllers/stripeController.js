import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const YOUR_DOMAIN = process.env.CLIENT_URL;

const createSession = async (req, res) => {
  const { cart, userInfo } = req.body;
  const { userId, name , email, phoneNumber } = userInfo;

 

  
  const line_items = cart.map((item) => {
    console.log(item.image)
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          // images: [item.image],
          description: item.description,
          metadata: {
            id: item.id,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
  });
  // console.log (line_items[0].price_data.product_data.images);
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: line_items,
    mode: 'payment',
    shipping_address_collection: {
      allowed_countries: ["US", "CA","CO"],
    },
    return_url: `${YOUR_DOMAIN}/shop`,
    automatic_tax: { enabled: true },
    phone_number_collection: {
      enabled: true,
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "usd",
          },
          display_name: "Free shipping",
          // Delivers between 5-7 business days
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 1500,
            currency: "usd",
          },
          display_name: "Next day air",
          // Delivers in exactly 1 business day
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        },
      },
    ],
   
  });

  res.send({ clientSecret: session.client_secret });
};


const sessionStatus = async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  res.send({
    status: session.status,
    customer_email: session.customer_details.email,
  });
};

export { createSession, sessionStatus };

