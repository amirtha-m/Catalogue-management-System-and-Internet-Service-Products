import React from "react";
import AuthService from "../services/auth.service";
import "./Profile.css";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="profile-container">
      <div className="profile-background"></div>
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">{currentUser.username[0].toUpperCase()}</div>
          <h2 className="profile-name">{currentUser.username}</h2>
        </div>
        <div className="profile-body">
          <div className="profile-info">
            <div className="info-item">
              <span className="info-label">ID</span>
              <span className="info-value">{currentUser.id}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email</span>
              <span className="info-value">{currentUser.email}</span>
            </div>
          </div>
          <div className="profile-authorities">
            <h3 className="authorities-header">Roles & Authorities</h3>
            <ul className="authorities-list">
              {Array.isArray(currentUser.role) ? (
                currentUser.role.map((role, index) => (
                  <li className="authority-item" key={index}>
                    {role}
                  </li>
                ))
              ) : (
                <li className="authority-item">{currentUser.role}</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;