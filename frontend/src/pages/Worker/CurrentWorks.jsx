import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Worker.css';
import { useNavigate, useLocation } from 'react-router-dom';

const CurrentWorks = () => {
  const [projects, setProjects] = useState([]);
    const location = useLocation();

    const { userId, userRole } = location.state || {};

  useEffect(() => {
    // Fetch data from API
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/worker/${userId}/current-works`);
        setProjects(response.data);
        console.log('Current Works:', response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="current-works-page">
      <h1 className="title">Current Works</h1>
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <div className="projects-list">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <p><strong>Contractor Name:</strong> {project.contractorName}</p>
              <p><strong>Position:</strong> {project.workerPosition}</p>
              <p><strong>Salary:</strong> ${project.workerSalary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrentWorks;

