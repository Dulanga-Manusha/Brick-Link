import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './Contractor.css'; // Ensure you create this CSS file for styling

const CurrentProjects = () => {
  const [projects, setProjects] = useState([]);
  const location = useLocation();
  const { userId } = location.state || {};

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/contract/${userId}/contracts`);
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };


  const handleCompleteProject = async (projectId) => {
    console.log('projectId:', projectId); 
    try {
      await axios.patch(`http://127.0.0.1:5000/api/contract/${projectId}/complete`);
      // Update the projects state after closing the project
      fetchProjects();
    } catch (error) {
      console.error('Error completing project:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="worker-requests-page">
      <h1 className="title">Current Projects</h1>
      <div className="project-list">
        {projects.length > 0 ? (
          projects.map(project => (
            <div key={project.id} className="project-card">
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <p>Client: {project.clientName}</p>
              <p>Budget: ${project.budget}</p>
              <div className="worker-requests">
                <h3>Current Workers:</h3>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Position</th>
                      <th>Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    {project.workers.map(worker => (
                      <tr key={worker._id}>
                        <td>{worker.workerName}</td>
                        <td>{worker.position}</td>
                        <td>${worker.salary}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="button-container">
                  <button className="complete-button" onClick={() => handleCompleteProject(project.id)}>Complete Project</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No projects found.</p>
        )}
      </div>
    </div>
  );
};

export default CurrentProjects
