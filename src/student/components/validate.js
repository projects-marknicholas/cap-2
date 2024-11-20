// Hooks
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import Swal from 'sweetalert2';

// API
import { getStudent } from '../../integration/student';

const StudentCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (!storedUser) {
      // Redirect to the homepage if no user data in localStorage
      navigate('/');
    } else {
      const userId = storedUser?.user_id;

      // Fetch user details based on user_id
      getStudent(userId)
        .then((data) => {
          // Check if student_number exists
          if (!data.user.student_number) {
            Swal.fire({
              title: 'No Student Number',
              text: 'Please update your profile with your student number.',
              icon: 'info',
              confirmButtonText: 'Complete Profile'
            }).then(() => {
              navigate('/student/account');
            });
          } else if (data.user.status !== 'verified') {
            // Check if status is verified
            Swal.fire({
              title: 'Account Not Verified',
              text: 'Your account is currently not verified. Please verify your account.',
              icon: 'warning',
              confirmButtonText: 'Verify Account'
            }).then(() => {
              navigate('/student/account');
            });
          }
        })
        .catch((error) => {
          console.error('Error fetching user details:', error);
          Swal.fire('Error', 'Failed to fetch user details.', 'error');
        });
    }
  }, [navigate]);

  return null;
};

export default StudentCheck;
