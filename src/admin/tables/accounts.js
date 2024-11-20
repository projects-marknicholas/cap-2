import React, { useState, useEffect } from "react";

// Assets
import AcceptSvg from '../../assets/svg/accept.svg';
import DeclineSvg from '../../assets/svg/decline.svg';
import DeactivateSvg from '../../assets/svg/decline.svg';
import ActivateSvg from '../../assets/svg/accept.svg';

// Components
import Swal from "sweetalert2";

// API
import { getAccounts, updateAccount } from "../../integration/admin";

import '../../assets/css/admin/table.css';

const AdminTableAccounts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (query, currentPage) => {
    setLoading(true);
    try {
      const result = await getAccounts({ searchQuery: query, page: currentPage });
      if (result.status === 'success') {
        setData(prevData => currentPage === 1 ? result.data : [...prevData, ...result.data]);
        setHasMore(result.data.length >= 50);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(searchQuery, page);
  }, [page, searchQuery]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setPage(1);
    setHasMore(true);
  };

  const loadMore = () => {
    if (hasMore && !loading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  // Update account status
  const handleUpdateAccountStatus = async (uid, currentStatus) => {
    let newStatus;

    if (currentStatus === 'verified') {
      newStatus = 'deactivated';
    } else if (currentStatus === 'deactivated') {
      newStatus = 'verified';
    } else {
      newStatus = currentStatus === 'pending' ? 'verified' : 'pending';
    }

    try {
      const result = await updateAccount({ uid, status: newStatus });
      if (result.status === 'success') {
        Swal.fire('Success!', result.message, 'success');
        fetchData(searchQuery, page);
      } else {
        Swal.fire('Error!', result.message, 'error');
      }
    } catch (err) {
      setError("An error occurred while updating the account.");
    }
  };

  return (
    <>
      <div className="table-holder">
        <div className="table-header">
          <div tabIndex="-1" className="search-bar">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="search"
              id="search"
              name="search"
              autoComplete="off"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div className="table-scrolling">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Full name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Last login</th>
                <th>Joined at</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((account, index) => (
                <tr key={index}>
                  <td><img src={account.profile} alt="User" /></td>
                  <td>{account.first_name} {account.last_name}</td>
                  <td>{account.email}</td>
                  <td>{account.role}</td>
                  <td>{account.last_login}</td>
                  <td>{account.created_at}</td>
                  <td className="action-field">
                    {account.status === 'verified' ? (
                      <button className="decline" onClick={() => handleUpdateAccountStatus(account.user_id, account.status)}>
                        <img src={DeactivateSvg} alt="Deactivate" /> Deactivate
                      </button>
                    ) : account.status === 'deactivated' ? (
                      <button className="accept" onClick={() => handleUpdateAccountStatus(account.user_id, account.status)}>
                        <img src={ActivateSvg} alt="Activate" /> Activate
                      </button>
                    ) : (
                      <>
                        <button className="accept" onClick={() => handleUpdateAccountStatus(account.user_id, account.status)}>
                          <img src={AcceptSvg} alt="Accept" /> Accept
                        </button>
                        <button className="decline" onClick={() => handleUpdateAccountStatus(account.user_id, account.status)}>
                          <img src={DeclineSvg} alt="Decline" /> Decline
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
              {!loading && data.length === 0 && (
                <tr><td colSpan="7">No results found</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="table-footer">
          <div className="item">
            <p>Showing {data.length} result(s)</p>
          </div>
          <div className="item center">
            {hasMore && !searchQuery && (
              <button onClick={loadMore} disabled={loading} className="load-more">
                {loading ? "Loading..." : "Load More"}
              </button>
            )}
          </div>
          <div className="item right">
            <p>Total of {data.length} result(s)</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminTableAccounts;
