import React, { useState, useEffect } from 'react';

// Components
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

// API
import { updateSubject } from '../../integration/admin';

const EditSubjectPopup = ({
  show,
  onClose,
  subject,
  refreshTable
}) => {
  const [formData, setFormData] = useState({
    curriculum_name: '',
    subject_code: '',
    subject: '',
    lec_hours: '',
    lab_hours: '',
    lec_unit: '',
    lab_unit: '',
    year_level: '',
    year: '',
    semester: ''
  });

  useEffect(() => {
    const lecUnit = parseFloat(formData.lec_unit || 0); // Lecture units
    const labUnit = parseFloat(formData.lab_unit || 0); // Laboratory units
  
    setFormData((prevData) => {
      const lecHours = lecUnit; // Lecture hours = Lecture units
      const labHours = labUnit * 3; // 1 lab unit = 3 lab hours
  
      return {
        ...prevData,
        lec_hours: lecUnit > 0 ? lecHours.toFixed(1) : '0.0', // Update lecture hours
        lab_hours: labUnit > 0 ? labHours.toFixed(1) : '0.0', // Update laboratory hours
      };
    });
  }, [formData.lec_unit, formData.lab_unit]);

  // Populate form data with subject prop when show changes or subject changes
  useEffect(() => {
    if (show && subject) {
      setFormData({
        curriculum_name: subject.curriculum_name || '',
        subject_code: subject.subject_code || '',
        subject: subject.subject || '',
        lec_hours: subject.lec_hours || '',
        lab_hours: subject.lab_hours || '',
        lec_unit: subject.lec_unit || '',
        lab_unit: subject.lab_unit || '',
        year_level: subject.year_level || '',
        year: subject.year || '',
        semester: subject.semester || ''
      });
    }
  }, [show, subject]);

  if (!show) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdateSubject = async () => {
    const result = await updateSubject({
      formData,
      subject_id: subject.subject_id
    });

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
      Swal.fire({
        title: 'Error!',
        text: result.message,
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className='admin-pop-overlay'>
      <button className='admin-pop-close' onClick={onClose}>×</button>
      <motion.div 
        className="admin-subject-pop" 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}  
        exit={{ opacity: 0, y: 50 }}     
        transition={{ duration: 0.3 }}    
      >
        <div className='header'>Edit Subject</div>

        <div className='form-group'>
          <div className='form-group-grid2'>
            <label htmlFor='curriculum_name'>
              <p>Curriculum Name</p>
              <input 
                type='text' 
                id='curriculum_name' 
                name='curriculum_name' 
                value={formData.curriculum_name}
                onChange={handleInputChange}
              />
            </label>
            <label htmlFor='subject_code'>
              <p>Subject code</p>
              <input
                type='text'
                id='subject_code'
                name='subject_code'
                value={formData.subject_code}
                onChange={handleInputChange}
              />
            </label>
            <label htmlFor='subject'>
              <p>Subject name</p>
              <input
                type='text'
                id='subject'
                name='subject'
                value={formData.subject}
                onChange={handleInputChange}
              />
            </label>
            <label htmlFor="year_level">
              <p>Year Level</p>
              <select
                id="year_level"
                name="year_level"
                value={formData.year_level}
                onChange={handleInputChange}
              >
                <option value="1" selected={formData.year_level === '1'}>1st Year</option>
                <option value="2" selected={formData.year_level === '2'}>2nd Year</option>
                <option value="3" selected={formData.year_level === '3'}>3rd Year</option>
                <option value="4" selected={formData.year_level === '4'}>4th Year</option>
              </select>
            </label>
            <label htmlFor='lec_units'>
              <p>Lec (Units)</p>
              <input
                type='text'
                id='lec_unit'
                name='lec_unit'
                value={formData.lec_unit}
                onChange={handleInputChange}
              />
            </label>
            <label htmlFor='lec_hours'>
              <p>Lec (Hours)</p>
              <input
                type='text'
                id='lec_hours'
                name='lec_hours'
                readOnly
                value={formData.lec_hours}
                onChange={handleInputChange}
              />
            </label>
            <label htmlFor='lab_units'>
              <p>Lab (Units)</p>
              <input
                type='text'
                id='lab_unit'
                name='lab_unit'
                value={formData.lab_unit}
                onChange={handleInputChange}
              />
            </label>
            <label htmlFor='lab_hours'>
              <p>Lab (Hours)</p>
              <input
                type='text'
                id='lab_hours'
                name='lab_hours'
                value={formData.lab_hours}
                onChange={handleInputChange}
              />
            </label>
            <label htmlFor='year'>
              <p>Academic Year</p>
              <select 
                id="year" 
                name="year" 
                value={formData.year} 
                onChange={handleInputChange}
              >
                <option value="" disabled>Select a year</option>
                {Array.from({ length: 100 }, (_, index) => {
                  const year = new Date().getFullYear() - index; 
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </label>
            <label htmlFor='semester'>
              <p>Semester</p>
              <select
                id='semester'
                name='semester'
                value={formData.semester}
                onChange={handleInputChange}
              >
                <option value="1">1st semester</option>
                <option value="2">2nd semester</option>
                <option value="summer-1">Summer 1st Semester</option>
                <option value="summer-2">Summer 2nd Semester</option>
              </select>
            </label>
          </div>
          <div className='form-group-grid'>
            {subject.pre_requisites.map((pre, index) => (
              <label key={index} htmlFor={`pre_requisites_${index}`}>
                <p>Pre Requisites {index + 1}</p>
                <input
                  id={`pre_requisites_${index}`}
                  name="pre_requisites"
                  value={pre.subject}
                  readOnly
                />
              </label>
            ))}
          </div>
          <div className='admin-sub-pop'>
            <button onClick={handleUpdateSubject}>Update Subject</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EditSubjectPopup;
