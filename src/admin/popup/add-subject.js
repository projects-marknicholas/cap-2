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
    subject_code: '',
    subject: '',
    lec_unit: '',
    lab_unit: '',
    lec_hours: '',
    lab_hours: '',
    year: '',
    semester: '',
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
          <button className='admin-pop-close' onClick={onClose}>Close</button>
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
                <label htmlFor='lec_hours'>
                  <p>Lec (Hours)</p>
                  <input 
                    type='text' 
                    id='lec_hours' 
                    name='lec_hours' 
                    value={formData.lec_hours}
                    onChange={handleChange}
                  />
                </label>
                <label htmlFor='lab_hours'>
                  <p>Lab (Hours)</p>
                  <input 
                    type='text' 
                    id='lab_hours' 
                    name='lab_hours' 
                    value={formData.lab_hours}
                    onChange={handleChange}
                  />
                </label>
                <label htmlFor='lec_unit'>
                  <p>Lec (Units)</p>
                  <input 
                    type='text' 
                    id='lec_unit' 
                    name='lec_unit' 
                    value={formData.lec_unit}
                    onChange={handleChange}
                  />
                </label>
                <label htmlFor='lab_unit'>
                  <p>Lab (Units)</p>
                  <input 
                    type='text' 
                    id='lab_unit' 
                    name='lab_unit' 
                    value={formData.lab_unit}
                    onChange={handleChange}
                  />
                </label>
                <label htmlFor='year'>
                  <p>Year</p>
                  <input 
                    type='text' 
                    id='year' 
                    name='year' 
                    value={formData.year}
                    onChange={handleChange}
                  />
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
                  </select>
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
