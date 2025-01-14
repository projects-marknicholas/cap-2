import { useEffect } from "react";

// Components
import AdminNavbar from "./components/navbar";
import AdminSidebar from "./components/sidebar";
import AdminTableCurriculum from "./tables/curriculum";

// CSS
import '../assets/css/admin/home.css';

const AdminCurriculum = () => {

  useEffect(() => {
    document.title = 'Curriculum - Admin';
  }); 

  return(
    <>
      <div className="admin-section">
        <AdminNavbar/>
        <div className="admin-divider">
          <AdminSidebar/>
          <div className="admin-main">
            <AdminTableCurriculum/>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminCurriculum;