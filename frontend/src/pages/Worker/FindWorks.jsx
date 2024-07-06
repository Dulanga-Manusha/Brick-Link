import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';
import './Worker.css'; // Import the CSS file for Worker component styling

const Worker = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId, userRole } = location.state || {};
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedWorkerType, setSelectedWorkerType] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/worker/getAllProjects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        // Handle error (e.g., show error message)
      }
    };

    fetchProjects();
  }, []);

  const handleApply = async (projectId, workerType) => {
    try {
      const worker = {
        workerId: userId,
        workerType,
        status: 'pending',
      };
      const response = await axios.post(`http://127.0.0.1:5000/api/worker/apply/${projectId}`, worker);
      console.log('Application submitted successfully:', response.data);
      // Optionally, update UI or show a confirmation message
    } catch (error) {
      console.error('Error applying for work type:', error);
      // Handle error (e.g., show error message)
    }
  };

  const handleChangeProject = (projectId) => {
    setSelectedProjectId(projectId);
    setSelectedWorkerType(''); // Reset selected worker type when changing projects
  };

  const navigateToAppliedWorks = () => {

    navigate(`/applied-works/${userId}` , { state: { userId, userRole } })
    console.log('userId:', userId, 'userRole:', userRole)
  };

  return (
    <div className="worker-page">
      <h1 className="title">All Projects</h1>
      <div className="projects-list">
        {projects.map(project => (
          <div key={project._id} className="project-card">
            <h2>Contract ID: {project.contractId}</h2>
            <div className="worker-types">
              <h3>Worker Types:</h3>
              <ul>
                {project.workerTypes.map(workerType => (
                  <li key={workerType._id}>
                    <strong>Position:</strong> {workerType.position}<br />
                    <strong>Salary:</strong> ${workerType.salary}
                  </li>
                ))}
              </ul>
            </div>
            <div className="apply-form">
              {selectedProjectId === project._id ? (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleApply(project._id, selectedWorkerType);
                }}>
                  <label htmlFor="workerType">Apply for Worker Type:</label>
                  <select
                    id="workerType"
                    value={selectedWorkerType}
                    onChange={(e) => setSelectedWorkerType(e.target.value)}
                    required
                  >
                    <option value="">Select Worker Type</option>
                    {project.workerTypes.map(workerType => (
                      <option key={workerType._id} value={workerType.position}>{workerType.position}</option>
                    ))}
                  </select>
                  <button type="submit">Apply</button>
                </form>
              ) : (
                <button onClick={() => handleChangeProject(project._id)}>Apply for Work Type</button>
              )}
            </div>
          </div>
        ))}
      </div>
      <button className="navigate-button" onClick={navigateToAppliedWorks}>My Applied Works</button>
    </div>
  );
};

export default Worker;
