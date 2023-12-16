import React, { useState, useEffect } from "react";
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';

import Navbar from '../../components/navbar/navbar';
import BNavbar from '../../components/navbar/bnavbar';
import { useCart } from '../../CartContext';
import { jwtDecode } from "jwt-decode";

// Use the environment variable directly within loadStripe
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);


const CheckoutForm = () => {
  const [clientSecret, setClientSecret] = useState('');
  const { cart} = useCart();

  
  useEffect(() => {
   
  
    const userId = "3213fwessd123213sd12321"; // Replace this with your actual user ID
 
    fetch("http://localhost:8000/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cart,
        userInfo: {
          userId: userId,
          name : "john doe",
          email: "juanfelipe_aragon@hotmail.com",
          phoneNumber: "1234567890",
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => console.error('Error:', error));
  }, [cart]);
  
  
  return (
    <>
    <Navbar/>
    <div className="container ">
      <div className=" mt-5  ">
        <div className="" id="checkout" style={{color:'red'}}>
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
