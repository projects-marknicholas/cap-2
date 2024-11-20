import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Components
import Swal from 'sweetalert2';

// Assets
import RemoveSvg from '../../assets/svg/trash.svg';

// API
import { getAssign, updateAssign, getSubjects, insertAssign } from '../../integration/admin';

const AssignStudentPop = ({ close, student }) => {
  const [subjects, setSubjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [year, setYear] = useState('2024');
  const [semester, setSemester] = useState('1');
  const [isLoading, setIsLoading] = useState(false);
  const [modifiedSubjects, setModifiedSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null); // Track the selected subject

  // Fetch subjects for assignment
  const fetchSubjects = async () => {
    setIsLoading(true);
    try {
      const uid = student.user_id;
      const page = '1'; 
      const { status, data } = await getAssign({ searchQuery, page, year, semester, uid });
      if (status === 'success') {
        setSubjects(data);
        setModifiedSubjects(data);  
      } else {
        // handle error
      }
    } catch (error) {
      // handle error
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch subjects for search query
  const fetchFilteredSubjects = async () => {
    setIsLoading(true);
    try {
      const { status, data } = await getSubjects({ searchQuery });
      if (status === 'success') {
        setFilteredSubjects(data);
      } else {
        // handle error
      }
    } catch (error) {
      // handle error
    } finally {
      setIsLoading(false);
    }
  };

  // UseEffect to trigger fetch whenever filters or search query change
  useEffect(() => {
    fetchSubjects();
  }, [searchQuery, year, semester]);

  useEffect(() => {
    if (searchQuery.length >= 3) {
      fetchFilteredSubjects();
    } else {
      setFilteredSubjects([]);
    }
  }, [searchQuery]);

  // Handle credit change (track locally)
  const handleCreditChange = (subject, newCredits) => {
    if (newCredits === subject.credits) return;
    const updatedSubjects = modifiedSubjects.map((subj) =>
      subj.subject_id === subject.subject_id ? { ...subj, credits: newCredits } : subj
    );
    setModifiedSubjects(updatedSubjects);
  };

  // Handle checkbox toggle for enrollment status (track locally)
  const handleEnrollmentChange = (subject, isChecked) => {
    const updatedSubjects = modifiedSubjects.map((subj) =>
      subj.subject_id === subject.subject_id ? { ...subj, is_enrolled: isChecked ? 1 : 0 } : subj
    );
    setModifiedSubjects(updatedSubjects);
  };

  // Handle save changes
  const handleSaveChanges = async () => {
    try {
      const updatedSubjectsData = modifiedSubjects.filter(
        (subject, index) => subject.credits !== subjects[index].credits || subject.is_enrolled !== subjects[index].is_enrolled
      );
  
      if (updatedSubjectsData.length === 0) {
        Swal.fire({
          title: 'No Changes!',
          text: 'No changes detected to save.',
          icon: 'info',
          confirmButtonText: 'OK',
        });
        return;
      }
  
      for (let subject of updatedSubjectsData) {
        const { status, message } = await updateAssign({
          user_id: student.user_id,
          subject_id: subject.subject_id,
          is_enrolled: subject.is_enrolled ? 1 : 0,
          credits: subject.credits,
        });
  
        if (status !== 'success') {
          Swal.fire({
            title: 'Error!',
            text: message || 'An error occurred while saving this subject.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
          return;
        }
      }
  
      setSubjects(modifiedSubjects);
      Swal.fire({
        title: 'Success!',
        text: 'Changes saved successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while updating data. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  // Handle subject selection and insert assignment
  const handleSubjectSelect = async (subject) => {
    setSelectedSubject(subject);  // Update the selected subject

    try {
      const { status, message } = await insertAssign({
        user_id: student.user_id,
        subject_id: subject.subject_id,
      });

      if (status === 'success') {
        Swal.fire({
          title: 'Success!',
          text: message || 'Subject assigned successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        });

        // Clear the search field
        setSearchQuery('');

        // Re-fetch the subjects to display the updated data in the table
        fetchSubjects();
      } else {
        Swal.fire({
          title: 'Error!',
          text: message || 'An error occurred while assigning this subject.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while assigning this subject. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className='admin-pop-overlay'>
      <button className='admin-pop-close' onClick={close}>Close</button>
      <motion.div
        className="admin-subject-pop"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
      >
        <div className='header'>Assign Subject to {student.first_name} {student.last_name}</div>

        <div className="filters">
          <input
            type="search"
            id="search"
            name="search"
            placeholder="Search for subjects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            {Array.from({ length: 50 }, (_, index) => {
              const yearOption = new Date().getFullYear() - index; 
              return (
                <option key={yearOption} value={yearOption}>
                  {yearOption}
                </option>
              );
            })}
          </select>
          <select value={semester} onChange={(e) => setSemester(e.target.value)}>
            <option value="1">1st</option>
            <option value="2">2nd</option>
          </select>
        </div>

        {filteredSubjects.length > 0 && (
          <div className="assign-subject-dropdown">
            <ul>
              {filteredSubjects.map((subject, index) => (
                <li key={index} onClick={() => handleSubjectSelect(subject)}>
                  {subject.subject_code} - {subject.subject}
                </li>
              ))}
            </ul>
          </div>
        )}

        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="subs">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Subject Code</th>
                  <th>Description</th>
                  <th>Units (Lec)</th>
                  <th>Units (Lab)</th>
                  <th>Credits</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {subjects.length > 0 ? (
                  modifiedSubjects.map((subject, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="checkbox"
                          checked={subject.is_enrolled === 1}
                          onChange={(e) => handleEnrollmentChange(subject, e.target.checked)}
                        />
                      </td>
                      <td>
                        <div className="output">{subject.subject_code}</div>
                      </td>
                      <td>
                        <div className="output">{subject.subject}</div>
                      </td>
                      <td>
                        <div className="output">{subject.lec_unit}</div>
                      </td>
                      <td>
                        <div className="output">{subject.lab_unit}</div>
                      </td>
                      <td>
                        <input
                          type="number"
                          value={subject.credits}
                          onChange={(e) => handleCreditChange(subject, e.target.value)}
                        />
                      </td>
                      <td>
                        {subject.is_enrolled === 0 && (
                          <button>
                            <img src={RemoveSvg} alt="Remove" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No subjects assigned yet!</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        <div className="pop-footer">
          <button onClick={handleSaveChanges}>Save Changes</button>
        </div>
      </motion.div>
    </div>
  );
};

export default AssignStudentPop;
