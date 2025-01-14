import { useState, useEffect } from 'react';
import StudentSvg from '../../assets/svg/student.svg';
import AcademicSvg from '../../assets/svg/academic.svg';
import UnitsSvg from '../../assets/svg/units.svg';
import '../../assets/css/student/student-info.css';
import { getEnrollment } from '../../integration/student';

const StudentInfo = () => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const userData = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchData = async () => {
      const response = await getEnrollment(userData.user_id);

      if (response.status === 'success') {
        setStudentData(response.totals);
      } else {
        console.error('Error fetching data:', response.message);
      }
      setLoading(false);
    };

    fetchData();
  }, [userData.user_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="student-info">
        <div className="item">
          <div className="header">
            <p>Student Information</p>
            <img src={StudentSvg} alt="student-information" />
          </div>
          <div className="data">
            <div className="data-info">
              <div className="left">Student No:</div>
              <div className="right">{userData.student_number}</div>
            </div>
            <div className="data-info">
              <div className="left">Name:</div>
              <div className="right">{userData.first_name} {userData.middle_name} {userData.last_name}</div>
            </div>
            <div className="data-info">
              <div className="left">Course/Major:</div>
              <div className="right">BS Information Technology with {userData.curriculum_name}</div>
            </div>
          </div>
        </div>
        
        <div className="item">
          <div className="header">
            <p>Academic Status</p>
            <img src={AcademicSvg} alt="student-information" />
          </div>
          <div className="data">
            <div className="data-info">
              <div className="left">Academic Year:</div>
              <div className="right">
                {studentData?.academic_year?.year 
                  ? `${parseInt(studentData.academic_year.year) - 1} - ${studentData.academic_year.year}` 
                  : 'N/A'}
              </div>
            </div>
            <div className="data-info">
              <div className="left">Status:</div>
              <div className="right">Regular</div>
            </div>
            <div className="data-info">
              <div className="left">GWA:</div>
              <div className="right">{studentData?.gwa || 'N/A'}</div>
            </div>
          </div>
        </div>
        
        <div className="item">
          <div className="header">
            <p>Units Summary</p>
            <img src={UnitsSvg} alt="student-information" />
          </div>
          <div className="data">
            <div className="data-info">
              <div className="left">Total units taken:</div>
              <div className="right">{studentData?.lec_unit_taken || 'N/A'}</div>
            </div>
            <div className="data-info">
              <div className="left">Total units required:</div>
              <div className="right">{studentData?.lec_unit_required || 'N/A'}</div>
            </div>
            <div className="data-info">
              <div className="left">Remaining units:</div>
              <div className="right">{studentData?.remaining_lec_units || 'N/A'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentInfo;
