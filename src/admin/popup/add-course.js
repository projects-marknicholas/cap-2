import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

import { addCourse, getRequisites } from '../../integration/admin';

const AddCoursePopup = ({ show, onClose, refreshTable, program, curriculumYear }) => {
  const [formData, setFormData] = useState({
    program: program || '',
    curriculum_year: curriculumYear || '',
    year_level: '',
    semester: '',
    course_code: '',
    course_description: '',
    course_type: '',
    units: '',
    hours: '',
    coRequisites: [''],
    preRequisites: [''],
  });
  const [customYear, setCustomYear] = useState("");
  const [showCustomYear, setShowCustomYear] = useState(false);
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]); 
  const [fetchError, setFetchError] = useState(null); 

  // Fetch courses when the component mounts or when program/curriculumYear changes
  const fetchCourses = async () => {
    try {
      const result = await getRequisites({ program, curriculum_year: curriculumYear });
      if (result.status === 'success') {
        setCourses(result.data); 
      } else {
        setFetchError(result.message || 'Failed to fetch courses.');
      }
    } catch (error) {
      setFetchError(error.message || 'An error occurred while fetching courses.');
    }
  };
  
  useEffect(() => {
    if (program && curriculumYear) {
      fetchCourses();
    }
  }, [program, curriculumYear]);  

  useEffect(() => {
    setFormData(prevData => ({
      ...prevData,
      program: program || '',
      curriculum_year: curriculumYear || '',
    }));
  }, [program, curriculumYear]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (formData.course_type === "lec") {
      setFormData((prev) => ({ ...prev, hours: String(formData.units) }));
    } else if (formData.course_type === "lab") {
      setFormData((prev) => ({ ...prev, hours: String(formData.units * 3) }));
    }
  }, [formData.course_type, formData.units]);

  const handleSubmit = async () => {
    setLoading(true);

    if (showCustomYear) {
      if (!customYear.trim()) {
        Swal.fire('Error', 'Please enter a custom curriculum year.', 'error');
        setLoading(false);
        return;
      }
      formData.curriculum_year = customYear;
    }

    try {
      const result = await addCourse(formData);
      setLoading(false);

      if (result.status === 'success') {
        Swal.fire({
          title: 'Success!',
          text: result.message,
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          // Reset the form
          setFormData({
            program: program || '',
            curriculum_year: curriculumYear || '',
            year_level: '',
            semester: '',
            course_code: '',
            course_description: '',
            course_type: '',
            units: '',
            hours: '',
            coRequisites: [''],
            preRequisites: [''],
          });

          // Reset custom year input
          setCustomYear("");
          setShowCustomYear(false);

          onClose();
          refreshTable();
          fetchCourses();
        });
      } else {
        Swal.fire('Error', result.message || 'Failed to add course.', 'error');
      }
    } catch (error) {
      setLoading(false);
      Swal.fire('Unexpected Error', 'Something went wrong. Please try again.', 'error');
    }
  };

  // Add both a pre-requisite and co-requisite input field
  const addRequisite = () => {
    setFormData((prevData) => ({
      ...prevData,
      coRequisites: [...prevData.coRequisites, ''],
      preRequisites: [...prevData.preRequisites, ''],
    }));
  };

  const removeRequisite = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      coRequisites: prevData.coRequisites.filter((_, i) => i !== index),
      preRequisites: prevData.preRequisites.filter((_, i) => i !== index),
    }));
  };

  const handleYearChange = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "Others") {
      setShowCustomYear(true);
      setFormData((prevData) => ({
        ...prevData,
        curriculum_year: "",
      }));
      setCustomYear("");
    } else {
      setShowCustomYear(false);
      setFormData((prevData) => ({
        ...prevData,
        curriculum_year: selectedValue,
      }));
    }
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
            <div className="header">Add New Course</div>
            <div className="form-group">
              <div className="form-group-grid2">
                <label>
                  <p>Program</p>
                  <input
                    id="program"
                    name="program"
                    value={formData.program}
                    onChange={handleChange}
                    disabled
                    readOnly
                  />
                </label>

                {/* Curriculum Year */}
                {!showCustomYear ? (
                  <label htmlFor="curriculum_year">
                    <p>Curriculum Year</p>
                    <input
                      id="curriculum_year"
                      name="curriculum_year"
                      value={formData.curriculum_year}
                      onChange={handleYearChange}
                      disabled
                      readOnly
                    />
                  </label>
                ) : (
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
                    <option value='summer'>Summer</option>
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
                  <select
                    name="course_type"
                    value={formData.course_type}
                    onChange={handleChange}
                  >
                    <option value="">Select Course Type</option>
                    <option value="lec">lec</option>
                    <option value="lab">lab</option>
                  </select>
                </label>

                <label></label>

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
                    readOnly
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
                        <option value="">Select Co-Requisite</option>
                        {courses.map((course) => (
                          <option key={course.course_id} value={course.course_code}>
                            {course.course_code} - {course.course_description}
                          </option>
                        ))}
                      </select>
                      <button type="button" onClick={() => removeRequisite(index)}>
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
                        <option value="">Select Pre-Requisite</option>
                        {courses.map((course) => (
                          <option key={course.course_id} value={course.course_code}>
                            {course.course_code} - {course.course_description}
                          </option>
                        ))}
                      </select>
                      <button type="button" onClick={() => removeRequisite(index)}>
                        Remove
                      </button>
                    </div>
                  </label>
                ))}

                {/* Add Requisite Button */}
                <button type="button" onClick={addRequisite}>
                  Add Requisite
                </button>

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

export default AddCoursePopup;