import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ClientPage = ({ userId, userRole }) => {
  const [contracts, setContracts] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const response = await axios.get(`/api/contracts/client/${userId}`);
        setContracts(response.data);
      } catch (error) {
        console.error('Error fetching contracts:', error);
      }
    };

    if (userRole === 'client') {
      fetchContracts();
    } else {

      navigate('/'); 
    }
  }, [userId, userRole, navigate]);

  return (
    <div>
      <h1>Your Contracts</h1>
      <div className="contracts">
        {contracts.map(contract => (
          <div key={contract._id} className="contract-card">
            <h2>{contract.title}</h2>
            <p>{contract.description}</p>
            <h3>Bids:</h3>
            <ul>
              {contract.bids.map(bid => (
                <li key={bid.bidId}>
                  {bid.bidderName} - ${bid.amount}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientPage;
