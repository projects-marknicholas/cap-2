import React, { useState, useEffect } from 'react';

// Components
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

// API
import { addSubject, getSubject } from '../../integration/admin';

const AddSubjectPopup = ({ 
  show, 
  onClose, 
  preRequisites, 
  onAddPreRequisite, 
  onPreRequisiteChange,
  refreshTable
}) => {
  const [formData, setFormData] = useState({
    curriculum_name: '',
    subject_code: '',
    subject: '',
    lec_unit: '',
    lab_unit: '',
    lec_hours: '',
    lab_hours: '',
    year_level: '1',
    year: '',
    semester: '1',
  });
  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState([]);

  const fetchSubjects = async () => {
    try {
      const result = await getSubject({ page: 1 });
      if (result.status === 'success') {
        setSubjects(result.data);
      } else {
        Swal.fire({
          title: 'Error!',
          text: result.message,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Unexpected Error',
        text: 'Failed to fetch subjects.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  useEffect(() => {
    if (show) {
      fetchSubjects();
    }
  }, [show]);

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));         
  };

  const handleSubmit = async () => {
    setLoading(true);
  
    const payload = {
      ...formData,
      pre_requisites: preRequisites,
    };
  
    try {
      const result = await addSubject({ formData: payload });
  
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
        Swal.fire({
          title: 'Error!',
          text: result.message,
          icon: 'error',
          confirmButtonText: 'Try Again',
        });
      }
    } catch (error) {
      setLoading(false);
  
      Swal.fire({
        title: 'Unexpected Error',
        text: 'Something went wrong. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };  

  return (
    <div className={`admin-pop-overlay ${show ? 'show' : 'hide'}`}>
      {show && (
        <>
          <button className='admin-pop-close' onClick={onClose}>×</button>
          <motion.div 
            className="admin-subject-pop" 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}  
            exit={{ opacity: 0, y: 50 }}     
            transition={{ duration: 0.3 }}    
          >
            <div className='header'>Add New Subject</div>

            <div className='form-group'>
              <div className='form-group-grid2'>
                <label htmlFor='curriculum_name'>
                  <p>Curriculum Name</p>
                  <input 
                    type='text' 
                    id='curriculum_name' 
                    name='curriculum_name' 
                    value={formData.curriculum_name}
                    onChange={handleChange}
                  />
                </label>
                <label htmlFor='subject_code'>
                  <p>Subject code</p>
                  <input 
                    type='text' 
                    id='subject_code' 
                    name='subject_code' 
                    value={formData.subject_code}
                    onChange={handleChange}
                  />
                </label>
                <label htmlFor='subject'>
                  <p>Subject name</p>
                  <input 
                    type='text' 
                    id='subject' 
                    name='subject' 
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </label>
                <label htmlFor='subject'>
                  <p>Year Level</p>
                  <select 
                    id="year_level" 
                    name="year_level" 
                    value={formData.year_level} 
                    onChange={handleChange}
                  >
                    <option value="1">1st year</option>
                    <option value="2">2nd year</option>
                    <option value="3">3rd year</option>
                    <option value="4">4th year</option>
                  </select>
                </label>
                
                <label htmlFor="year">
                  <p>Academic Year</p>
                  <select 
                    id="year" 
                    name="year" 
                    value={formData.year} 
                    onChange={handleChange}
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
                    onChange={handleChange}
                  >
                    <option value='1'>1st semester</option>
                    <option value='2'>2nd semester</option>
                    <option value='summer-1'>Summer 1st semester</option>
                    <option value='summer-2'>Summer 2nd semester</option>
                  </select>
                </label>
                <label htmlFor='lec_units'>
                  <p>Lec (Units)</p>
                  <input
                    type='text'
                    id='lec_unit'
                    name='lec_unit'
                    value={formData.lec_unit}
                    onChange={handleChange}
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
                    onChange={handleChange}
                  />
                </label>
                <label htmlFor='lab_units'>
                  <p>Lab (Units)</p>
                  <input
                    type='text'
                    id='lab_unit'
                    name='lab_unit'
                    value={formData.lab_unit}
                    onChange={handleChange}
                  />
                </label>
                <label htmlFor='lab_hours'>
                  <p>Lab (Hours)</p>
                  <input
                    type='text'
                    id='lab_hours'
                    name='lab_hours'
                    readOnly
                    value={formData.lab_hours}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className='form-group-grid'>
                {preRequisites.map((preRequisite, index) => (
                  <label key={index} htmlFor={`pre_requisites_${index}`}>
                    <p>Pre Requisites {index + 1}</p>
                    <select
                      id={`pre_requisites_${index}`}
                      name="pre_requisites"
                      value={preRequisite}
                      onChange={(event) => onPreRequisiteChange(index, event)}
                    >
                      {subjects.length === 0 ? (
                        <option value="">No subjects found</option>
                      ) : (
                        <>
                          <option value="">Select a subject</option>
                          {subjects.map((subject) => (
                            <option key={subject.subject_id} value={subject.subject_id}>
                              {subject.subject_code} - {subject.subject}
                            </option>
                          ))}
                        </>
                      )}
                    </select>
                  </label>
                ))}
              </div>
              <div className='add-input'>
                <button onClick={onAddPreRequisite}>+ Add Pre-Requisite</button>
              </div>
              <div className='admin-sub-pop'>
                <button onClick={handleSubmit} disabled={loading}>
                  {loading ? 'Adding...' : 'Add Subject'}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default AddSubjectPopup;
