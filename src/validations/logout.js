import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user data from localStorage
    localStorage.removeItem('user');

    // Redirect to the home page after a short delay
    const timeoutId = setTimeout(() => {
      navigate('/');
    }, 1000);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, [navigate]);

  return null;
};

export default Logout;