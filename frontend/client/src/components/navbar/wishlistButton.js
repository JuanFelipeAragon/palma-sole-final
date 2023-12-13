import React, { useState } from 'react';

const WishlistButton = () => {
  const [wishlistCount, setWishlistCount] = useState(5);

  // Add functionality to update wishlistCount as needed

  return (
    <div className='me-2'>
      <button type="button" className="btn btn-dark position-relative p-0 m-0">
        <i className="bi bi-heart-fill" style={{ fontSize: '1.5rem', color: 'white' }}></i>
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {wishlistCount > 0 ? (
            <>
              {wishlistCount}
              <span className="visually-hidden">items in wishlist</span>
            </>
          ) : null}
        </span>
      </button>
    </div>
  )
}

export default WishlistButton;
