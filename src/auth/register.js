// Hooks
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Components
import Swal from 'sweetalert2';

// Assets
import Logo from '../assets/img/logo.png';

// CSS
import '../assets/css/auth.css';

// API
import { register } from '../integration/auth';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); 
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "", 
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Send form data as JSON
    const { last_name, middle_name, first_name, email, password, confirm_password } = formData;

    // This object should match the expected structure in your PHP backend
    const result = await register({
      last_name,
      middle_name,
      first_name,
      email,
      password,
      confirm_password,
    });

    // Handle response
    if (result.status === 'success') {
      Swal.fire('Success!', result.message, 'success');
      navigate('/');
    } else {
      Swal.fire('Error!', result.message, 'error');
    }
  };

  useEffect(() => {
    document.title = 'Register - Course Monitoring and Curriculum Tracking System';
  });

  return (
    <>
      <div className="auth">
        <form onSubmit={handleSubmit}>
          <div className="logo">
            <img src={Logo} alt='logo' />
            <div>
              <h1>Course Monitoring and Curriculum Tracking System</h1>
              <p className='program-name'>College of Computer Studies</p>
            </div>
          </div>
          <div className="header">
            <h1>Welcome!</h1>
            <p>Let’s get familiar! Register an account.</p>
          </div>
          <div className="form-group">
            <label>
              <span>First name</span>
              <input
                type='text'
                autoComplete='off'
                name='first_name'
                id='first_name'
                value={formData.first_name}
                onChange={handleChange}
              />
            </label>
            <label>
              <span>Middle name</span>
              <input
                type='text'
                autoComplete='off'
                name='middle_name'
                id='middle_name'
                value={formData.middle_name}
                onChange={handleChange}
              />
            </label>
            <label>
              <span>Last name</span>
              <input
                type='text'
                autoComplete='off'
                name='last_name'
                id='last_name'
                value={formData.last_name}
                onChange={handleChange}
              />
            </label>
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
                  type={showPassword ? 'text' : 'password'} 
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
            <label>
              <span>Confirm Password</span>
              <div className='flex'>
                <input
                  type={showPassword ? 'text' : 'password'} 
                  autoComplete='off'
                  name='confirm_password'
                  id='confirm_password'
                  value={formData.confirm_password}
                  onChange={handleChange}
                />
                <button className='show-password' type="button" onClick={togglePasswordVisibility}>
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </label>
          </div>
          <div className="log-btn">
            <button className='log'>Register</button>
            <span>Already have an account? <Link to='/auth/login'>Sign in</Link></span>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
