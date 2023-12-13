import React from 'react';
import { useCart } from '../../CartContext';

const CartButton = () => {
  const { calculateTotalItems } = useCart();
  const totalItems = calculateTotalItems();

  return (
    <>
    <div className='ms-2 me-2'>
      <button type="button" 
         className="btn btn-dark position-relative p-0 m-0" 
         data-bs-toggle="offcanvas" 
         data-bs-target="#cartCanvas" 
         aria-controls="offcanvasRight" 
        >
        <i className="bi bi-bag" style={{ fontSize: '1.5rem', color: 'white' }}></i>
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {/* Display the total count */}
          {totalItems > 0 ? (
            <>
              {totalItems}
              <span className="visually-hidden">items in cart</span>
            </>
          ) : null}
        </span>
      </button>
    </div>
     
    </>
  )
}

export default CartButton;

