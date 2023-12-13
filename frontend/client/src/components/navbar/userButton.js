import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userLoggedIn = localStorage.getItem('isLogged');
    setIsLoggedIn(!!userLoggedIn); // Convert the value to a boolean
  }, []);

  // Replace adminAllowed logic with your admin access verification
  const adminAllowed = isLoggedIn; // This is a placeholder; replace it with your logic

  const logoutUser = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('isLogged');
    window.location.reload(); // Refresh the page
  };

  return (
    <div className='ms-2 me-3 position-relative'>
      <div className="btn-group">
      {/* button */}
        <button 
          type="button" 
          className="btn btn-dark p-0 m-0 dropdown-toggle" 
          data-bs-toggle={isLoggedIn ? 'dropdown' : 'modal'}
          data-bs-target="#userLogin"
        >
          <i className="bi bi-person-fill" style={{ fontSize: '1.5rem', color: 'white' }}></i>
        </button>

        {/* Dropdown menu */}
        <ul className="dropdown-menu dropdown-menu-lg-end bg-dark" >
          <li><a className="dropdown-item" href="/link1">Orders</a></li>
          {/* Show admin panel link if admin access is allowed */}
          {adminAllowed && <li><a className="dropdown-item" href="/adminpanel/productslist">Admin Panel</a></li>}
          <li><a className="dropdown-item" href="/link1">Wishlist</a></li>
          <li><hr className="dropdown-divider"/></li>
          <li>
            <a className="dropdown-item" onClick={logoutUser}>
              Logout
            </a>
          </li>
          {/* Add more items as needed */}
        </ul>
      </div>
    </div>
  )
}

export default UserButton;
