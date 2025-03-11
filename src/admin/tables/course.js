import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

// Assets
import DeclineSvg from '../../assets/svg/decline.svg';
import ViewSvg from '../../assets/svg/view.svg';

// Components
import AddCoursePopup from '../popup/add-course';
import EditCoursePopup from '../popup/edit-course';
import { getCourseList, getCurriculum, deleteCourse } from '../../integration/admin';

const AdminTableCourse = () => {
  const [showAddSubject, setShowAddSubject] = useState(false);
  const [showEditCourse, setShowEditCourse] = useState(false);
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState('');
  const [selectedCurriculumYear, setSelectedCurriculumYear] = useState('');
  const [curriculumData, setCurriculumData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [hasMore, setHasMore] = useState(true); // Track if more data is available

  const handleOpenSubject = () => setShowAddSubject(true);
  const handleCloseSubject = () => setShowAddSubject(false);

  const handleOpenEditCourse = (courseItem) => {
    setSelectedCourse(courseItem);
    setShowEditCourse(true);
    console.log(courseItem);
  };

  const handleCloseEditCourse = () => {
    setShowEditCourse(false);
    setSelectedCourse(null);
  };

  // Fetch curriculum data from the API with pagination
  const fetchCurriculum = async (page = 1) => {
    try {
      const result = await getCurriculum({ page });
      if (result.status === 'success') {
        if (page === 1) {
          // If it's the first page, replace the data
          setCurriculumData(result.data);
        } else {
          // If it's a subsequent page, append the data
          setCurriculumData((prevData) => [...prevData, ...result.data]);
        }
        // Check if there is more data to load
        setHasMore(result.data.length > 0);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Error fetching curriculum:', error);
    }
  };

  // Handle "Load more" option
  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchCurriculum(nextPage);
  };

  // Fetch course from the API
  const fetchCourse = async () => {
    setLoading(true);
    try {
      const program = document.getElementById('program').value;
      const curriculum_year = document.getElementById('curriculum_year').value;

      const result = await getCourseList({ program, curriculum_year });

      if (result.status === 'success') {
        // Flatten the nested structure
        const flattenedCourses = [];
        Object.keys(result.data).forEach(year => {
          Object.keys(result.data[year]).forEach(semester => {
            result.data[year][semester].courses.forEach(course => {
              flattenedCourses.push({
                ...course,
                program: program,
                curriculum_year: curriculum_year,
                year_level: year,
                semester: semester,
                totals: result.data[year][semester].totals, 
              });
            });
          });
        });

        setCourse(flattenedCourses);
      } else {
        console.error(result.message);
        setCourse([]); // Clear the course list if no data is returned
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      setCourse([]); // Clear the course list on error
    } finally {
      setLoading(false);
    }
  };

  // Group courses by year and semester
  const groupCourses = (courses) => {
    return courses.reduce((grouped, courseItem) => {
      const { year_level, semester } = courseItem;
      if (!grouped[year_level]) grouped[year_level] = {};
      if (!grouped[year_level][semester]) grouped[year_level][semester] = [];
      grouped[year_level][semester].push(courseItem);
      return grouped;
    }, {});
  };

  const handleDeleteCourse = async (courseId) => {
    // Confirmation popup
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this course. This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });
  
    // If the user confirms, proceed with deletion
    if (result.isConfirmed) {
      try {
        const deleteResult = await deleteCourse(courseId);
        if (deleteResult.status === 'success') {
          Swal.fire({
            icon: 'success',
            title: 'Course Deleted!',
            text: 'The course has been successfully deleted.',
          });
          fetchCourse(); // Refresh the table after deletion
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: deleteResult.message || 'Something went wrong while deleting the course.',
          });
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong while deleting the course.',
        });
      }
    }
  };

  const handleFilter = () => {
    const program = document.getElementById('program').value;
    const curriculumYear = document.getElementById('curriculum_year').value;

    setSelectedProgram(program);
    setSelectedCurriculumYear(curriculumYear);
    fetchCourse(); // Fetch courses based on the selected filter
  };

  useEffect(() => {
    fetchCurriculum(); // Fetch curriculum data on initial load
    fetchCourse(); // Fetch courses on initial load
  }, []);

  const groupedCourses = groupCourses(course);

  return (
    <>
      <div className="table-holder">
        <div className="table-header">
          <div className="table-btns">
            {selectedProgram && selectedCurriculumYear && (
              <Link onClick={handleOpenSubject} className="add-curriculum-btn">
                + Add New Course
              </Link>
            )}
          </div>
          <div className="search-filter">
            <select id='program' name='program'>
              <option>Select program</option>
              {curriculumData
                .filter((curriculum, index, self) =>
                  index === self.findIndex((c) => c.program === curriculum.program)
                )
                .map((curriculum) => (
                  <option key={curriculum.id} value={curriculum.program}>
                    {curriculum.program} - {curriculum.description}
                  </option>
                ))}
              {hasMore && (
                <option value="load-more" onClick={handleLoadMore}>
                  Load more...
                </option>
              )}
            </select>
            <select id="curriculum_year" name="curriculum_year">
              <option>Select Curriculum Year</option>
              {curriculumData
                .filter((curriculum, index, self) =>
                  index === self.findIndex((c) => c.curriculum_year === curriculum.curriculum_year)
                )
                .sort((a, b) => {
                  const [startA] = a.curriculum_year.split("-").map(Number);
                  const [startB] = b.curriculum_year.split("-").map(Number);
                  return startB - startA; // Sort descending by the first year
                })
                .map((curriculum) => (
                  <option key={curriculum.id} value={curriculum.curriculum_year}>
                    {curriculum.curriculum_year}
                  </option>
                ))}
              {hasMore && (
                <option value="load-more" onClick={handleLoadMore}>
                  Load more...
                </option>
              )}
            </select>
            <button onClick={handleFilter}>Proceed</button>
          </div>
        </div>

        <div className="table-scrolling">
          {loading ? (
            <div className='table-semester'>Loading...</div>
          ) : Object.keys(groupedCourses).length === 0 ? (
            <div className='table-semester'>No data available</div>
          ) : (
            Object.keys(groupedCourses).map((year) => (
              <div key={year} className="year-group">
                <div className='table-semester'><span>{year}</span></div>
                {Object.keys(groupedCourses[year]).map((semester) => (
                  <div key={semester} className="semester-group">
                    <div className='table-semester'>
                      {semester}
                    </div>
                    <table>
                      <thead>
                        <tr>
                          <th>Course Code</th>
                          <th>Course Description</th>
                          <th>Course Type</th>
                          <th>Units</th>
                          <th>Hours</th>
                          <th>Co-Requisite</th>
                          <th>Pre-Requisite</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {groupedCourses[year][semester].map((courseItem, index) => (
                          <tr key={index}>
                            <td>{courseItem.course_code}</td>
                            <td>{courseItem.course_description}</td>
                            <td>{courseItem.course_type}</td>
                            <td>{courseItem.units}</td>
                            <td>{courseItem.hours}</td>
                            <td>
                              {courseItem.co_requisite && courseItem.co_requisite.length > 0
                                ? courseItem.co_requisite.join(', ')
                                : 'N/A'}
                            </td>
                            <td>
                              {courseItem.pre_requisite && courseItem.pre_requisite.length > 0
                                ? courseItem.pre_requisite.join(', ')
                                : 'N/A'}
                            </td>
                            <td className="action-field">
                              <button className="view" onClick={() => handleOpenEditCourse(courseItem)}>
                                <img src={ViewSvg} alt="Edit" /> Edit
                              </button>
                              <button className="decline" onClick={() => handleDeleteCourse(courseItem.course_id)}>
                                <img src={DeclineSvg} alt="Delete" /> Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className='table-semester'>
                      Lecture Unit: {groupedCourses[year][semester][0].totals.lecture_units} - Lab Unit: {groupedCourses[year][semester][0].totals.lab_units} - TOTAL UNITS: {groupedCourses[year][semester][0].totals.total_units}
                    </div><br/>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add Course Popup */}
      <AddCoursePopup
        show={showAddSubject}
        onClose={handleCloseSubject}
        refreshTable={fetchCourse}
        program={selectedProgram}
        curriculumYear={selectedCurriculumYear}
      />

      {/* Edit Course Popup */}
      <EditCoursePopup
        show={showEditCourse}
        onClose={handleCloseEditCourse}
        refreshTable={fetchCourse}
        courseData={selectedCourse}
      />
    </>
  );
};

export default AdminTableCourse;