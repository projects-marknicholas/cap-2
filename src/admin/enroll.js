import { useEffect } from "react";

// Components
import AdminNavbar from "./components/navbar";
import AdminSidebar from "./components/sidebar";
import AdminTableEnroll from "./tables/enroll";

const AdminEnroll = () => {

  useEffect(() => {
    document.title = 'Enroll - Admin';
  }); 

  return(
    <>
      <div className="admin-section">
        <AdminNavbar/>
        <div className="admin-divider">
          <AdminSidebar/>
          <div className="admin-main">
            <AdminTableEnroll/>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminEnroll;