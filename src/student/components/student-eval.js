import React, { useEffect, useState } from 'react';
import { getEnrollment } from '../../integration/student'; // Assuming this is correctly defined
import '../../assets/css/student/student-eval.css';

const StudentEval = () => {
  const [enrollmentData, setEnrollmentData] = useState(null); // Store enrollment data
  const [loading, setLoading] = useState(true); // Manage loading state
  const [error, setError] = useState(null); // Handle error state

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('user'))?.user_id; // Get userId from local storage

    if (userId) {
      const fetchData = async () => {
        try {
          const result = await getEnrollment(userId); // Call the API to fetch enrollment data
          if (result.status === 'success') {
            setEnrollmentData(result.enrollment); // Set the enrollment data
          } else {
            setError(result.message); // Handle error if API call fails
          }
        } catch (err) {
          setError('An error occurred while fetching enrollment data.'); // Catch any error from the API call
        }
        setLoading(false); // Set loading to false after data is fetched
      };

      fetchData();
    } else {
      setError('User not logged in.'); // Handle case when userId is not available
      setLoading(false);
    }
  }, []);

  // Helper function to calculate total lecture units
  const calculateTotalLecUnits = (subjects) => {
    return subjects.reduce((total, subject) => total + Number(subject.lec_unit), 0);
  };

  // Helper function to calculate credited units
  const calculateCreditedUnits = (subjects) => {
    return subjects
      .filter((subject) => subject.status === 'enrolled' || subject.status === 'passed')
      .reduce((total, subject) => total + Number(subject.lec_unit), 0);
  };

  // Helper function to calculate total lab units
  const calculateTotalLabUnits = (subjects) => {
    return subjects.reduce((total, subject) => total + Number(subject.lab_unit), 0);
  };

  // Helper function to calculate credited lab units
  const calculateCreditedLabUnits = (subjects) => {
    return subjects
      .filter((subject) => subject.status === 'enrolled' || subject.status === 'passed')
      .reduce((total, subject) => total + Number(subject.lab_unit), 0);
  };

  // Helper function to map calendar year to academic year
  const mapYearToAcademicYear = (year, index) => {
    const academicYear = `${index + 1}${getOrdinalSuffix(index + 1)} Year`;
    return academicYear;
  };

  // Helper function to get ordinal suffix (e.g., "1st", "2nd", "3rd")
  const getOrdinalSuffix = (n) => {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const value = n % 100;
    return suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0];
  };

  // Render component when loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error message if any
  if (error) {
    return <div>Error: {error}</div>;
  }

  const sortedYears = Object.keys(enrollmentData).sort(); 

  // Helper function to sort semesters correctly
  const sortSemesters = (semesters) => {
    return semesters.sort((a, b) => {
      if (a === '1') return -1;
      if (b === '1') return 1;
      if (a === 'summer-1') return -1;
      if (b === 'summer-1') return 1;
      if (a === '2') return -1;
      if (b === '2') return 1;
      if (a === 'summer-2') return -1;
      if (b === 'summer-2') return 1;
      return 0;
    });
  };

  // Mapping years to academic years
  const yearMapping = sortedYears.reduce((acc, year, index) => {
    acc[year] = mapYearToAcademicYear(year, index);
    return acc;
  }, {});

  return (
    <div className="container">
      {/* Check if enrollmentData exists and is not empty */}
      {enrollmentData ? (
        sortedYears.map((year, index) => (
          <div key={index}>
            {/* Render each year */}
            {sortSemesters(Object.keys(enrollmentData[year])).map((semester, idx) => {
              const subjects = enrollmentData[year][semester] || [];
              const totalLecUnits = calculateTotalLecUnits(subjects);
              const creditedUnits = calculateCreditedUnits(subjects);
              const academicYear =
                subjects.length > 0
                  ? subjects[0].year_level == '1'
                    ? '1st Year'
                    : subjects[0].year_level == '2'
                    ? '2nd Year'
                    : subjects[0].year_level == '3'
                    ? '3rd Year'
                    : subjects[0].year_level == '4'
                    ? '4th Year'
                    : 'N/A'
                  : 'N/A';
              const semesterName =
                semester === '1'
                  ? '1st Semester'
                  : semester === '2'
                  ? '2nd Semester'
                  : semester === 'summer-1'
                  ? `${year} Summer 1`
                  : semester === 'summer-2'
                  ? `${year} Summer 2`
                  : `${year} Summer`;

              return (
                <div className="student-evaluation" key={idx}>
                  <div className="evalit">
                    <h1>
                      {semester === 'summer-1'
                        ? `${academicYear} 1st Semester Summer`
                        : semester === 'summer-2'
                        ? `${academicYear} 2nd Semester Summer`
                        : `${academicYear} ${semesterName}`}
                    </h1>

                    <div className="unit-summary">
                      <p>Total Lec Required Units: {totalLecUnits}</p>
                      <p>Total Lec Units Credited: {creditedUnits}</p>
                      <p>Total Lab Required Units: {calculateTotalLabUnits(subjects)}</p>
                      <p>Total Lab Units Credited: {calculateCreditedLabUnits(subjects)}</p>
                    </div>
                  </div>

                  <div className="data-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Subject Code</th>
                          <th>Subject Description</th>
                          <th>Lec Hours</th>
                          <th>Lab Hours</th>
                          <th>Lec Units</th>
                          <th>Lab Units</th>
                          <th>Grade</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Ensure that semester has grades and map them */}
                        {subjects.length > 0 ? (
                          subjects.map((grade, idx) => (
                            <tr key={idx} className={grade.status || ''}>
                              <td>{grade.subject_code}</td>
                              <td>{grade.subject}</td>
                              <td>{grade.lec_hours}</td>
                              <td>{grade.lab_hours}</td>
                              <td>{grade.lec_unit}</td>
                              <td>{grade.lab_unit}</td>
                              <td>{grade.credits}</td>
                            </tr>
                          ))
                        ) : (
                          <tr><td colSpan="8">No grades available for this semester.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        ))
      ) : (
        <div>No enrollment data available.</div>
      )}
    </div>
  );
};

export default StudentEval;
