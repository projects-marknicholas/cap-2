import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Assets
import DeclineSvg from '../../assets/svg/decline.svg';
import ViewSvg from '../../assets/svg/view.svg';

// Components
import AddCurriculumPopup from '../popup/add-curriculum';
import EditCurriculumPopup from '../popup/edit-curriculum';

const AdminTableCurriculum = () => {
  const [showAddSubject, setShowAddSubject] = useState(false);
  const [showEditCurriculum, setShowEditCurriculum] = useState(false);

  const handleOpenSubject = () => setShowAddSubject(true);
  const handleCloseSubject = () => setShowAddSubject(false);

  const handleOpenEditCurriculum = () => setShowEditCurriculum(true);
  const handleCloseEditCurriculum = () => setShowEditCurriculum(false);

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
              <tr>
                <td>BSIT</td>
                <td>Information Technology Program</td>
                <td>2024-2025</td>
                <td className="action-field">
                  <button className="view" onClick={handleOpenEditCurriculum}>
                    <img src={ViewSvg} alt="Edit" /> Edit
                  </button>
                  <button className="decline">
                    <img src={DeclineSvg} alt="Delete" /> Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="table-footer">
          <div className="item">
            <p>Showing 0 result(s)</p>
          </div>
          <div className="item center">
            <button className="load-more">
              Load More
            </button>
          </div>
          <div className="item right">
            <p>Total of 0 result(s)</p>
          </div>
        </div>
      </div>

      {/* Add Curriculum Popup */}
      <AddCurriculumPopup 
        show={showAddSubject} 
        onClose={handleCloseSubject} 
      />

      {/* Edit Curriculum Popup */}
      <EditCurriculumPopup 
        show={showEditCurriculum} 
        onClose={handleCloseEditCurriculum} 
      />
    </>
  );
};

export default AdminTableCurriculum;
