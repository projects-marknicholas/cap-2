import { useEffect } from "react";

// Components
import AdminNavbar from "./components/navbar";
import AdminSidebar from "./components/sidebar";
import AdminTableStudents from "./tables/students";

// CSS
import '../assets/css/admin/home.css';

const AdminStudents = () => {

  useEffect(() => {
    document.title = 'Students - Admin';
  }); 

  return(
    <>
      <div className="admin-section">
        <AdminNavbar/>
        <div className="admin-divider">
          <AdminSidebar/>
          <div className="admin-main">
            <AdminTableStudents/>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminStudents;