import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { updateCourse } from '../../integration/admin';

const EditCoursePopup = ({ show, onClose, refreshTable, courseData }) => {
  const [formData, setFormData] = useState({
    course_id: '',
    program: '',
    curriculum_year: '',
    year_level: '',
    semester: '',
    course_code: '',
    course_description: '',
    course_type: '',
    units: '',
    hours: '',
    coRequisites: [],
    preRequisites: [],
  });

  const [customYear, setCustomYear] = useState('');
  const [showCustomYear, setShowCustomYear] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (courseData) {
      setFormData({
        course_id: courseData.course_id || '',
        program: courseData.program || '',
        curriculum_year: courseData.curriculum_year || '',
        year_level: courseData.year_level || '',
        semester: courseData.semester || '',
        course_code: courseData.course_code || '',
        course_description: courseData.course_description || '',
        course_type: courseData.course_type || '',
        units: courseData.units || '',
        hours: courseData.hours || '',
        coRequisites: courseData.coRequisites || [],
        preRequisites: courseData.preRequisites || [],
      });

      // Check if the curriculum_year is a custom year (not in the dropdown options)
      const isCustomYear = !Array.from({ length: 20 }, (_, index) => {
        const year = new Date().getFullYear() - index;
        return `${year}-${year + 1}`;
      }).includes(courseData.curriculum_year);

      if (isCustomYear) {
        setCustomYear(courseData.curriculum_year);
        setShowCustomYear(true);
      }
    }
  }, [courseData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'curriculum_year') {
      setShowCustomYear(false);
      setFormData((prevData) => ({
        ...prevData,
        curriculum_year: value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    // If custom year is being used, set the curriculum_year to the custom year value
    if (showCustomYear) {
      if (!customYear.trim()) {
        Swal.fire('Error', 'Please enter a custom curriculum year.', 'error');
        setLoading(false);
        return;
      }
      formData.curriculum_year = customYear;
    }

    try {
      const result = await updateCourse({ course_id: formData.course_id, formData });
      setLoading(false);

      if (result.status === 'success') {
        Swal.fire({
          title: 'Success!',
          text: result.message,
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          onClose();
          refreshTable();
        });
      } else {
        Swal.fire('Error', result.message || 'Failed to update course.', 'error');
      }
    } catch (error) {
      setLoading(false);
      Swal.fire('Unexpected Error', 'Something went wrong. Please try again.', 'error');
    }
  };

  const addCoRequisite = () => {
    setFormData((prevData) => ({
      ...prevData,
      coRequisites: [...prevData.coRequisites, ''],
    }));
  };

  const addPreRequisite = () => {
    setFormData((prevData) => ({
      ...prevData,
      preRequisites: [...prevData.preRequisites, ''],
    }));
  };

  const removeCoRequisite = (index) => {
    const newCoRequisites = [...formData.coRequisites];
    newCoRequisites.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      coRequisites: newCoRequisites,
    }));
  };

  const removePreRequisite = (index) => {
    const newPreRequisites = [...formData.preRequisites];
    newPreRequisites.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      preRequisites: newPreRequisites,
    }));
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
            <div className="header">Edit Course</div>
            <div className="form-group">
              <div className="form-group-grid2">
                {/* Form Fields */}
                <label>
                  <p>Program</p>
                  <select name="program" value={formData.program} onChange={handleChange}>
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
                </label>

                {/* Curriculum Year */}
                <label>
                  <p>Enter Curriculum Year</p>
                  <input
                    type="text"
                    name="curriculum_year"
                    value={formData.curriculum_year}
                    onChange={handleChange}
                    placeholder="e.g. 2025-2026"
                  />
                </label>

                {/* Year Level */}
                <label>
                  <p>Year Level</p>
                  <select name="year_level" value={formData.year_level} onChange={handleChange}>
                    <option value="" disabled>Select Year Level</option>
                    <option value='1'>1st Year</option>
                    <option value='2'>2nd Year</option>
                    <option value='3'>3rd Year</option>
                    <option value='4'>4th Year</option>
                    <option value='5'>5th Year</option>
                  </select>
                </label>

                {/* Semester */}
                <label>
                  <p>Semester</p>
                  <select name="semester" value={formData.semester} onChange={handleChange}>
                    <option value="" disabled>Select Semester</option>
                    <option value='1'>First Semester</option>
                    <option value='2'>Second Semester</option>
                    <option value='Summer'>Summer</option>
                  </select>
                </label>

                {/* Course Code */}
                <label>
                  <p>Course Code</p>
                  <input
                    type="text"
                    name="course_code"
                    value={formData.course_code}
                    onChange={handleChange}
                  />
                </label>

                {/* Course Description */}
                <label>
                  <p>Course Description</p>
                  <input
                    type="text"
                    name="course_description"
                    value={formData.course_description}
                    onChange={handleChange}
                  />
                </label>

                {/* Course Type */}
                <label>
                  <p>Course Type</p>
                  <select name="course_type" value={formData.course_type} onChange={handleChange}>
                    <option value="lec">lec</option>
                    <option value="lab">lab</option>
                  </select>
                </label>

                {/* Units */}
                <label>
                  <p>Units</p>
                  <input
                    type="number"
                    name="units"
                    value={formData.units}
                    onChange={handleChange}
                  />
                </label>

                {/* Hours */}
                <label>
                  <p>Hours</p>
                  <input
                    type="number"
                    name="hours"
                    value={formData.hours}
                    onChange={handleChange}
                  />
                </label>

                {/* Co-Requisite Inputs */}
                {formData.coRequisites.map((coReq, index) => (
                  <label key={index}>
                    <p>Co-Requisite {index + 1}</p>
                    <div className="input-group">
                      <select
                        name={`coRequisite-${index}`}
                        value={coReq}
                        onChange={(e) => {
                          const newcoRequisites = [...formData.coRequisites];
                          newcoRequisites[index] = e.target.value;
                          setFormData({ ...formData, coRequisites: newcoRequisites });
                        }}
                      >
                        <option value='Subject 1'>Subject 1</option>
                        <option value='Subject 2'>Subject 2</option>
                        <option value='Subject 3'>Subject 3</option>
                      </select>
                      <button type="button" onClick={() => removeCoRequisite(index)}>
                        Remove
                      </button>
                    </div>
                  </label>
                ))}

                {/* Pre-Requisite Inputs */}
                {formData.preRequisites.map((preReq, index) => (
                  <label key={index}>
                    <p>Pre-Requisite {index + 1}</p>
                    <div className="input-group">
                      <select
                        name={`preRequisite-${index}`}
                        value={preReq}
                        onChange={(e) => {
                          const newpreRequisites = [...formData.preRequisites];
                          newpreRequisites[index] = e.target.value;
                          setFormData({ ...formData, preRequisites: newpreRequisites });
                        }}
                      >
                        <option value='Subject 1'>Subject 1</option>
                        <option value='Subject 2'>Subject 2</option>
                        <option value='Subject 3'>Subject 3</option>
                      </select>
                      <button type="button" onClick={() => removePreRequisite(index)}>
                        Remove
                      </button>
                    </div>
                  </label>
                ))}

                <div></div>
                <button type="button" onClick={addCoRequisite}>Add Co-Requisite</button>
                <button type="button" onClick={addPreRequisite}>Add Pre-Requisite</button>

                {/* Submit Button */}
                <button
                  type="button"
                  disabled={loading}
                  onClick={handleSubmit}
                  className="submit-btn"
                >
                  {loading ? 'Saving...' : 'Submit'}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default EditCoursePopup;