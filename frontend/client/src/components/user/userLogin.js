import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import './user.css'; // Import your CSS file for styles

import UserRegister from './userRegister';

const UserLogin = () => {

  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const [userFirstName, setUserFirstName] = useState('');
  

  useEffect(() => {
    // Check if user is logged in
    const isUserLogged = localStorage.getItem('isLogged') === 'true';
    if (isUserLogged) {
      // Get user info and set user's name
      const jwtToken = localStorage.getItem('jwt');
      axios.get('http://localhost:8000/api/user/profile', {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
        .then(response => {
          setUserFirstName(response.data.first_name);
        })
        .catch(error => {
          console.error('Error fetching user info:', error);
        });
    }
  }, []);

  const loginUser = async () => {
    if (!emailLogin || !passwordLogin) {
      alert('Llene el formulario de Login');
      return;
    }

    const obj = {
      email: emailLogin,
      password: passwordLogin,
    };

    try {
      const result = await axios.post('http://localhost:8000/api/user/login', obj);
      localStorage.setItem('jwt', result.data);
      localStorage.setItem('isLogged', true);
      window.location.reload(); // Refresh the page
    } catch (e) {
      alert('Usuario o contraseña invalidos');
    }
  };

  return (
    <>
    <div className="modal fade" id="userLogin" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" data-bs-theme="light" >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={{backgroundColor:'white'}}>
          <div className="modal-header modal-header-custom">
            {/* <h1 className="modal-title fs-5 " id="exampleModalLabel"></h1> */}
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body modal-body-custom"  style={{backgroundColor:'white'}}>
            <label className='mt-3'>Email : </label>
            <input type="email" className="form-control mb-3 mt-3" name="emailLogin" value={emailLogin} onChange={(e) => setEmailLogin(e.target.value)} />
            <label>Password : </label>
            <input type="password" className="form-control mt-3 mb-3" name="passwordLogin" value={passwordLogin} onChange={(e) => setPasswordLogin(e.target.value)} />
            <div className='mb-3 mt-3'>
              <a className=" " href="/forgotpassword" role="button">Forgot Password?</a>
            </div>
            
          </div>
          <div className="modal-footer d-flex justify-content-center align-items-center">
            <button className="btn btn-dark " data-bs-target="#userRegister" data-bs-toggle="modal" >Create Account</button>
            <button className="btn btn-primary  ps-3 pe-3 " onClick={loginUser}>Login</button>
          </div>
        </div>
      </div>
    </div>
     <UserRegister/>
    </>
  );
};

export default UserLogin
