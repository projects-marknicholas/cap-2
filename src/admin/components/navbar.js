import { useState } from 'react';
import { Link } from 'react-router-dom';

// Assets
import Logo from '../../assets/img/logo.png';
import ArrowDownSvg from '../../assets/svg/arrow-down.svg';

// CSS
import '../../assets/css/admin/navbar.css';

const AdminNavbar = () => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const toggleTooltip = () => {
    setTooltipVisible(!isTooltipVisible);
  };

  const userData = JSON.parse(localStorage.getItem('user'));

  return(
    <>
      <div className="admin-nav">
        <div className="left">
          <img src={Logo}/>
          <div className="admin-nav-info">
            <p>College of Computer Studies</p>
            <span>Course Monitoring and Curriculum Tracking System</span>
          </div>
        </div>
        <div className="right">
          <div className="profile" onClick={toggleTooltip}>
            <div className="image">
              <img
                src={userData.profile}
              />
            </div>
            <p>{userData.first_name} {userData.last_name}</p>
            <img src={ArrowDownSvg}/>
            {isTooltipVisible && (
              <div className="tooltip">
                <Link>Account Settings</Link>
                <Link to='/auth/logout'>Logout</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminNavbar;