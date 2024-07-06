import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './Worker.css'; // Import the CSS file for AppliedWorks component styling

const AppliedWorks = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = location.state || {};
  console.log('userId:', userId)
  const [appliedProjects, setAppliedProjects] = useState([]);

  useEffect(() => {
    const fetchAppliedProjects = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/worker/getAppliedProjects/${userId}`);
        setAppliedProjects(response.data);
      } catch (error) {
        console.error('Error fetching applied projects:', error);
        // Handle error fetching applied projects
      }
    };

    fetchAppliedProjects();
  }, [userId]);

  const handleCancel = async (projectId) => {
    try {
        console.log(projectId, userId)
      const response = await axios.delete(`http://127.0.0.1:5000/api/worker/cancelApplication/${projectId}/${userId}`);
      console.log('Application cancelled successfully:', response.data);
      // Remove the cancelled project from the appliedProjects state
      setAppliedProjects(appliedProjects.filter(project => project.projectId !== projectId));
    } catch (error) {
      console.error('Error cancelling application:', error);
      // Handle error cancelling application
    }
  };

  return (
    <div className="applied-works">
      <h1 className="title">Applied Works</h1>
      {appliedProjects.length > 0 ? (
        <div className="applied-works-list">
          {appliedProjects.map((project) => (
            <div key={project.projectId} className="applied-work-card">
              <h2>Contract ID: {project.contractId}</h2>
              <p>You applied for "{project.appliedWorkType.position}"</p>
              <p>Salary: ${project.appliedWorkType.salary}</p>
              <button
                className="cancel-button"
                onClick={() => handleCancel(project.projectId)}
              >
                Cancel Application
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No applied works found.</p>
      )}
    </div>
  );
};

export default AppliedWorks;
