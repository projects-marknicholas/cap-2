import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Assets
import EditSvg from "../../assets/svg/edit.svg";

// Components
import AddSubjectPopup from "../popup/add-subject";
import EditSubjectPopup from "../popup/edit-subject";

// API
import { getSubjects } from "../../integration/admin";

// CSS
import "../../assets/css/admin/table.css";
import "../../assets/css/admin/view.css";

const AdminTableSubjects = () => {
  const [showAddSubject, setShowAddSubject] = useState(false);
  const [showEditSubject, setShowEditSubject] = useState(false);
  const [preRequisites, setPreRequisites] = useState([""]);
  const [subjects, setSubjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [subjectToEdit, setSubjectToEdit] = useState(null); 

  // Fetch subjects from the API
  const fetchSubjects = async (query, currentPage) => {
    setLoading(true);
    try {
      const result = await getSubjects({ searchQuery: query, page: currentPage });
      if (result.status === "success") {
        setSubjects(prevSubjects =>
          currentPage === 1 ? result.data : [...prevSubjects, ...result.data]
        );
        setHasMore(result.data.length >= 50);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("An error occurred while fetching subjects", error);
    } finally {
      setLoading(false);
    }
  };

  const refreshTable = () => {
    setPage(1);
    setHasMore(true);
    fetchSubjects(searchQuery, 1);
  };

  useEffect(() => {
    fetchSubjects(searchQuery, page);
  }, [page, searchQuery]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
    setHasMore(true); // Reset pagination when search query changes
  };

  // Handle pagination
  const loadMore = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleAddSubjectClick = () => {
    setShowAddSubject(!showAddSubject);
  };

  const handleEditSubjectClick = (subject) => {
    setSubjectToEdit(subject); // Set the subject to be edited
    setShowEditSubject(true); // Open the EditSubjectPopup
  };

  const handleCloseSubject = () => {
    setShowAddSubject(false);
    setShowEditSubject(false);
    setSubjectToEdit(null); // Reset the subject when closing
  };

  const handleAddPreRequisite = () => {
    setPreRequisites([...preRequisites, ""]);
  };

  const handlePreRequisiteChange = (index, event) => {
    const newPreRequisites = [...preRequisites];
    newPreRequisites[index] = event.target.value;
    setPreRequisites(newPreRequisites);
  };

  return (
    <>
      <div className="table-holder">
        <div className="table-header">
          <div className="table-btns">
            <Link onClick={handleAddSubjectClick}>+ Add Subject</Link>&nbsp;
            <Link to='/admin/curriculum'>View Curriculum</Link>
          </div>
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

        {/* Table Data */}
        <div className="table-scrolling">
          <table>
            <thead>
              <tr>
                <th>Curriculum name</th>
                <th>Subject code</th>
                <th>Subject name</th>
                <th>Lec (Hours)</th>
                <th>Lab (Hours)</th>
                <th>Lec (Units)</th>
                <th>Lab (Units)</th>
                <th>Year Level</th>
                <th>Academic Year</th>
                <th>Semester</th>
                <th>Pre requisites</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, index) => (
                <tr key={index}>
                  <td>{subject.curriculum_name}</td>
                  <td>{subject.subject_code}</td>
                  <td>{subject.subject}</td>
                  <td>{subject.lec_hours}</td>
                  <td>{subject.lab_hours}</td>
                  <td>{subject.lec_unit}</td>
                  <td>{subject.lab_unit}</td>
                  <td>
                    {{
                      '1': '1st Year',
                      '2': '2nd Year',
                      '3': '3rd Year',
                      '4': '4th Year'
                    }[subject.year_level] || 'Unknown Year Level'}
                  </td>
                  <td>{subject.year ? `${subject.year} - ${parseInt(subject.year) + 1}` : 'N/A'}</td>
                  <td>
                    {subject.semester === '1' ? '1st Semester' : 
                    subject.semester === '2' ? '2nd Semester' : 
                    subject.semester === 'summer-1' ? '1st Semester Summer' : 
                    subject.semester === 'summer-2' ? '2nd Semester Summer' : 
                    subject.semester === 'summer' ? 'Summer' : ''}
                  </td>
                  <td>{subject.pre_requisites.map(pre => pre.subject_code).join(", ")}</td>
                  <td className="action-field">
                    <button className="accept" onClick={() => handleEditSubjectClick(subject)}>
                      <img src={EditSvg} alt="Edit" /> Edit
                    </button>
                  </td>
                </tr>
              ))}
              {!loading && subjects.length === 0 && (
                <tr>
                  <td colSpan="8">No results found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="table-footer">
          <div className="item">
            <p>Showing {subjects.length} result(s)</p>
          </div>
          <div className="item center">
            {hasMore && !searchQuery && (
              <button onClick={loadMore} disabled={loading} className="load-more">
                {loading ? "Loading..." : "Load More"}
              </button>
            )}
          </div>
          <div className="item right">
            <p>Total of {subjects.length} result(s)</p>
          </div>
        </div>
      </div>

      {showAddSubject && (
        <AddSubjectPopup
          show={showAddSubject}
          onClose={handleCloseSubject}
          preRequisites={preRequisites}
          onAddPreRequisite={handleAddPreRequisite}
          onPreRequisiteChange={handlePreRequisiteChange}
          refreshTable={refreshTable}
        />
      )}

      {showEditSubject && subjectToEdit && (
        <EditSubjectPopup
          show={showEditSubject}
          onClose={handleCloseSubject}
          preRequisites={preRequisites}
          onAddPreRequisite={handleAddPreRequisite}
          onPreRequisiteChange={handlePreRequisiteChange}
          subject={subjectToEdit}
          refreshTable={refreshTable}
        />
      )}
    </>
  );
};

export default AdminTableSubjects;
