import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { updateCurriculum } from '../../integration/admin';

const EditCurriculumPopup = ({ show, onClose, refreshTable, curriculumData }) => {
  const [formData, setFormData] = useState({
    program: '',
    description: '',
    curriculum_year: '',
  });

  useEffect(() => {
    if (curriculumData) {
      setFormData(curriculumData);
    }
  }, [curriculumData]);

  const handleSubmit = async () => {
    try {
      const response = await updateCurriculum({ formData, curriculum_id: curriculumData.curriculum_id });
  
      if (response.status === 'success') {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Curriculum updated successfully!',
        });
  
        refreshTable();
        onClose();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: response.message || 'An error occurred while updating the curriculum.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong. Please try again later.',
      });
      console.error('Error updating curriculum:', error);
    }
  };  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
            <div className="header">Edit Curriculum</div>
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
                  />
                </label>
                <label htmlFor="description">
                  <p>Description</p>
                  <input
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </label>
                <label htmlFor="curriculum_year">
                  <p>Curriculum Year</p>
                  <select
                    id="curriculum_year"
                    name="curriculum_year"
                    value={formData.curriculum_year}
                    onChange={(event) => {
                      const selectedYear = parseInt(event.target.value, 10);
                      setFormData((prevData) => ({
                        ...prevData,
                        curriculum_year: `${selectedYear}-${selectedYear + 1}`,
                      }));
                    }}
                  >
                    <option value="" disabled>Select a year</option>
                    {Array.from({ length: 20 }, (_, index) => {
                      const year = new Date().getFullYear() - index;
                      const formattedYear = `${year}-${year + 1}`; // Ensure consistency
                      return (
                        <option key={year} value={formattedYear}>
                          {formattedYear}
                        </option>
                      );
                    })}
                  </select>
                </label>
              </div>
              <div className="admin-sub-pop">
                <button onClick={handleSubmit}>Save Changes</button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default EditCurriculumPopup;
