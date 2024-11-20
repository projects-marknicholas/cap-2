import { useEffect } from "react";

// Components
import AdminNavbar from "./components/navbar";
import AdminSidebar from "./components/sidebar";
import AdminTableAccounts from "./tables/accounts";

// CSS
import '../assets/css/admin/home.css';

const AdminAccounts = () => {

  useEffect(() => {
    document.title = 'Manage Accounts - Admin';
  }); 

  return(
    <>
      <div className="admin-section">
        <AdminNavbar/>
        <div className="admin-divider">
          <AdminSidebar/>
          <div className="admin-main">
            <AdminTableAccounts/>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminAccounts;