import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Logo from '../assets/img/logo.png';
import GoogleSvg from '../assets/svg/google.svg';
import '../assets/css/auth.css';

// API
import { login, GoogleLogin } from '../integration/auth';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleLogin = () => {
    const url = process.env.REACT_APP_BASE_URL;
    window.location.href = `${url}/api/auth/google`;
  };

  useEffect(() => {
    document.title = 'Login - Course Monitoring and Curriculum Tracking System';
  });

  return(
    <div className="auth">
      <GoogleLogin />
      <form onSubmit={handleSubmit}>
        <div className="logo">
          <img src={Logo} alt='logo' />
          <div>
            <h1>Course Monitoring and Curriculum Tracking System</h1>
            <p className='program-name'>College of Computer Studies</p>
          </div>
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
            <div className='flex'>
              <input
                type={showPassword ? 'text' : 'password'} // Toggle input type based on showPassword
                autoComplete='off'
                name='password'
                id='password'
                value={formData.password}
                onChange={handleChange}
              />
              <button className='show-password' type="button" onClick={togglePasswordVisibility}>
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </label>
        </div>
        <div className="log-btn">
          <div className='forgot'>
            <Link to='/auth/forgot-password'>Forgot Password?</Link>
          </div>
          <button className='log'>Login</button>
          <button className='sign' onClick={handleGoogleLogin}>
            <img src={GoogleSvg} alt='microsoft'/>
            Sign in with Google
          </button>
          <span>Not registered yet? <Link to='/auth/register'>Create an Account</Link></span>
        </div>
      </form>
    </div>
  );
}

export default Login;
