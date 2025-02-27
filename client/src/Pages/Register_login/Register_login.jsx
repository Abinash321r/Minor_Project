import React from 'react'
import { useState } from 'react';
import './Register_login.css'
import { useNavigate } from 'react-router-dom';
function Register_login() {
 // State to hold the form data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  // Form validation function
  const validateForm = () => {
    // Validate name (not empty and at least 3 characters)
    if (!name || name.length < 3) {
      setName('');
      setError('Invalid Name');
      console.log('Invalid Name')
      return false;
    }
    // Validate email (proper Gmail format)
    const emailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
    if (!email || !emailRegex.test(email)) {
      setEmail('');
      setError('Invalid Gmail');
      console.log('Invalid Gmail')
      return false;
    }
    // Validate password (at least 6 characters with letter, number, and special symbol)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!password || !passwordRegex.test(password)) {
      setPassword('');
      setError('Invalid Password');
      console.log('Invalid Password')
      return false;
    }

    // If all validations pass, clear the error
    setError('');
    return true;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    //e.preventDefault();

    // Validate the form data
    if (!validateForm()) {
      return;
    }

    // Send the form data to the server
    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      console.log(data);
      if (data) {
        console.log(data);
        window.alert(data.message);
        setName('');
        setEmail('');
        setName('');
      } else {
        setError(data.message || 'An error occurred');
      }
    } catch (error) {
      setError('An error occurred while connecting to the server.');
    }
  };

  const handleLogin=async()=>{
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      console.log(data);
      if (data.message=='Login successful') {
        navigate('/home');  
       
      } else {
        setError( 'An error occurred');
      }
    } catch (error) {
      setError('An error occurred while connecting to the server.');
    }
    
  }

  return (
    <div id='register_login_container'>
      {console.log('div,password',error,password)}
      <div id=''></div>
      <div id='user_info_section'>
      <div id='user_name_sction'>
        <label id='name_label'>Name:</label>
        <input id='name_input'value={name} className={error === 'Invalid Name' ? 'error' : ''}
            onChange={(e) => setName(e.target.value)} placeholder={error=='Invalid Name'?error:'Enter name'} />
      </div>
      <div id='user_email_section'>
      <label id='email_label'>Email:</label>
      <input id='email_input'  value={email}  className={error === 'Invalid Gmail' ? 'error' : ''}
            onChange={(e) => setEmail(e.target.value)} placeholder={error=='Invalid Gmail'?error:'Enter email'} />
      </div>
      <div id='user_password_section'>
      <label id='password_label'>Password:</label>
      <input id='password_input' value={password}  className={error === 'Invalid Password' ? 'error' : ''}
       onChange={(e) => setPassword(e.target.value)} placeholder={error=='Invalid Password'?error:'Enter password'}/>
      </div>
      </div>
      <div id='signup_login_section'>
      <div id='signup' onClick={handleSubmit}>
        <div>SignUp</div>
       
      </div>
      <div id='login'>
      <div onClick={handleLogin}>LogIn </div>
      </div>
      </div>
        
    </div>
  )
}

export default Register_login
