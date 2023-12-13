import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Shop from './pages/shop/shop';
import Cart from './pages/cart/cart';

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { MainPage } from './pages/main/mainPage';
import CreateProduct from './pages/create/createproduct';
import UpdateProduct from './pages/update/updateproduct';
import { ListProducts } from './pages/list/listproducts';
import ProductDetails from './pages/product/productDetail';
import CheckoutPage from './pages/checkout/checkoutPage';
import { CartProvider } from './CartContext';

import CheckoutForm from './pages/payment-stripe/CheckoutForm';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_live_51OMvuBCQQGfe7j4QEK1mwo8vVQXb5r4mrtNT1eH0SqwvyjdbVZER6IOWSYPMog5i9fB3dGdB8QHWMlHHafKqmHBL00e5TXVbEa");

const App = () => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => console.error("Error fetching clientSecret:", error));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className='container-fluid vh-100 p-0'>
      {clientSecret ? (
        <Elements stripe={stripePromise}>
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      ) : (
        <p>Loading...</p>
      )}
      {/* Other routes or components */}
      <CartProvider>
        <Router>
          <Routes>
            {/*user routes  */}
            <Route path='/' element={<MainPage />} />
            <Route path='/shop/*' element={<Shop />} />
            <Route path='/cart' element={<Cart />} />
            {/* <Route path='/checkout' element={<CheckoutPage/>} /> */}
            <Route path="/product/:productID" element={<ProductDetails />} />
            {/* admin routes */}
            <Route path='/adminpanel/productslist' element={<ListProducts />} />
            <Route path='/product/add' element={<CreateProduct />} />
            <Route path='/product/update/:productID' element={<UpdateProduct />} />
           
          </Routes>
        </Router>
      </CartProvider>
    </div>
  );
};

export default App;