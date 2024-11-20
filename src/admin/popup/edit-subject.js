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
    subject_code: '',
    subject: '',
    lec_hours: '',
    lab_hours: '',
    lec_unit: '',
    lab_unit: '',
    year: '',
    semester: ''
  });

  // Populate form data with subject prop when show changes or subject changes
  useEffect(() => {
    if (show && subject) {
      setFormData({
        subject_code: subject.subject_code || '',
        subject: subject.subject || '',
        lec_hours: subject.lec_hours || '',
        lab_hours: subject.lab_hours || '',
        lec_unit: subject.lec_unit || '',
        lab_unit: subject.lab_unit || '',
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
      <button className='admin-pop-close' onClick={onClose}>Close</button>
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
            <label htmlFor='lec_hours'>
              <p>Lec (Hours)</p>
              <input
                type='text'
                id='lec_hours'
                name='lec_hours'
                value={formData.lec_hours}
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
            <label htmlFor='year'>
              <p>Year</p>
              <input
                type='text'
                id='year'
                name='year'
                value={formData.year}
                onChange={handleInputChange}
              />
            </label>
            <label htmlFor='semester'>
              <p>Semester</p>
              <select
                id='semester'
                name='semester'
                value={formData.semester}
                onChange={handleInputChange}
              >
                {formData.semester === '2' ? (
                  <>
                    <option value='2'>2nd semester</option>
                    <option value='1'>1st semester</option>
                  </>
                ) : (
                  <>
                    <option value='1'>1st semester</option>
                    <option value='2'>2nd semester</option>
                  </>
                )}
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
