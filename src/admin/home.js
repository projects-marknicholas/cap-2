import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Components
import AdminNavbar from "./components/navbar";
import AdminSidebar from "./components/sidebar";

// API
import { totals, dashboard } from "../integration/admin";

// CSS
import '../assets/css/admin/home.css';

const AdminHome = () => {
  const [dashboardData, setDashboardData] = useState({
    total_enrolleed: 0,
    total_passed: 0,
    total_failed: 0,
    total_admins: 0,
    total_students: 0,
  });

  const [monthlyEnrollees, setMonthlyEnrollees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = 'Dashboard - Admin';

    const fetchData = async () => {
      try {
        const [totalsResponse, dashboardResponse] = await Promise.all([totals(), dashboard()]);

        if (totalsResponse.status === "success") {
          setDashboardData(totalsResponse.data[0]);
        } else {
          setError(totalsResponse.message);
        }

        if (dashboardResponse.status === "success") {
          // Convert monthly enrollees object to array of { month, value }
          const monthlyData = Object.entries(dashboardResponse.data).map(([month, value]) => ({
            month: month.toUpperCase(),
            value,
          }));
          setMonthlyEnrollees(monthlyData);
        } else {
          setError(dashboardResponse.message);
        }
      } catch (err) {
        setError(err.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="admin-section">
        <AdminNavbar />
        <div className="admin-divider">
          <AdminSidebar />
          <div className="admin-main">
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>Error: {error}</div>
            ) : (
              <>
                <div className="admin-dash-grid">
                  <div className="item">
                    <p>Total Enrollees</p>
                    <h1>{dashboardData.total_enrolleed.toLocaleString()}</h1>
                  </div>
                  <div className="item">
                    <p>Total Passed</p>
                    <h1>{dashboardData.total_passed.toLocaleString()}</h1>
                  </div>
                  <div className="item">
                    <p>Total Failed</p>
                    <h1>{dashboardData.total_failed.toLocaleString()}</h1>
                  </div>
                  <div className="item">
                    <p>Total Admins</p>
                    <h1>{dashboardData.total_admins.toLocaleString()}</h1>
                  </div>
                  <div className="item">
                    <p>Total Students</p>
                    <h1>{dashboardData.total_students.toLocaleString()}</h1>
                  </div>
                </div>
                <div className="graph">
                  <h2>Monthly Enrollees</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyEnrollees}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#800000" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
