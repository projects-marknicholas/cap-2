// Assets
import StudentSvg from '../../assets/svg/student.svg';
import AcademicSvg from '../../assets/svg/academic.svg';
import UnitsSvg from '../../assets/svg/units.svg';

// CSS
import '../../assets/css/student/student-info.css';

const StudentInfo = () => {
  return(
    <>
      <div className='container'>
        <div className="student-info">
          <div className="item">
            <div className="header">
              <p>Student Information</p>
              <img src={StudentSvg} alt="student-information"/>
            </div>
            <div className="data">
              <div className="data-info">
                <div className="left">Student No:</div>
                <div className="right">2024-0001</div>
              </div>
              <div className="data-info">
                <div className="left">Name:</div>
                <div className="right">John Doe</div>
              </div>
              <div className="data-info">
                <div className="left">Course/Major:</div>
                <div className="right">BS Computer Science</div>
              </div>
            </div>
          </div>
          
          <div className="item">
            <div className="header">
              <p>Academic Status</p>
              <img src={AcademicSvg} alt="student-information"/>
            </div>
            <div className="data">
              <div className="data-info">
                <div className="left">Year:</div>
                <div className="right">2023-2024</div>
              </div>
              <div className="data-info">
                <div className="left">Status:</div>
                <div className="right">Regular</div>
              </div>
              <div className="data-info">
                <div className="left">GWA:</div>
                <div className="right">1.75</div>
              </div>
            </div>
          </div>
          
          <div className="item">
            <div className="header">
              <p>Units Summary</p>
              <img src={UnitsSvg} alt="student-information"/>
            </div>
            <div className="data">
              <div className="data-info">
                <div className="left">Total units taken:</div>
                <div className="right">22.0</div>
              </div>
              <div className="data-info">
                <div className="left">Total units required:</div>
                <div className="right">22.0</div>
              </div>
              <div className="data-info">
                <div className="left">Remaining units:</div>
                <div className="right">0.0</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentInfo;