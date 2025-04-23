import React, { useState } from 'react';
import '../styles/header.css';
import ManageAccountModal from './ManageAccountModal';

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <div className="spacer" />
          <input type="text" placeholder="Search..." className="search-bar" />

          <div className="header-actions">
            <button className="notification-btn">🔔</button>

            <div className="user-profile-wrapper" onClick={toggleDropdown}>
              <img src="/path-to-profile-pic.jpg" alt="User" className="profile-pic" />
              <div className="user-info">
                <span className="username">Kalyani Kumar</span>
                <span className="role">Admin</span>
              </div>
              <span className="arrow-icon">▾</span>
              {dropdownOpen && (
                <>
                  <div className="dropdown-backdrop" onClick={toggleDropdown}></div>
                  <ul className="dropdown-header">
                    <li onClick={() => setShowModal(true)}>👤 Manage Account</li>
                    <li>🔒 Change Password</li>
                    <li>🕓 Activity Log</li>
                    <li onClick={handleLogout}>🚪 Log out</li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
      {showModal && <ManageAccountModal onClose={() => setShowModal(false)} />}

    </>
  );
}

export default Header;
