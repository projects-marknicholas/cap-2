import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

const EditCurriculumPopup = ({ show, onClose }) => {
  const [curriculumName, setCurriculumName] = useState('');
  const [description, setDescription] = useState('');
  const [curriculumYear, setCurriculumYear] = useState('');

  const handleSubmit = () => {
    if (!curriculumName || !description || !curriculumYear) {
      Swal.fire('Error', 'Please fill out all fields.', 'error');
      return;
    }

    Swal.fire('Success', 'Curriculum added successfully!', 'success');
    onClose();
    setCurriculumName('');
    setDescription('');
    setCurriculumYear('');
  };

  return (
    <div
      className={`admin-pop-overlay ${show ? 'show' : 'hide'}`}
      role="dialog"
    >
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
                <label htmlFor="curriculum_name">
                  <p>Program Name</p>
                  <input
                    type="text"
                    id="curriculum_name"
                    name="curriculum_name"
                    value={curriculumName}
                    onChange={(e) => setCurriculumName(e.target.value)}
                  />
                </label>
                <label htmlFor="description">
                  <p>Description</p>
                  <input
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </label>
                <label htmlFor="curriculum_year">
                  <p>Curriculum Year</p>
                  <select
                    id="curriculum_year"
                    name="curriculum_year"
                    value={curriculumYear}
                    onChange={(e) => setCurriculumYear(e.target.value)}
                  >
                    <option value="" disabled>
                      Select a year
                    </option>
                    {Array.from({ length: 20 }, (_, index) => {
                      const year = new Date().getFullYear() - index;
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                </label>
              </div>
              <div className="admin-sub-pop">
                <button onClick={handleSubmit}>Add Curriculum</button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default EditCurriculumPopup;
