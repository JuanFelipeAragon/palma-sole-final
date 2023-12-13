import React, { useState } from 'react';
import axios from 'axios';

const UserRegister = () => {

    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [emailRegister, setEmailRegister] = useState('');
    const [passwordRegister, setPasswordRegister] = useState('');
    const [confirmPasswordRegister, setConfirmPasswordRegister] = useState('');

    const registerUser = async () => {
        if (!first_name || !last_name || !emailRegister || !passwordRegister || !confirmPasswordRegister) {
          alert('Llene el formulario de registro');
          return;
        }
    
        if (passwordRegister !== confirmPasswordRegister) {
          alert('Las contraseñas no son iguales');
          return;
        }
    
        try {
          const obj = {
            first_name: first_name,
            last_name: last_name,
            email: emailRegister,
            password: passwordRegister,
          };
    
          const response = await axios.post('http://localhost:8000/api/user/register', obj);
          if (response.status !== 200) {
          
           
            return;
          }
    
          console.log('Account Created');
          window.location.reload(); // Refresh the page                                                                                                                                                                                                                                                                
        } catch (e) {
          console.log(e.response.data.message);
      
        }
      };
    


    return (

    <div className="modal fade" id="userRegister" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-header ">
          
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
    
                    <label className='mt-2 mb-2'>First Name :</label>
                    <input
                        type="text"
                        className="form-control mb-3"
                        value={first_name}
                        onChange={(e) => setFirstName(e.target.value)}
                        name="first_name" // Add name attribute corresponding to the backend field name
                      />

                    <label className='mt-2 mb-2'>Last Name</label>
                    <input
                        type="text"
                        className="form-control mb-3"
                        value={last_name}
                        onChange={(e) => setLastName(e.target.value)}
                        name="last_name" // Add name attribute corresponding to the backend field name
                      />
                    <label className=' mb-2'>Email :</label>
                    <input type="email" className="form-control mb-3" value={emailRegister} onChange={(e) => setEmailRegister(e.target.value)} />

                    <label className=' mb-2'>Password :</label>
                    <input type="password" className="form-control mb-3" value={passwordRegister} onChange={(e) => setPasswordRegister(e.target.value)} />

                    <label className=' mb-2'>Confirm Password : </label>
                    <input type="password" className="form-control mb-3" value={confirmPasswordRegister} onChange={(e) => setConfirmPasswordRegister(e.target.value)} />

                    <div className='d-flex justify-content-center'>
                    </div> 
                    <div className="modal-footer d-flex justify-content-center">
                      <button className="btn btn-primary" data-bs-target="#userLogin" data-bs-toggle="modal">Login</button>
                      <button className="btn btn-dark " onClick={registerUser}>Register</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default UserRegister