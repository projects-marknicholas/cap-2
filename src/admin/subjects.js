import { useEffect } from "react";

// Components
import AdminNavbar from "./components/navbar";
import AdminSidebar from "./components/sidebar";
import AdminTableSubjects from "./tables/subjects";

// CSS
import '../assets/css/admin/home.css';

const AdminStudents = () => {

  useEffect(() => {
    document.title = 'Subjects - Admin';
  }); 

  return(
    <>
      <div className="admin-section">
        <AdminNavbar/>
        <div className="admin-divider">
          <AdminSidebar/>
          <div className="admin-main">
            <AdminTableSubjects/>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminStudents;