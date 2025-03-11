import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

// Assets
import DeclineSvg from "../../assets/svg/decline.svg";
import ViewSvg from "../../assets/svg/view.svg";

// API
import { getCurriculum, getStudents, getCourseList } from "../../integration/admin";

const AdminTableEnroll = () => {
  const [curriculumData, setCurriculumData] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedCurriculumYear, setSelectedCurriculumYear] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // New states for student search
  const [searchQuery, setSearchQuery] = useState("");
  const [studentData, setStudentData] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  // New states for course list
  const [courseList, setCourseList] = useState([]);
  const [showCourseList, setShowCourseList] = useState(false);
  const [loadingCourses, setLoadingCourses] = useState(false);

  // New states for year and semester filters
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");

  // Fetch curriculum data with pagination
  const fetchCurriculum = async (page = 1) => {
    try {
      const result = await getCurriculum({ page });

      if (result?.status === "success" && Array.isArray(result.data)) {
        setCurriculumData((prevData) =>
          page === 1 ? result.data : [...prevData, ...result.data]
        );
        setHasMore(result.data.length > 0);
      } else {
        console.error("Invalid response format:", result);
      }
    } catch (error) {
      console.error("Error fetching curriculum:", error);
    }
  };

  // Handle "Load more" option
  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchCurriculum(nextPage);
  };

  // Handle student search
  const handleSearch = async () => {
    if (!searchQuery) {
      Swal.fire("Error", "Please enter a Student ID to search.", "error");
      return;
    }

    setIsSearching(true);
    try {
      const result = await getStudents({ searchQuery, page: 1 });
      if (result?.status === "success" && result.data) {
        setStudentData(result.data[0]);
      } else {
        Swal.fire("Error", "No student found with the provided ID.", "error");
        setStudentData(null);
      }
    } catch (error) {
      console.error("Error searching for student:", error);
      Swal.fire("Error", "An error occurred while searching for the student.", "error");
    } finally {
      setIsSearching(false);
    }
  };

  // Fetch course list based on selected program and curriculum year
  const fetchCourses = async () => {
    if (!selectedProgram || !selectedCurriculumYear) {
      Swal.fire("Error", "Please select a program and curriculum year.", "error");
      return;
    }

    setLoadingCourses(true);
    try {
      const result = await getCourseList({ program: selectedProgram, curriculum_year: selectedCurriculumYear });

      if (result?.status === "success") {
        // Flatten the nested structure
        const flattenedCourses = [];
        Object.keys(result.data).forEach((year) => {
          Object.keys(result.data[year]).forEach((semester) => {
            result.data[year][semester].courses.forEach((course) => {
              flattenedCourses.push({
                ...course,
                program: selectedProgram,
                curriculum_year: selectedCurriculumYear,
                year_level: year,
                semester: semester,
                totals: result.data[year][semester].totals,
              });
            });
          });
        });

        setCourseList(flattenedCourses);
        setShowCourseList(true);
      } else {
        Swal.fire("Error", "No courses found for the selected program and curriculum year.", "error");
        setCourseList([]);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      Swal.fire("Error", "An error occurred while fetching courses.", "error");
    } finally {
      setLoadingCourses(false);
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

  // Filter courses based on selected year and semester
  const filteredCourses = courseList.filter((course) => {
    const matchesYear = selectedYear ? course.year_level === selectedYear : true;
    const matchesSemester = selectedSemester ? course.semester === selectedSemester : true;
    return matchesYear && matchesSemester;
  });

  const groupedCourses = groupCourses(filteredCourses);

  useEffect(() => {
    fetchCurriculum();
  }, []);

  return (
    <div className="table-holder">
      <div className="table-header">
        <div className="table-btns">{/* Add any buttons here if needed */}</div>
        <div className="search-filter">
          <input
            type="search"
            id="search"
            name="search"
            autoComplete="off"
            placeholder="Search Student ID"
            aria-label="Search Student ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch} disabled={isSearching}>
            {isSearching ? "Searching..." : "Proceed"}
          </button>
        </div>
      </div>

      {studentData && (
        <div className="enroll-student-info">
          <h3>Student Information</h3>
          <div className="enroll-student-info-grid">
            <div className="item">
              <span>First Name</span>
              <input type="text" disabled value={studentData.first_name} />
            </div>
            <div className="item">
              <span>Middle Name</span>
              <input type="text" disabled value={studentData.middle_name} />
            </div>
            <div className="item">
              <span>Last Name</span>
              <input type="text" disabled value={studentData.last_name} />
            </div>
            <div className="item">
              <span>Email-Address</span>
              <input type="text" disabled value={studentData.email} />
            </div>
            <div className="item">
              <span>Program</span>
              <select
                value={selectedProgram}
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  if (selectedValue === "load-more") {
                    handleLoadMore();
                  } else {
                    setSelectedProgram(selectedValue);
                  }
                }}
              >
                <option value="" disabled>
                  Select program
                </option>
                {curriculumData
                  .filter((curriculum, index, self) =>
                    index === self.findIndex((c) => c.program === curriculum.program)
                  )
                  .map((curriculum) => (
                    <option key={curriculum.id} value={curriculum.program}>
                      {curriculum.program} - {curriculum.description}
                    </option>
                  ))}
                {hasMore && <option value="load-more">Load more...</option>}
              </select>
            </div>
            <div className="item">
              <span>Curriculum Year</span>
              <select
                value={selectedCurriculumYear}
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  if (selectedValue === "load-more") {
                    handleLoadMore();
                  } else {
                    setSelectedCurriculumYear(selectedValue);
                  }
                }}
              >
                <option value="" disabled>
                  Select curriculum year
                </option>
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
                {hasMore && <option value="load-more">Load more...</option>}
              </select>
            </div>
          </div>
          <button onClick={fetchCourses} disabled={loadingCourses}>
            {loadingCourses ? "Loading..." : "Save"}
          </button>
        </div>
      )}

      {showCourseList && (
        <div className="course-list-filters">
          <div className="filter-item">
            <label>Year:</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="">All Years</option>
              {[...new Set(courseList.map((course) => course.year_level))].map(
                (year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                )
              )}
            </select>
          </div>
          <div className="filter-item">
            <label>Semester:</label>
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
            >
              <option value="">All Semesters</option>
              {[...new Set(courseList.map((course) => course.semester))].map(
                (semester) => (
                  <option key={semester} value={semester}>
                    {semester}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
      )}

      {showCourseList && (
        <div className="table-scrolling">
          {loadingCourses ? (
            <div className="table-semester">Loading...</div>
          ) : Object.keys(groupedCourses).length === 0 ? (
            <div className="table-semester">No data available</div>
          ) : (
            Object.keys(groupedCourses).map((year) => (
              <div key={year} className="year-group">
                <div className="table-semester">
                  <span>{year}</span>
                </div>
                {Object.keys(groupedCourses[year]).map((semester) => (
                  <div key={semester} className="semester-group">
                    <div className="table-semester">{semester}</div>
                    <table>
                      <thead>
                        <tr>
                          <th></th>
                          <th>Course Code</th>
                          <th>Course Description</th>
                          <th>Course Type</th>
                          <th>Units</th>
                          <th>Hours</th>
                          <th>Co-Requisite</th>
                          <th>Pre-Requisite</th>
                        </tr>
                      </thead>
                      <tbody>
                        {groupedCourses[year][semester].map((courseItem, index) => (
                          <tr key={index}>
                            <td>
                              <input
                                type="checkbox"
                              />
                            </td>
                            <td>{courseItem.course_code}</td>
                            <td>{courseItem.course_description}</td>
                            <td>{courseItem.course_type}</td>
                            <td>{courseItem.units}</td>
                            <td>{courseItem.hours}</td>
                            <td>
                              {courseItem.co_requisite && courseItem.co_requisite.length > 0
                                ? courseItem.co_requisite.join(", ")
                                : "N/A"}
                            </td>
                            <td>
                              {courseItem.pre_requisite && courseItem.pre_requisite.length > 0
                                ? courseItem.pre_requisite.join(", ")
                                : "N/A"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="table-semester">
                      Lecture Unit: {groupedCourses[year][semester][0].totals.lecture_units} - Lab Unit:{" "}
                      {groupedCourses[year][semester][0].totals.lab_units} - TOTAL UNITS:{" "}
                      {groupedCourses[year][semester][0].totals.total_units}
                    </div>
                    <br />
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminTableEnroll;