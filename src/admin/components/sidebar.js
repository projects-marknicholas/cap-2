import { Link, useLocation } from 'react-router-dom';

// Assets
import DashboardSvg from '../../assets/svg/dashboard.svg';
import StudentsSvg from '../../assets/svg/students.svg';
import SubjectsSvg from '../../assets/svg/subjects.svg';
import AccountsSvg from '../../assets/svg/accounts.svg';
import CourseSvg from '../../assets/svg/course.svg';

// CSS
import '../../assets/css/admin/sidebar.css';

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <>
      <div className="admin-sidebar">
        <div className='link-group'>
          <Link
            to='/admin/'
            className={location.pathname === '/admin/' ? 'active' : ''}
          >
            <img src={DashboardSvg} alt="Dashboard" />
          </Link>
        </div>
        {/* <div className='link-group'>
          <Link
            to='/admin/students'
            className={location.pathname === '/admin/students' ? 'active' : ''}
          >
            <img src={StudentsSvg} alt="Students" />
          </Link>
        </div> */}
        <div className='link-group'>
          <Link
            to='/admin/curriculum'
            className={location.pathname === '/admin/curriculum' ? 'active' : ''}
          >
            <img src={SubjectsSvg} alt="Subjects" />
          </Link>
        </div>
        <div className='link-group'>
          <Link
            to='/admin/course'
            className={location.pathname === '/admin/course' ? 'active' : ''}
          >
            <img src={CourseSvg} alt="Course" />
          </Link>
        </div>
        <div className='link-group'>
          <Link
            to='/admin/enroll'
            className={location.pathname === '/admin/enroll' ? 'active' : ''}
          >
            <img src={StudentsSvg} alt="Students" />
          </Link>
        </div>
        <div className='link-group'>
          <Link
            to='/admin/accounts'
            className={location.pathname === '/admin/accounts' ? 'active' : ''}
          >
            <img src={AccountsSvg} alt="Accounts" />
          </Link>
        </div>
      </div>
    </>
  );
}

export default AdminSidebar;
