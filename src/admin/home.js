import { useEffect } from "react";

// Components
import AdminNavbar from "./components/navbar";
import AdminSidebar from "./components/sidebar";

// CSS
import '../assets/css/admin/home.css';

const AdminHome = () => {

  useEffect(() => {
    document.title = 'Dashboard - Admin';
  }); 

  return(
    <>
      <div className="admin-section">
        <AdminNavbar/>
        <div className="admin-divider">
          <AdminSidebar/>
          <div className="admin-main">
            <div className="admin-dash-grid">
              <div className="item">
                <p>Total Enrollees</p>
                <h1>10.k</h1>
                <i><span className="up">+13%</span> compare last sem</i>
              </div>
              <div className="item">
                <p>Total Passed</p>
                <h1>10.k</h1>
                <i><span className="down">+13%</span> compare last sem</i>
              </div>
              <div className="item">
                <p>Total Failed</p>
                <h1>10.k</h1>
                <i><span className="up">+13%</span> compare last sem</i>
              </div>
              <div className="item">
                <p>Total Admins</p>
                <h1>10.k</h1>
                <i><span className="down">+13%</span> compare last sem</i>
              </div>
              <div className="item">
                <p>Total Students</p>
                <h1>10.k</h1>
                <i><span className="up">+13%</span> compare last sem</i>
              </div>
            </div>
            <div className="graph"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminHome;