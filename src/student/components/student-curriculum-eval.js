import { useEffect, useState } from 'react';
import { getCurriculum } from '../../integration/student';
import '../../assets/css/student/student-eval.css';

const StudentCurriculumEval = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedSemester, setSelectedSemester] = useState('1');
  const [curriculumData, setCurriculumData] = useState([]);
  const [noSubjectsFound, setNoSubjectsFound] = useState(false);

  useEffect(() => {
    const fetchCurriculum = async () => {
      const response = await getCurriculum(selectedYear, selectedSemester);
      if (response.status === 'success') {
        if (response.data.length === 0) {
          setNoSubjectsFound(true);
          setCurriculumData([]);
        } else {
          setNoSubjectsFound(false);
          setCurriculumData(response.data);
        }
      } else {
        console.error(response.message);
        setNoSubjectsFound(true);
        setCurriculumData([]);
      }
    };

    fetchCurriculum();
  }, [selectedYear, selectedSemester]);

  const groupByYearAndSemester = (data) => {
    const grouped = data.reduce((acc, subject) => {
      const key = `${subject.year} ${subject.semester}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(subject);
      return acc;
    }, {});

    // Sort the grouped data by year and semester
    const sortedGroupedData = Object.keys(grouped)
    .sort((a, b) => {
      const [yearA, semesterA] = a.split(' ');
      const [yearB, semesterB] = b.split(' ');

      const yearDiff = parseInt(yearA) - parseInt(yearB);
      
      // First, compare years
      if (yearDiff !== 0) return yearDiff;

      // Now handle the sorting of semesters for the same year
      if (semesterA === '1') return -1; // First Semester comes first
      if (semesterB === '1') return 1;

      if (semesterA === 'summer-1') return -1; // Summer 1 comes after Second Semester
      if (semesterB === 'summer-1') return 1;

      if (semesterA === '2') return -1; // Second Semester comes after First Semester but before Summer 2
      if (semesterB === '2') return 1;

      if (semesterA === 'summer-2') return 1; // Summer 2 comes last
      if (semesterB === 'summer-2') return -1;

      return 0; // In case both semesters are the same
    })
    .reduce((acc, key) => {
      acc[key] = grouped[key];
      return acc;
    }, {});

  return sortedGroupedData;
  };

  const groupedData = groupByYearAndSemester(curriculumData);

  const handleYearChange = (e) => setSelectedYear(e.target.value);

  const years = Array.from({ length: 100 }, (_, index) => currentYear - index);
  const nextYear = parseInt(selectedYear) + 1;

  const formatSemester = (semester) => {
    if (semester === 'summer-1') {
      return 'Summer (First Semester)';
    }
    if (semester === 'summer-2') {
      return 'Summer (Second Semester)';
    }
    return semester === '1' ? 'First Semester' : 'Second Semester';
  };

  return (
    <div className="container">
      <div className="student-curriculum-header">
        <h1>Curriculum</h1>
        <div className="flex-curriculum">
          <select value={selectedYear} onChange={handleYearChange}>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <select value={nextYear} disabled onChange={handleYearChange}>
            <option value={nextYear}>{nextYear}</option>
          </select>
        </div>
      </div>

      {noSubjectsFound ? (
        <div className="student-evaluation">
          <h1>{`${selectedYear} Year, No Subjects`}</h1>
          <div className="data-table">
            <table>
              <thead>
                <tr>
                  <th>Curricular Name</th>
                  <th>Subject Code</th>
                  <th>Subject Description</th>
                  <th>Lec Hours</th>
                  <th>Lab Hours</th>
                  <th>Lec Units</th>
                  <th>Lab Units</th>
                  <th>Pre Requisites</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="8">No subjects found</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        Object.keys(groupedData).map((key) => {
          const [year, semester] = key.split(' ');
          const subjects = groupedData[key];
          const yearLevel =
            subjects?.[0]?.year_level == '1'
              ? "1st Year"
              : subjects?.[0]?.year_level == '2'
              ? "2nd Year"
              : subjects?.[0]?.year_level == '3'
              ? "3rd Year"
              : subjects?.[0]?.year_level == '4'
              ? "4th Year"
              : year;

          return (
            <div className="student-evaluation" key={key}>
              <h1>{`${year} ${yearLevel} ${formatSemester(semester)}`}</h1>

              <div className="data-table">
                <table>
                  <thead>
                    <tr>
                      <th>Curricular Name</th>
                      <th>Subject Code</th>
                      <th>Subject Description</th>
                      <th>Lec Hours</th>
                      <th>Lab Hours</th>
                      <th>Lec Units</th>
                      <th>Lab Units</th>
                      <th>Pre Requisites</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedData[key].map((subject) => (
                      <tr key={subject.subject_id}>
                        <td>{subject.curriculum_name}</td>
                        <td>{subject.subject_code}</td>
                        <td>{subject.subject}</td>
                        <td>{subject.lec_hours}</td>
                        <td>{subject.lab_hours}</td>
                        <td>{subject.lec_unit}</td>
                        <td>{subject.lab_unit}</td>
                        <td>
                          {subject.pre_requisites.length > 0 ? (
                            subject.pre_requisites.map((prerequisite, index) => (
                              <div key={index}>
                                {prerequisite.subject_code}
                              </div>
                            ))
                          ) : (
                            ''
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default StudentCurriculumEval;
