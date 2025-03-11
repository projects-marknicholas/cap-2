import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Assets
import Swal from 'sweetalert2';
import DeclineSvg from '../../assets/svg/decline.svg';
import ViewSvg from '../../assets/svg/view.svg';

// Components
import AddCurriculumPopup from '../popup/add-curriculum';
import EditCurriculumPopup from '../popup/edit-curriculum';

// API
import { getCurriculum, deleteCurriculum } from '../../integration/admin';

const AdminTableCurriculum = () => {
  const [showAddSubject, setShowAddSubject] = useState(false);
  const [showEditCurriculum, setShowEditCurriculum] = useState(false);
  const [curriculum, setCurriculum] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [editCurriculumData, setEditCurriculumData] = useState(null);

  const handleOpenSubject = () => setShowAddSubject(true);
  const handleCloseSubject = () => setShowAddSubject(false);

  const handleOpenEditCurriculum = (curriculum) => {
    setEditCurriculumData(curriculum); 
    setShowEditCurriculum(true);
  };

  const handleCloseEditCurriculum = () => {
    setEditCurriculumData(null); 
    setShowEditCurriculum(false);
  };

  const handleDeleteCurriculum = async (curriculum_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await deleteCurriculum({ curriculum_id });
  
        if (response.status === "success") {
          Swal.fire({
            title: "Deleted!",
            text: response.message,
            icon: "success",
            confirmButtonText: "OK"
          });
          refreshTable();
        } else {
          Swal.fire({
            title: "Error!",
            text: response.message,
            icon: "error",
            confirmButtonText: "Try Again"
          });
        }
      }
    });
  };  

  // Fetch curriculum from the API
  const fetchCurriculum = async (query, currentPage) => {
    setLoading(true);
    try {
      const result = await getCurriculum({ searchQuery: query, page: currentPage });
      if (result.status === 'success') {
        setCurriculum(prevCurriculum =>
          currentPage === 1 ? result.data : [...prevCurriculum, ...result.data]
        );
        setHasMore(result.data.length >= 50); 
      } else {
        console.error(result.message);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const refreshTable = () => {
    setPage(1);
    setHasMore(true);
    fetchCurriculum(searchQuery, 1);
  };

  useEffect(() => {
    fetchCurriculum(searchQuery, page);
  }, [page, searchQuery]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
    setHasMore(true); 
  };

  // Handle pagination
  const loadMore = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <>
      <div className="table-holder">
        <div className="table-header">
          <div className="table-btns">
            <Link onClick={handleOpenSubject} className="add-curriculum-btn">
              + Add New Curriculum
            </Link>
          </div>
          <div className="search-bar">
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
              aria-label="Search Curriculum"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div className="table-scrolling">
          <table>
            <thead>
              <tr>
                <th>Program</th>
                <th>Description</th>
                <th>Curriculum Year</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {curriculum.length > 0 ? (
                curriculum.map((item, index) => (
                  <tr key={index}>
                    <td>{item.program}</td>
                    <td>{item.description}</td>
                    <td>{item.curriculum_year}</td>
                    <td className="action-field">
                      <button className="view" onClick={() => handleOpenEditCurriculum(item)}>
                        <img src={ViewSvg} alt="Edit" /> Edit
                      </button>
                      <button className="decline" onClick={() => handleDeleteCurriculum(item.curriculum_id)}>
                        <img src={DeclineSvg} alt="Delete" /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="no-data">
                    No curriculum found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="table-footer">
          <div className="item">
            <p>Showing {curriculum.length} result(s)</p>
          </div>
          <div className="item center">
            {hasMore && !loading && (
              <button className="load-more" onClick={loadMore}>
                Load More
              </button>
            )}
            {loading && <p>Loading...</p>}
          </div>
          <div className="item right">
            <p>Total of {curriculum.length} result(s)</p>
          </div>
        </div>
      </div>

      {/* Add Curriculum Popup */}
      <AddCurriculumPopup 
        show={showAddSubject} 
        onClose={handleCloseSubject} 
        refreshTable={refreshTable}
      />

      {/* Edit Curriculum Popup */}
      <EditCurriculumPopup 
        show={showEditCurriculum} 
        onClose={handleCloseEditCurriculum} 
        refreshTable={refreshTable}
        curriculumData={editCurriculumData}
      />
    </>
  );
};

export default AdminTableCurriculum;
