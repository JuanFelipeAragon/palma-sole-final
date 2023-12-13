import React from 'react';
import { useCart } from '../../CartContext';

const CartCanvas = () => {
  const { cart, removeFromCart, totalPrice } = useCart();

  return (
    <div
      className="offcanvas offcanvas-end  text-bg-dark"
      tabIndex="-1"
      id="cartCanvas"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title text-center" id="offcanvasRightLabel">
          Cart
        </h5>
        <button
          type="button"
          className="btn-close btn-close-white"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <div className="container">
          {cart.length === 0 ? ( // Check if cart is empty
            <p className="text-center">Your cart is empty.</p>
          ) : (
            <ul className="list-group">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between lh-sm align-items-center p-3"
                >
                  <span className="text-muted">
                    <img
                      width="100"
                      height="100"
                      src={item.image}
                      alt={item.name}
                    />
                  </span>
                  <div>
                    <h6 className="my-0 mb-1">{item.name}</h6>
                    <small className="text-muted">
                      {item.quantity} × ${item.price}
                    </small>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="btn-close"
                      aria-label="Close"
                      onClick={() => removeFromCart(item.id)}
                    ></button>
                  </div>
                </li>
              ))}
              <li className="list-group-item d-flex justify-content-between">
                <span>Subtotal : </span>
                <strong>${totalPrice}</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between pt-3 pb-3">
                <a href="/cart" className="btn btn-primary btn-sm">
                  <i className="bi bi-cart2"></i> Cart
                </a>
                <a href="/checkout" className="btn btn-dark btn-sm">
                  <i className="bi bi-credit-card-2-back-fill"></i> Checkout
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartCanvas;


