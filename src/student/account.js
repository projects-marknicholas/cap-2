import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';

// Components
import Navbar from "./components/navbar";

// Assets
import CameraSvg from "../assets/svg/camera.svg";

// CSS
import '../assets/css/student/account.css';

// API
import { updateStudent, getStudent, verifyStudent } from "../integration/student";

const AccountSettings = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [formData, setFormData] = useState({
    user_id: "",
    student_number: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem('user'));
    const userId = storedUser?.user_id;

    const { student_number } = formData;

    try {
      const result = await updateStudent({
        user_id: userId || formData.user_id, 
        student_number
      });

      if (result.status === 'success') {
        Swal.fire('Success!', result.message, 'success');
      } else {
        Swal.fire('Error!', result.message, 'error');
      }
    } catch (error) {
      Swal.fire('Error!', 'An unexpected error occurred.', 'error');
      console.error('Submission error:', error); // Log the error for debugging
    }
  };

  useEffect(() => {
    document.title = 'Account Settings';

    const fetchUserData = async () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const userId = storedUser?.user_id;

      if (!userId) {
        Swal.fire({
          icon: 'error',
          title: 'User not found',
          text: 'Please log in again.',
        });
        setLoading(false);
        return;
      }

      const result = await getStudent(userId);

      if (result.status === 'success') {
        setUser(result.user);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: result.message || 'Failed to fetch user details.',
        });
      }

      setLoading(false);
    };

    fetchUserData();
  }, []);

  const handleVerifyStudent = async () => {
    setVerifying(true);
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const email = storedUser?.email;
    const token = storedUser?.user_id;

    const result = await verifyStudent(email, token);

    if (result.status === 'success') {
      Swal.fire({
        icon: 'success',
        title: 'Account Verification!',
        text: result.message,
      });
      setUser(prevUser => ({ ...prevUser, status: 'verified' }));
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Verification Failed',
        text: result.message,
      });
    }
    setVerifying(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <form className="account-settings" onSubmit={handleSubmit}>
        <div className="as-header">
          <h2>Student Account Settings</h2>
          <p>Manage your account information and verification status.</p>
        </div>

        <div className="change-photo">
          <div className="image">
            <img src={user?.profile || ''} alt="Profile" />
          </div>
          <button>
            <input type="file" />
            <img src={CameraSvg} alt="Change Profile" />
            Change Photo
          </button>
        </div>

        <div className="grid-input">
          <div className="item">
            <p>Student Number</p>
            <input
              type="text"
              id="student_number"
              name="student_number"
              autoComplete="off"
              placeholder="2024-0001"
              value={formData.student_number || user?.student_number || ''}
              onChange={handleChange}
            />
          </div>
          <div className="item">
            <p>Email</p>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="off"
              placeholder="johndoe@example.com"
              defaultValue={user?.email || ''}
            />
          </div>
          <div className="item">
            <p>First Name</p>
            <input
              type="text"
              id="first_name"
              name="first_name"
              autoComplete="off"
              placeholder="John"
              defaultValue={user?.first_name || ''}
            />
          </div>
          <div className="item">
            <p>Last Name</p>
            <input
              type="text"
              id="last_name"
              name="last_name"
              autoComplete="off"
              placeholder="Doe"
              defaultValue={user?.last_name || ''}
            />
          </div>
        </div>

        <div className="account-status">
          {user?.status ? (
            <>
              <div className="left">
                <h3>Account Status</h3>
                <p>Your account is now <span className="verified">verified</span></p>
              </div>
              <div className="right"></div>
            </>
          ) : (
            <>
              <div className="left">
                <h3>Account Status</h3>
                <p>Your account is currently <span className="not-verified">not verified</span></p>
              </div>
              <div className="right">
                <button onClick={handleVerifyStudent} disabled={verifying}>
                  {verifying ? 'Sending...' : 'Verify now'}
                </button>
              </div>
            </>
          )}
        </div>

        <button className="submit">Save Changes</button>
      </form>
    </>
  );
};

export default AccountSettings;
