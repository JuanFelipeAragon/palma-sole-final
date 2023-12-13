import React, { useState } from 'react';
import Navbar from '../../components/navbar/navbar';
import BNavbar from '../../components/navbar/bnavbar';
import { useCart } from '../../CartContext';

const CheckoutPage = () => {
  const { cart, calculateSubtotal, totalPrice } = useCart();
  const [userDetails, setUserDetails] = useState({
    name: '',
    address: '',
    city: '',
    country: '',
  });

  const handleInputChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid mt-5">
        <div className="card">
          <div className="card-body">
            <div className="row">
            <div className="col-md-6 mb-3">
      <div className="card">
        <h5 className="card-header text-bg-dark">Order's Details</h5>
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="nameInput" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="nameInput"
              name="name"
              value={userDetails.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="addressInput" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="addressInput"
              name="address"
              value={userDetails.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="row g-3">
            <div className="col-md-6 mb-3">
              <label htmlFor="cityInput" className="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control"
                id="cityInput"
                name="city"
                value={userDetails.city}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="countryInput" className="form-label">
                Country
              </label>
              <input
                type="text"
                className="form-control"
                id="countryInput"
                name="country"
                value={userDetails.country}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="emailInput" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="emailInput"
              name="email"
              value={userDetails.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phoneInput" className="form-label">
              Phone Number
            </label>
            <input
              type="tel"
              className="form-control"
              id="phoneInput"
              name="phone"
              value={userDetails.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="shippingMethodSelect" className="form-label">
              Shipping Method
            </label>
            <select
              className="form-select"
              id="shippingMethodSelect"
              name="shippingMethod"
              value={userDetails.shippingMethod}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="standard">Standard Shipping</option>
              <option value="express">Express Shipping</option>
              {/* Add more shipping options if needed */}
            </select>
          </div>
          {/* Additional fields can be added as needed */}
        </div>
      </div>
    </div>

              <div className="col-md-6 mb-3">
                <div className="card">
                  <h5 className="card-header text-bg-dark">Your Cart</h5>
                  <div className="card-body">
                    <div className="container">
                      <ul className="list-group">
                        {cart.length === 0 ? (
                          <li className="list-group-item text-center">
                            Your cart is empty.
                          </li>
                        ) : (
                          <>
                            {/* Render cart items */}
                            {cart.map((item) => (
                              <li
                                key={item.id}
                                className="list-group-item d-flex justify-content-between lh-sm align-items-center p-3"
                              >
                                <div className="fw-normal">
                                  {item.name} ×{' '}
                                  <span className="fw-bold">
                                    {item.quantity}
                                  </span>
                                </div>
                                <div>
                                  ${calculateSubtotal(item.price, item.quantity)}
                                </div>
                              </li>
                            ))}
                            <li className="list-group-item d-flex justify-content-between">
                              <span>Subtotal : </span>
                              <span>${totalPrice}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between">
                              <span>Delivery : </span>
                              <span>$10</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between">
                              <span className="fw-bold">Total: </span>
                              <span className="fw-bold">
                                ${totalPrice + 10}
                              </span>
                            </li>
                            <li className="list-group-item d-flex justify-content-center">
                              <a
                                href="/checkout"
                                className="btn btn-dark ps-4 pe-4"
                              >
                                <i className="bi bi-credit-card-2-back-fill me-2"></i>{' '}
                                Pay
                              </a>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BNavbar />
    </>
  );
};

export default CheckoutPage;
