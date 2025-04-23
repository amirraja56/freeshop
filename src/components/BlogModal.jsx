import { useState } from 'react';
import '../styles/ArticleModal.css';
const API_URL = import.meta.env.VITE_API_BASE_URL;

const BlogModal = ({ onClose, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !imageFile) {
      alert('All fields are required.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', imageFile);

    try {
      setLoading(true);
      const res = await fetch(
        `${API_URL}/admin/createBlogPage`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await res.json();
      if (data.status === 200) {
        alert('Blog created successfully!');
        onSuccess();
        onClose();
      } else {
        alert(data.message || 'Failed to create blog');
      }
    } catch (error) {
      console.error(error);
      alert('Error while creating blog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Add Blog</h2>

        <div className="image-upload">
          <div className="image-preview">
            {preview ? <img src={preview} alt="Preview" /> : <span>📷</span>}
          </div>
          <label className="upload-text">
            Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </label>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Title*</label>
          <input
            type="text"
            placeholder="Enter blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Description*</label>
          <textarea
            placeholder="Enter blog description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogModal;
