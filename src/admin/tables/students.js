import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

// Components
import AssignStudentPop from '../popup/assign-student';

// Assets
import AssignSvg from '../../assets/svg/academic.svg';

// API
import { getStudents } from '../../integration/admin';

// CSS
import '../../assets/css/admin/table.css';

const AdminTableStudents = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [isAssignStudent, setIsAssignStudent] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const fetchStudents = async (query, currentPage) => {
    setLoading(true);
    try {
      const result = await getStudents({ searchQuery: query, page: currentPage });
      if (result.status === 'success') {
        setStudents((prev) =>
          currentPage === 1 ? result.data : [...prev, ...result.data]
        );
        setHasMore(result.data.length >= 50);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('An error occurred while fetching students.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents(searchQuery, page);
  }, [searchQuery, page]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setPage(1);
    setHasMore(true);
  };

  const loadMore = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleAssignStudentClick = (student) => {
    setSelectedStudent(student);
    setIsAssignStudent(true);
  };

  const closeAssignStudent = () => {
    setSelectedStudent(null);
    setIsAssignStudent(false);
  };

  return (
    <>
      <div className="table-holder">
        <div className="table-header">
          <div tabIndex="-1" className="search-bar">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="search"
              id="search"
              name="search"
              autoComplete="off"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div className="table-scrolling">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Student number</th>
                <th>Full name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index}>
                  <td>
                    <img src={student.profile || ''} alt="Student" />
                  </td>
                  <td>{student.student_number}</td>
                  <td>{`${student.first_name} ${student.last_name}`}</td>
                  <td>{student.email}</td>
                  <td className="action-field">
                    {/* <button
                      className="view"
                      onClick={() => handleAssignStudentClick(student)}
                    >
                      <img src={AssignSvg} alt="Assign" /> Assign
                    </button> */}
                  </td>
                </tr>
              ))}
              {!loading && students.length === 0 && (
                <tr>
                  <td colSpan="5">No results found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="table-footer">
          <div className="item">
            <p>Showing {students.length} result(s)</p>
          </div>
          <div className="item center">
            {hasMore && !searchQuery && (
              <button onClick={loadMore} disabled={loading} className="load-more">
                {loading ? 'Loading...' : 'Load More'}
              </button>
            )}
          </div>
          <div className="item right">
            <p>Total of {students.length} result(s)</p>
          </div>
        </div>
      </div>

      {isAssignStudent && 
        <AssignStudentPop 
          close={closeAssignStudent} 
          student={selectedStudent}
        />
      }
    </>
  );
};

export default AdminTableStudents;
