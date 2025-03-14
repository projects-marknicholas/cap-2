import React, { useState } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { newUser } from "../../integration/admin";

const AddUserPopup = ({ show, onClose, onUserAdded }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    role: "",
    program: "",
    current_year: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({
      first_name: "",
      middle_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
      role: "",
      program: "",
      current_year: "",
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const result = await newUser(formData);

      if (result.status === "success") {
        Swal.fire("Success", result.message, "success");
        resetForm();
        onClose();
        onUserAdded();
      } else {
        Swal.fire("Error", result.message, "error");
      }
    } catch (error) {
      Swal.fire("Error", "An unexpected error occurred. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const dropdownAnimation = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.2 } },
  };

  return (
    <div className={`admin-pop-overlay ${show ? "show" : "hide"}`} role="dialog">
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
                    value={formData.first_name}
                    onChange={handleInputChange}
                  />
                </label>
                <label htmlFor="middle_name">
                  <p>Middle Name</p>
                  <input
                    type="text"
                    id="middle_name"
                    name="middle_name"
                    value={formData.middle_name}
                    onChange={handleInputChange}
                  />
                </label>
                <label htmlFor="last_name">
                  <p>Last Name</p>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                  />
                </label>
                <label htmlFor="email">
                  <p>Email</p>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </label>
                <label htmlFor="password">
                  <p>Password</p>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </label>
                <label htmlFor="confirm_password">
                  <p>Confirm Password</p>
                  <input
                    type="password"
                    id="confirm_password"
                    name="confirm_password"
                    value={formData.confirm_password}
                    onChange={handleInputChange}
                  />
                </label>
                <label htmlFor="role">
                  <p>Role</p>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="student">Student</option>
                  </select>
                </label>
                {formData.role === "student" && (
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
                        value={formData.program}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Program</option>
                        <option value="Bachelor of Science in Information Technology">
                          Bachelor of Science in Information Technology
                        </option>
                        <option value="Bachelor of Science in Information Technology with BPO">
                        Bachelor of Science in Information Technology with BPO
                        </option>
                        <option value="Bachelor of Science in Information Technology with Specialization in Game Development">
                          Bachelor of Science in Information Technology with Specialization in Game Development
                        </option>
                      </select>
                    </motion.label>
                    <motion.label
                      htmlFor="curriculum_year"
                      variants={dropdownAnimation}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <p>Curriculum Year</p>
                      <select 
                        id="curriculum_year"
                        name="curriculum_year" 
                        value={formData.curriculum_year} 
                        onChange={handleInputChange}>
                        <option value="">Select a year</option>
                        {Array.from({ length: 20 }, (_, index) => {
                          const year = new Date().getFullYear() - index;
                          const nextYear = year + 1;
                          return (
                            <option key={year} value={`${year}-${nextYear}`}>
                              {year}-{nextYear}
                            </option>
                          );
                        })}
                      </select>
                    </motion.label>
                  </>
                )}
              </div>
              <div className="admin-sub-pop">
                <button onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? "Adding..." : "Add User"}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default AddUserPopup;
