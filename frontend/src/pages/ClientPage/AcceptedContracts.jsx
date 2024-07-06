import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './ClientPage.css'; // Import the CSS file

const AcceptedContracts = () => {
  const [contracts, setContracts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { userId, userRole } = location.state || {};

  const fetchContracts = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/client/clientaccept/${userId}`);
      console.log(response.data);
      setContracts(response.data);
    } catch (error) {
      console.error('Error fetching contracts:', error);
      // Handle error fetching contracts (e.g., show a message)
    }
  };

  useEffect(() => {
    if (userRole === 'client') {
      fetchContracts();
    } else {
      navigate('/'); // Redirect to home if userRole is not 'client'
    }
  }, [userId, userRole, navigate]);


  return (
    <div>
      <h1 className='title'>Ongoing Projects</h1>
      <div className="contracts">
        {contracts.length > 0 ? (
          contracts.map(contract => (
            <div key={contract._id} className="contract-card">
              <h2>{contract.title}</h2>
              <p>{contract.description}</p>
              <p>Contractor  : {contract.bids[0].bidderName}</p>
              <p>Budget : $ {contract.bids[0].amount}</p>
              <p>Status : {contract.status}</p>
            </div>
          ))
        ) : (
          <p>No contracts found.</p>
        )}
      </div>

    </div>
  );
};

export default AcceptedContracts
