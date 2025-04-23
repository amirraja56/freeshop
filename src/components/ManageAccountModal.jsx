import '../styles/ManageAccountModal.css';

const ManageAccountModal = ({ onClose }) => {
  return (
    <>
      <div className="modal-backdrop" onClick={onClose}></div>

      <div className="manage-modal">
        <button className="modal-close-btn" onClick={onClose}>×</button>

        <div className="profile-upload-section">
          <div className="upload-icon">
            <span>📷</span>
          </div>
          <p className="upload-text">Upload Profile image</p>
        </div>

        <form className="account-form">
          <div className="form-row">
            <div className="form-group">
              <label>Admin First name</label>
              <input type="text" placeholder="Ramesh" />
            </div>
            <div className="form-group">
              <label>Admin Last name</label>
              <input type="text" placeholder="Sharma" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Contact Number</label>
              <input type="text" placeholder="+91 0987654321" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="rameshsharma@gmail.com" />
            </div>
          </div>

          <div className="form-group full-width">
            <label>Designation</label>
            <input type="text" placeholder="CEO" />
          </div>

          <div className="btn-row">
            <button type="submit" className="save-btn">Save</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ManageAccountModal;
