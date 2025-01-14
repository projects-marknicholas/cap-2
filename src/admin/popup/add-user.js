import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

const AddUserPopup = ({ show, onClose }) => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [program, setProgram] = useState('');
  const [currentYear, setCurrentYear] = useState('');

  const handleSubmit = () => {
    if (
      !firstName ||
      !middleName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !role ||
      (role === 'student' && (!program || !currentYear))
    ) {
      Swal.fire('Error', 'Please fill out all fields.', 'error');
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire('Error', 'Passwords do not match.', 'error');
      return;
    }

    Swal.fire('Success', 'User added successfully!', 'success');
    onClose();
    setFirstName('');
    setMiddleName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setRole('');
    setProgram('');
    setCurrentYear('');
  };

  const dropdownAnimation = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.2 } },
  };

  return (
    <div className={`admin-pop-overlay ${show ? 'show' : 'hide'}`} role="dialog">
      {show && (
        <>
          <button className="admin-pop-close" onClick={onClose} aria-label="Close">
            ×
          </button>
          <motion.div
            className="admin-subject-pop"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="header">Add New User</div>
            <div className="form-group">
              <div className="form-group-grid2">
                <label htmlFor="first_name">
                  <p>First Name</p>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label htmlFor="middle_name">
                  <p>Middle Name</p>
                  <input
                    type="text"
                    id="middle_name"
                    name="middle_name"
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                  />
                </label>
                <label htmlFor="last_name">
                  <p>Last Name</p>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
                <label htmlFor="email">
                  <p>Email</p>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                <label htmlFor="password">
                  <p>Password</p>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
                <label htmlFor="confirm_password">
                  <p>Confirm Password</p>
                  <input
                    type="password"
                    id="confirm_password"
                    name="confirm_password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </label>
                <label htmlFor="role">
                  <p>Role</p>
                  <select
                    id="role"
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="student">Student</option>
                  </select>
                </label>
                {role === 'student' && (
                  <>
                    <motion.label
                      htmlFor="program"
                      variants={dropdownAnimation}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <p>Program</p>
                      <select
                        id="program"
                        name="program"
                        value={program}
                        onChange={(e) => setProgram(e.target.value)}
                      >
                        <option value="">Select Program</option>
                        <option value="Bachelor of Science in Information Technology">
                          Bachelor of Science in Information Technology
                        </option>
                        <option value="Bachelor of Science in Computer Science">
                          Bachelor of Science in Computer Science
                        </option>
                        <option value="Bachelor of Science in Computer Engineering">
                          Bachelor of Science in Computer Engineering
                        </option>
                      </select>
                    </motion.label>
                    <motion.label
                      htmlFor="current_year"
                      variants={dropdownAnimation}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <p>Current Year</p>
                      <select
                        id="current_year"
                        name="current_year"
                        value={currentYear}
                        onChange={(e) => setCurrentYear(e.target.value)}
                      >
                        <option value="">Select Year</option>
                        <option value="1">1st Year</option>
                        <option value="2">2nd Year</option>
                        <option value="3">3rd Year</option>
                        <option value="4">4th Year</option>
                      </select>
                    </motion.label>
                  </>
                )}
              </div>
              <div className="admin-sub-pop">
                <button onClick={handleSubmit}>Add User</button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default AddUserPopup;
