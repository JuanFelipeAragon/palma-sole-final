import React, { createContext, useEffect, useContext, useState } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Load cart state from localStorage on initial load
  const initialCartState = JSON.parse(localStorage.getItem('cart')) || [];
  const [cart, setCart] = useState(initialCartState);
  const [listProducts, setListProducts] = useState([]);
  const [selectedQuantities, setSelectedQuantities] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const result = await axios.get('http://localhost:8000/api/products/getAll');
      const sortedList = result.data.sort((a, b) => a.name.localeCompare(b.name));

      const listWithImages = await Promise.all(
        sortedList.map(async (product) => {
          const imageUrl = await fetchImageUrl(product.image_name);
          return { ...product, imageUrl };
        })
      );
      setListProducts(listWithImages);
    } catch (error) {
      console.error('Error fetching Products:', error);
    }
  };

  const fetchImageUrl = async (imageName) => {
    try {
      const imageUrl = `http://localhost:8000/images/${imageName}`;
      return imageUrl;
    } catch (error) {
      console.error('Error fetching image URL:', error);
      return '';
    }
  };

  const handleQuantityChange = (productId, quantity) => {
    setSelectedQuantities({ ...selectedQuantities, [productId]: quantity });
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: quantity } : item
    );
    setCart(updatedCart);
  };

  const addToCart = (productId) => {
    const productToAdd = listProducts.find((product) => product.id === productId);
    const selectedQuantity = selectedQuantities[productId] || 1;

    if (productToAdd) {
      const existingCartItem = cart.find((item) => item.id === productId);

      if (existingCartItem) {
        const updatedCart = cart.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + selectedQuantity } : item
        );
        setCart(updatedCart);
      } else {
        setCart([...cart, { ...productToAdd, quantity: selectedQuantity }]);
      }
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  const calculateTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const calculateSubtotal = (price, quantity) => {
    return price * quantity;
  };

  const totalPrice = cart.reduce((total, item) => total + calculateSubtotal(item.price, item.quantity), 0);

  // Update cart state and save to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider
      value={{ cart, setCart, removeFromCart, handleQuantityChange, listProducts, addToCart, calculateTotalItems, calculateSubtotal, totalPrice  }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};


