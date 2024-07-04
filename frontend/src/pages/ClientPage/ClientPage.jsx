import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './ClientPage.css'; // Import the CSS file

const ClientPage = () => {
  const [contracts, setContracts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { userId, userRole } = location.state || {};

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/contract/client/${userId}`);
        setContracts(response.data);
      } catch (error) {
        console.error('Error fetching contracts:', error);
        // Handle error fetching contracts (e.g., show a message)
      }
    };

    if (userRole === 'client') {
      fetchContracts();
    } else {
      navigate('/'); // Redirect to home if userRole is not 'client'
    }
  }, [userId, userRole, navigate]);

  return (
    <div>
      <h1>Your Contracts</h1>
      <div className="contracts">
        {contracts.length > 0 ? (
          contracts.map(contract => (
            <div key={contract._id} className="contract-card">
              <h2>{contract.title}</h2>
              <p>{contract.description}</p>
              <h3>Bids:</h3>
              <ul>
                {contract.bids.length > 0 ? (
                  contract.bids.map(bid => (
                    <li key={bid.bidId}>
                      {bid.bidderName} - ${bid.amount}
                    </li>
                  ))
                ) : (
                  <li>No bids yet</li>
                )}
              </ul>
            </div>
          ))
        ) : (
          <p>No contracts found.</p>
        )}
      </div>
    </div>
  );
};

export default ClientPage;
