import React from 'react';
import { useCart } from '../../CartContext';
import Navbar from '../../components/navbar/navbar';
import BNavbar from '../../components/navbar/bnavbar';

const Cart = () => {
  const { cart, removeFromCart, handleQuantityChange, calculateSubtotal, totalPrice } = useCart();


  return (
    <>
    <Navbar/>
      {/* shopping cart */}
      <div className='container-fluid d-flex justify-content-center'>
        <div className='card col-11 mb-5 mt-3'>
          <div className='card-header text-bg-dark'>Shopping Cart</div>
          <div className='card-body d-flex flex-sm-column flex-lg-row justify-content-between'>
            {cart.length === 0 ? (
              <p className="text-center">Your cart is empty!</p>
            ) : (
              <div className='table-responsive col-sm-12 col-lg-9'>
                <table className='table table-borderless table-sm align-middle'>
                  <thead>
                    <tr className='align-center text-center'>
                      <th className='col-2'>Image</th>
                      <th className='col-2'>Name</th>
                      <th className='col-2'>Price</th>
                      <th className='col-2'>Quantity</th>
                      <th className='col-2'>Subtotal</th>
                      <th className='col-2'>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    {cart.map((item) => (
                      <tr key={item.id} className='align-center text-center'>
                        <td>
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{ maxWidth: '100px' }}
                          />
                        </td>
                        <td className=''>{item.name}</td>
                        <td className=''>{item.price} USD</td>
                        <td className='col'>
                        <input
                            type="number"
                            className='form-control'
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                            min="1"
                          />
                        </td>
                        <td className=''>{calculateSubtotal(item.price, item.quantity)}</td>
                        <td className=''>
                          <button className='btn btn-dark mb-1 ps-3 pe-3'>
                            View
                          </button>
                          <button className='btn btn-danger' onClick={() => removeFromCart(item.id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {/* right side */}
            <div className="card col-sm-12 col-md-12 col-lg-3" style={{ maxHeight: '240px' }}>
              <div className="card-header text-bg-dark">
                Cart's Total
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item fw-bold d-flex justify-content-between">
                  Subtotal:
                  <span className='fw-normal'>${totalPrice}</span>
                </li>
                <li className="list-group-item fw-bold d-flex justify-content-between">
                  Envio:
                  <span className='fw-normal'>$10</span>
                </li>
                <li className="list-group-item fw-bold d-flex justify-content-between">
                  Total:
                  <span className='fw-normal'>${totalPrice + 10}</span>
                </li>
                <button className='btn btn-dark m-3'><i class="bi bi-credit-card-2-back-fill"></i> Checkout</button>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <BNavbar/>
    </>
  );
};

export default Cart;

