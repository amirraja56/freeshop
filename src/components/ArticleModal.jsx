import { useEffect, useState } from 'react';
import '../styles/ArticleModal.css';

const ArticleModal = ({ mode = 'create', articleData = {}, onClose, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Initialize form for edit
  useEffect(() => {
    if (mode === 'edit' && articleData) {
      setTitle(articleData.title || '');
      setDescription(articleData.description || '');
      setPreview(articleData.image || null);
    }
  }, [mode, articleData]);

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

    if (!title || !description || (!imageFile && mode === 'create' && !preview)) {
      alert('All fields are required.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      setLoading(true);
      const res = await fetch(
        mode === 'edit'
          ? `https://mamun-reza-freeshops-backend.vercel.app/api/v1/admin/Article/updateArticle/${articleData._id}`
          : 'https://mamun-reza-freeshops-backend.vercel.app/api/v1/admin/Article/createArticle',
        {
          method: mode === 'edit' ? 'PUT' : 'POST',
          body: formData,
        }
      );

      const data = await res.json();
      console.log(`${mode} response:`, data);

      const successStatus = mode === 'edit' ? 200 : 200;

      if (data.status === successStatus) {
        alert(`Article ${mode === 'edit' ? 'updated' : 'created'} successfully!`);
        onSuccess();
        onClose();
      } else {
        alert(data.message || `Failed to ${mode} article`);
      }
    } catch (error) {
      console.error(error);
      alert(`Error while ${mode === 'edit' ? 'updating' : 'creating'} article`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>{mode === 'edit' ? 'Edit Article' : 'Add Article'}</h2>

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
            placeholder="Enter article title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Description*</label>
          <textarea
            placeholder="Enter article description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Saving...' : (mode === 'edit' ? 'Update' : 'Save')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ArticleModal;
