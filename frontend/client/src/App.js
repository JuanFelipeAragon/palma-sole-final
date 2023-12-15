import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Shop from './pages/shop/shop';
import Cart from './pages/cart/cart';

import { MainPage } from './pages/main/mainPage';
import CreateProduct from './pages/create/createproduct';
import UpdateProduct from './pages/update/updateproduct';
import { ListProducts } from './pages/list/listproducts';
import ProductDetails from './pages/product/productDetail';

import CheckoutForm from './pages/checkout/checkoutForm';
import ReturnPage from './pages/checkout/checkoutReturn'
import CheckoutSuccessPage from "./pages/checkout/CheckoutSuccessPage";
import NotFound from "./pages/notfound/notFound";
import { CartProvider } from './CartContext';


const App = () => {
  
  return (
    <div className='container-fluid vh-100 p-0'>
      
      {/* Other routes or components */}
      <CartProvider>
        <Router>
          <Routes>
            {/*user routes  */}
            <Route path='/' element={<MainPage />} />
            <Route path='/shop/*' element={<Shop />} />
            <Route path='/cart' element={<Cart />} />
            <Route path="/checkout" element={<CheckoutForm />} />
            <Route path="/return" element={<ReturnPage/>} />
            <Route path="/checkout-success" element={<CheckoutSuccessPage />} />
            <Route path="/product/:productID" element={<ProductDetails />} />
            {/* admin routes */}
            <Route path='/adminpanel/productslist' element={<ListProducts />} />
            <Route path='/product/add' element={<CreateProduct />} />
            <Route path='/product/update/:productID' element={<UpdateProduct />} />
           
            {/* for all pages except the one that is here */}
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Router>
      </CartProvider>
    </div>
  );
};

export default App;