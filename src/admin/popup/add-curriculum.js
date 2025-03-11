import React, { useState } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

// API Integration
import { addCurriculum } from "../../integration/admin";

const AddCurriculumPopup = ({ show, onClose, refreshTable }) => {
  const [formData, setFormData] = useState({
    program: "",
    description: "",
    curriculum_year: "",
  });

  const [customYear, setCustomYear] = useState(""); 
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleYearChange = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "Others") {
      setFormData((prevData) => ({
        ...prevData,
        curriculum_year: "", // Clear the selected year
      }));
      setCustomYear(""); // Reset manual input
    } else {
      setFormData((prevData) => ({
        ...prevData,
        curriculum_year: selectedValue,
      }));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const result = await addCurriculum({
        ...formData,
        curriculum_year: formData.curriculum_year || customYear, 
      });

      setLoading(false);

      if (result.status === "success") {
        Swal.fire({
          title: "Success!",
          text: result.message,
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          onClose();
          refreshTable();
        });
      } else {
        Swal.fire("Error", result.message || "Failed to add curriculum.", "error");
      }
    } catch (error) {
      setLoading(false);
      Swal.fire("Unexpected Error", "Something went wrong. Please try again.", "error");
    }
  };

  if (!show) return null;

  return (
    <div className="admin-pop-overlay">
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
        <div className="header">Add New Curriculum</div>
        <div className="form-group">
          <div className="form-group-grid2">
            <label htmlFor="program">
              <p>Program Name</p>
              <input
                type="text"
                id="program"
                name="program"
                value={formData.program}
                onChange={handleChange}
                placeholder="Enter program name"
              />
            </label>
            <label htmlFor="description">
              <p>Description</p>
              <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter description"
              />
            </label>
            <label htmlFor="curriculum_year">
              <p>Curriculum Year</p>
              <select id="curriculum_year" name="curriculum_year" value={formData.curriculum_year} onChange={handleYearChange}>
                <option value="" disabled>Select a year</option>
                {Array.from({ length: 3 }, (_, index) => {
                  const year = new Date().getFullYear() - 1 + index; 
                  const formattedYear = `${year}-${year + 1}`;
                  return (
                    <option key={year} value={formattedYear}>
                      {formattedYear}
                    </option>
                  );
                })}
                <option value="Others">Others</option>
              </select>
            </label>

            {/* Manual input field for "Others" selection */}
            {formData.curriculum_year === "" && (
              <label htmlFor="customYear">
                <p>Enter Custom Curriculum Year</p>
                <input
                  type="text"
                  id="customYear"
                  name="customYear"
                  value={customYear}
                  onChange={(e) => setCustomYear(e.target.value)}
                  placeholder="e.g. 2025-2026"
                />
              </label>
            )}
          </div>
          <div className="admin-sub-pop">
            <button onClick={handleSubmit} disabled={loading} aria-disabled={loading}>
              {loading ? "Adding..." : "Add Curriculum"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AddCurriculumPopup;
