import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Header from './components/Header';

import Dashboard from './pages/Dashboard';
import Articles from './pages/Articles';
import Blogs from './pages/BlogPage';
import Careers from './pages/Careers';
import FAQs from './pages/FAQs';
import Login from './pages/Login';
import NotFound from './pages/NotFound.jsx';


import './App.css';
import ProtectedRoute from './components/ProtectedRoute.js';

function AppLayout() {
  return (
    <div className="app-layout">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="main-content">
        <Header />
        <div className="page-wrapper">
          <Routes>
            {/* Redirect root to dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/faqs" element={<FAQs />} />
            {/* Catch-all for unmatched routes */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
