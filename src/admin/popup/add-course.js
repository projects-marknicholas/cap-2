import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

const AddCoursePopup = ({ show, onClose }) => {
  const [program, setProgram] = useState('');
  const [curriculumYear, setCurriculumYear] = useState('');
  const [yearLevel, setYearLevel] = useState('');
  const [semester, setSemester] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseType, setCourseType] = useState('');
  const [units, setUnits] = useState('');
  const [hours, setHours] = useState('');
  const [coRequisite, setCoRequisite] = useState('');
  const [preRequisite, setPreRequisite] = useState('');

  const handleSubmit = () => {
    if (
      !program ||
      !curriculumYear ||
      !yearLevel ||
      !semester ||
      !courseCode ||
      !courseDescription ||
      !courseType ||
      !units ||
      !hours
    ) {
      Swal.fire('Error', 'Please fill out all required fields.', 'error');
      return;
    }

    Swal.fire('Success', 'Curriculum added successfully!', 'success');
    onClose();
    // Reset all fields
    setProgram('');
    setCurriculumYear('');
    setYearLevel('');
    setSemester('');
    setCourseCode('');
    setCourseDescription('');
    setCourseType('');
    setUnits('');
    setHours('');
    setCoRequisite('');
    setPreRequisite('');
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
            <div className="header">Add New Course</div>
            <div className="form-group">
              <div className="form-group-grid2">
                <label>
                  <p>Program</p>
                  <input
                    type="text"
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                  />
                </label>
                <label>
                  <p>Curriculum Year</p>
                  <select
                    value={curriculumYear}
                    onChange={(e) => setCurriculumYear(e.target.value)}
                  >
                    <option value="" disabled>Select a year</option>
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
                <label>
                  <p>Year Level</p>
                  <select
                    value={yearLevel}
                    onChange={(e) => setYearLevel(e.target.value)}
                  >
                    <option value="" disabled>Select Year Level</option>
                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                    <option>4th Year</option>
                  </select>
                </label>
                <label>
                  <p>Semester</p>
                  <select
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                  >
                    <option value="" disabled>Select Semester</option>
                    <option>1st Semester</option>
                    <option>2nd Semester</option>
                  </select>
                </label>
                <label>
                  <p>Course Code</p>
                  <input
                    type="text"
                    value={courseCode}
                    onChange={(e) => setCourseCode(e.target.value)}
                  />
                </label>
                <label>
                  <p>Course Description</p>
                  <input
                    type="text"
                    value={courseDescription}
                    onChange={(e) => setCourseDescription(e.target.value)}
                  />
                </label>
                <label>
                  <p>Course Type</p>
                  <input
                    type="text"
                    value={courseType}
                    onChange={(e) => setCourseType(e.target.value)}
                  />
                </label>
                <label>
                  <p>Units</p>
                  <input
                    type="number"
                    value={units}
                    onChange={(e) => setUnits(e.target.value)}
                  />
                </label>
                <label>
                  <p>Hours</p>
                  <input
                    type="number"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                  />
                </label>
                <label>
                  <p>Co-Requisite</p>
                  <input
                    type="text"
                    value={coRequisite}
                    onChange={(e) => setCoRequisite(e.target.value)}
                  />
                </label>
                <label>
                  <p>Pre-Requisite</p>
                  <input
                    type="text"
                    value={preRequisite}
                    onChange={(e) => setPreRequisite(e.target.value)}
                  />
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

export default AddCoursePopup;
