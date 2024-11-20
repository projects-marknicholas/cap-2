import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ValidateUser = () => {
  const navigate = useNavigate();
  const location = useLocation();  // This will track the current location/pathname

  useEffect(() => {
    const user = localStorage.getItem('user');

    if (!user) {
      // If there's no user data, redirect to login page
      navigate('/');
      return;  // Prevent further execution
    }

    const userData = JSON.parse(user);

    if (userData.status === 'deactivated') {
      navigate('/'); // Redirect if the account is deactivated
      return;
    }

    // Check user role and navigate accordingly
    if (userData.role === 'admin') {
      // Check if the user is trying to access any non-admin routes
      if (
        location.pathname !== '/admin' &&
        location.pathname !== '/admin/students' &&
        location.pathname !== '/admin/subjects' &&
        location.pathname !== '/admin/accounts'
      ) {
        navigate('/'); // Redirect to home if not allowed
      }
    } else if (userData.role === 'student') {
      // Check if the student is trying to access non-student routes
      if (
        location.pathname !== '/student' &&
        location.pathname !== '/student/curriculum' &&
        location.pathname !== '/student/account'
      ) {
        navigate('/'); // Redirect to home if not allowed
      }
    } else {
      // Redirect if role is missing or not recognized
      navigate('/');
    }
  }, [navigate, location]); // Adding location to the dependencies

  return null; // No UI is rendered
};

export default ValidateUser;
