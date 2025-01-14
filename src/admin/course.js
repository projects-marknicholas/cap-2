import { useEffect } from "react";

// Components
import AdminNavbar from "./components/navbar";
import AdminSidebar from "./components/sidebar";
import AdminTableCourse from "./tables/course";

// CSS
import '../assets/css/admin/home.css';

const AdminCourse = () => {

  useEffect(() => {
    document.title = 'Course - Admin';
  }); 

  return(
    <>
      <div className="admin-section">
        <AdminNavbar/>
        <div className="admin-divider">
          <AdminSidebar/>
          <div className="admin-main">
            <AdminTableCourse/>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminCourse;