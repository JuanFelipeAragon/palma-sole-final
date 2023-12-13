import React, { useState } from 'react';
import UserModalContent from '../user/userLogin';
import CartCanvas from '../canvas/cartCanvas';
// navbar buttons
import CartButton from './cartbutton';
import WishlistButton from './wishlistButton';
import UserButton from './userButton';

const Navbar = () => {
  
  return (
    <>
    <nav className="navbar sticky-top navbar-expand-lg bg-dark border-bottom border-body pt-2 pb-2" style={{ backgroundColor: 'black' }} data-bs-theme="dark">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        {/* Brand */}
        <a className="navbar-brand d-flex align-items-center text-white fs-4 fw-bold" href="/">
          <img
            src={"/logo2.png"}
            alt="Logo"
            width="40"
            height="40"
            className="d-inline-block align-text-top rounded-circle me-2"
          />
          Palma Sole
        </a>

        {/* Navbar toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar items */}
        <div className="collapse navbar-collapse justify-content-end align-items-center" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link text-white" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/shop">
                Shop
              </a>
            </li>
          </ul>
          {/* Buttons */}
          <div className='d-flex align-items-center'>
              {/* <WishlistButton/> */}
              <CartButton/>
              <UserButton/>
            </div>
        </div>
      </div>
    </nav>

    <UserModalContent/>
    <CartCanvas />
    </>

    
  );
};

export default Navbar;
