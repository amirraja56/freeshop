import React, { useEffect, useState } from 'react';
import '../styles/BlogPage.css';
import BlogModal from '../components/BlogModal';
const API_URL = import.meta.env.VITE_API_BASE_URL;

function BlogPage() {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchBlogData = () => {
    setLoading(true);
    fetch(`${API_URL}/admin/allBlogPage`)
      .then((res) => res.json())
      .then((data) => {
        setBlog(data.data); // Ensure this is an array or single object as expected
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch blog:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!blog) return <p>No blog data found.</p>;

  return (
    <div className="blog-container">
      <div className="blog-header">
        <h2>Blog Page</h2>
        <button className="add-btn" onClick={() => setShowModal(true)}>+ Add new Blog</button>
      </div>

      <table className="blog-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Heading</th>
            <th>News Title</th>
            <th>News Description</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><img src={blog.image} alt="blog" className="blog-img" /></td>
            <td>{blog.title}</td>
            <td>{blog.description}</td>
            <td>{blog.heading}</td>
            <td>{blog.newsTitle}</td>
            <td>{blog.newsDescription}</td>
            <td><button className="delete-btn">Delete</button></td>
          </tr>
        </tbody>
      </table>
      {showModal && (
        <BlogModal
          mode="create"
          onClose={() => setShowModal(false)}
          onSuccess={fetchBlogData}
        />
      )}
    </div>
  );
}

export default BlogPage;
