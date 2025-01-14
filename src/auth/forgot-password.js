// Hooks
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// Assets
import Logo from '../assets/img/logo.png';

// CSS
import '../assets/css/auth.css';

const ForgotPassword = () => {

  useEffect(() => {
    document.title = 'Forgot Password - Course Monitoring and Curriculum Tracking System';
  });

  return(
    <>
      <div className="auth">
        <form>
          <div className="logo">
            <img src={Logo} alt='logo' />
            <div>
              <h1>Course Monitoring and Curriculum Tracking System</h1>
              <p className='program-name'>College of Computer Studies</p>
            </div>
          </div>
          <div className="header">
            <h1>Forgot Password</h1>
            <p>Have you forgotten your password?</p>
          </div>
          <div className="form-group">
            <label>
              <span>Email</span>
              <input
                type='email'
                autoComplete='off'
                name='email'
                id='email'
              />
            </label>
          </div>
          <div className="log-btn">
            <button className='log'>Send reset link</button>
            <span>Already have an account? <Link to='/auth/login'>Sign in</Link></span>
          </div>
        </form>
      </div>
    </>
  );
}

export default ForgotPassword;