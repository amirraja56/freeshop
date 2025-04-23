import { NavLink } from 'react-router-dom';
import { useState } from 'react'; // For dropdown toggle
import '../styles/sidebar.css'; // Updated CSS for styling
import logo from '../assets/logo.png';

// Importing icons (you can use an icon library like FontAwesome or your own assets)
import { FaTachometerAlt, FaBook, FaQuestionCircle, FaNewspaper, FaCog, FaBriefcase, FaBullhorn, FaLock, FaShieldAlt } from 'react-icons/fa'; // Example using react-icons

function Sidebar() {
  // State to manage dropdown visibility
  const [isBlogDropdownOpen, setIsBlogDropdownOpen] = useState(false);
  const [isFreeShopNewsOpen, setIsFreeShopNewsOpen] = useState(false);

  return (
    <aside className="sidebar">
      <div className="logo-container">
        <img src={logo} alt="Freeshopps Logo" className="logo-image" />
      </div>
      <nav>
        <NavLink to="/dashboard" activeClassName="active">
          <FaTachometerAlt className="nav-icon" /> Dashboard
        </NavLink>
        <NavLink to="/articles" activeClassName="active">
          <FaBook className="nav-icon" /> Article
        </NavLink>
        {/* Blog Category with Dropdown */}
        <div className="dropdown">
          <button
            className="dropdown-toggle"
            onClick={() => setIsBlogDropdownOpen(!isBlogDropdownOpen)}
          >
            <FaBook className="nav-icon" /> Blog Category
            <span className={`arrow ${isBlogDropdownOpen ? 'open' : ''}`}>&gt;</span>
          </button>
          {isBlogDropdownOpen && (
            <div className="dropdown-menu">
              <NavLink to="/blogs" activeClassName="active">Blog Page</NavLink>
              <NavLink to="/blog" activeClassName="active">Blog</NavLink>
            </div>
          )}
        </div>

        <NavLink to="/faqs" activeClassName="active">
          <FaQuestionCircle className="nav-icon" /> FAQs
        </NavLink>

        {/* Free Shop News with Dropdown */}
        <div className="dropdown">
          <button
            className="dropdown-toggle"
            onClick={() => setIsFreeShopNewsOpen(!isFreeShopNewsOpen)}
          >
            <FaNewspaper className="nav-icon" /> Free shop news
            <span className={`arrow ${isFreeShopNewsOpen ? 'open' : ''}`}>&gt;</span>
          </button>
          {isFreeShopNewsOpen && (
            <div className="dropdown-menu">
              <NavLink to="/news1" activeClassName="active">News 1</NavLink>
              <NavLink to="/news2" activeClassName="active">News 2</NavLink>
            </div>
          )}
        </div>

        <NavLink to="/help-center" activeClassName="active">
          <FaCog className="nav-icon" /> Help Center
        </NavLink>
        <NavLink to="/jobs" activeClassName="active">
          <FaBriefcase className="nav-icon" /> Jobs
        </NavLink>
        <NavLink to="/product" activeClassName="active">
          <FaBullhorn className="nav-icon" /> Product
        </NavLink>
        <NavLink to="/privacy-terms" activeClassName="active">
          <FaLock className="nav-icon" /> Privacy & Terms
        </NavLink>
        <NavLink to="/trust-safety" activeClassName="active">
          <FaShieldAlt className="nav-icon" /> Trust & Safety
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;