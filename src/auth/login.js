// Hooks
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Components
import Swal from 'sweetalert2';

// Assets
import Logo from '../assets/img/logo.png';
import MicrosoftSvg from '../assets/svg/microsoft.svg';

// CSS
import '../assets/css/auth.css';

// API
import { login } from '../integration/auth';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Send form data as JSON
    const { 
      email, 
      password 
    } = formData;

    // This object should match the expected structure in your PHP backend
    const result = await login({
      email,
      password
    });


    // Handle response
    if (result.status === 'success') {
      Swal.fire('Success!', result.message, 'success');
      localStorage.setItem('user', JSON.stringify(result.user));
      navigate(`/${result.user.role}`);
    } else {
      Swal.fire('Error!', result.message, 'error');
    }
  };

  useEffect(() => {
    document.title = 'Login - Course Monitoring and Curriculum Tracking System';
  });

  return(
    <>
      <div className="auth">
        <form onSubmit={handleSubmit}>
          <div className="logo">
            <img src={Logo} alt='logo' />
            <h1>Course Monitoring and Curriculum Tracking System</h1>
          </div>
          <div className="header">
            <h1>Welcome Back!</h1>
            <p>It’s time to catch up! Sign in to your account.</p>
          </div>
          <div className="form-group">
            <label>
              <span>Email</span>
              <input
                type='email'
                autoComplete='off'
                name='email'
                id='email'
                value={formData.email}
                onChange={handleChange}
              />
            </label>
            <label>
              <span>Password</span>
              <input
                type='password'
                autoComplete='off'
                name='password'
                id='password'
                value={formData.password}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="log-btn">
            <div className='forgot'>
              <Link to='/auth/forgot-password'>Forgot Password?</Link>
            </div>
            <button className='log'>Login</button>
            <button className='sign'>
              <img src={MicrosoftSvg} alt='microsoft'/>
              Sign in with Microsoft
            </button>
            <span>Not registered yet? <Link to='/auth/register'>Create an Account</Link></span>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;