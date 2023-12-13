import React from 'react';

const BNavbar = () => {
  return (
    <nav className="navbar fixed-bottom navbar-expand-lg bg-dark border-bottom border-body  mt-5"  data-bs-theme="dark">
      <div className="container-fluid d-flex justify-content-center">
        <div className=' col-sm-12 col-lg-6 d-flex justify-content-center'>
          <a className='text-decoration-none pe-2 d-block mb-2 ' href='https://www.instagram.com/palmasole_/'>
            <img src="https://cdn.shopify.com/s/files/1/0245/9795/4634/files/logo-instagram.png?v=1653504815" alt="logo-instagram"/>
            <span className='text-white '> palmasole_</span>
          </a>
          <a className='text-decoration-none ps-2 d-block' href="https://wa.me/+573147987005" >
            <img src="https://cdn.shopify.com/s/files/1/0245/9795/4634/files/logo-whatsapp.png?v=1653507216" alt="logo-whatsapp"/>
            <span className='text-white '> +57 314 555 4123</span>
          </a>
        </div>
        <div className='text-white col-sm-12 col-lg-6 d-flex justify-content-center'>
          <div className="mb-0">Copyright © 2023 Palma Sole</div>
        </div>
      </div>
    </nav>
  );
};

export default BNavbar;

