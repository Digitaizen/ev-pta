import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="page-container">
      <div className="container">
        <div className="page-header">
          <h1>Welcome, {user?.firstName}!</h1>
          <p className="page-subtitle">
            Your East View PTA member dashboard
          </p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>My Profile</h3>
            <p>View and update your membership information</p>
            <button className="btn btn-outline">Edit Profile</button>
          </div>

          <div className="dashboard-card">
            <h3>My Events</h3>
            <p>View events you've registered for</p>
            <button className="btn btn-outline">View Events</button>
          </div>

          <div className="dashboard-card">
            <h3>Volunteer Hours</h3>
            <p>Track your volunteer contributions</p>
            <button className="btn btn-outline">Log Hours</button>
          </div>

          <div className="dashboard-card">
            <h3>Membership Status</h3>
            <p>Status: <span className="status-badge">{user?.status}</span></p>
            <p>Type: {user?.membershipType}</p>
          </div>
        </div>

        {user?.role === 'admin' && (
          <div className="admin-section">
            <h2>Admin Functions</h2>
            <div className="admin-grid">
              <button className="btn btn-primary">Manage Users</button>
              <button className="btn btn-primary">Approve Posts</button>
              <button className="btn btn-primary">Event Management</button>
              <button className="btn btn-primary">Content Management</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
