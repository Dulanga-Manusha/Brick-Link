import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Contractor.css'; // Import the CSS file
import { useLocation } from 'react-router-dom';

const MyContracts = () => {
  const location = useLocation();

  const [contracts, setContracts] = useState([]);
  const [positions, setPositions] = useState({});
  const { userId, userRole } = location.state || {};

  const fetchContracts = async () => {
    try {
      console.log('userId:', userId);
      const response = await axios.get(`http://127.0.0.1:5000/api/contract/${userId}/mycontracts`);
      setContracts(response.data);
    } catch (error) {
      console.error('Error fetching contracts:', error);
      // Handle error fetching contracts
    }
  };

  const handleAddRow = (contractId) => {
    setPositions(prevPositions => ({
      ...prevPositions,
      [contractId]: [...(prevPositions[contractId] || []), { position: '', salary: '' }]
    }));
  };

  const handleInputChange = (contractId, index, field, value) => {
    const updatedPositions = (positions[contractId] || []).map((pos, i) =>
      i === index ? { ...pos, [field]: value } : pos
    );
    setPositions(prevPositions => ({
      ...prevPositions,
      [contractId]: updatedPositions
    }));
  };

  const handlePost = async (contractId) => {
    try {
      await axios.post(`http://127.0.0.1:5000/api/contract/${contractId}/request`, positions[contractId]);

      setPositions(prevPositions => ({
        ...prevPositions,
        [contractId]: []
      }));
      // Handle success (e.g., show a message or refresh data)
    } catch (error) {
      console.error('Error posting positions:', error);
      // Handle error
    }
  };

  // Load data when the page loads
  useEffect(() => {
    fetchContracts();
  }, [positions]);

  return (
    <div className="contractor-page">
      <h1 className='title'>Request For Workers</h1>
      <div className="contract-list">
        {contracts.length > 0 ? (
          contracts.map(contract => (
            <div key={contract._id} className="contract-card">
              <h2>{contract.title}</h2>
              <p>{contract.description}</p>
              <h3>Client: {contract.clientName}</h3>
              <p>Budget : $ {contract.bids[0].amount}</p>
              <table className="position-salary-table">
                <thead>
                  <tr>
                    <th>Position</th>
                    <th>Salary</th>
                  </tr>
                </thead>
                <tbody>
                  {(positions[contract._id] || []).map((pos, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="text"
                          value={pos.position}
                          onChange={(e) => handleInputChange(contract._id, index, 'position', e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={pos.salary}
                          onChange={(e) => handleInputChange(contract._id, index, 'salary', e.target.value)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="button-container">
                <button onClick={() => handleAddRow(contract._id)}>Add Row</button>
                <button onClick={() => handlePost(contract._id)}>Post</button>
              </div>
            </div>
          ))
        ) : (
          <p>No contracts found.</p>
        )}
      </div>
    </div>
  );
};

export default MyContracts;
