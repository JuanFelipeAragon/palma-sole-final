import React, { useState, useEffect } from "react";
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';

import Navbar from '../../components/navbar/navbar';
import BNavbar from '../../components/navbar/bnavbar';
import { useCart } from '../../CartContext';

// Use the environment variable directly within loadStripe
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
  const [clientSecret, setClientSecret] = useState('');
  const { cart} = useCart();

  useEffect(() => {
    // Create a Checkout Session with cart items
    fetch("http://localhost:8000/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart }), // Send cart items to the backend
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [cart]);
  
  return (
    <>
    <Navbar/>
    <div className="container ">
      <div className=" mt-5  ">
        <div className="" id="checkout">
          {clientSecret && (
            <EmbeddedCheckoutProvider
              stripe={stripePromise}
              options={{clientSecret}}
            >
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          )}
        </div>
      </div>
    </div>
    <BNavbar/>
    </>
  )
}


export default CheckoutForm;
