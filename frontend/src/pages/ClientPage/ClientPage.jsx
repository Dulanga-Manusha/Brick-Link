<<<<<<< Updated upstream
import React from 'react'

const ClientPage = () => {
  return (
    <div>
      Client
    </div>
  )
}

export default ClientPage
=======
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './ClientPage.css'; // Import the CSS file

const ClientPage = () => {
  const [contracts, setContracts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { userId, userRole } = location.state || {};

  const fetchContracts = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/client/clientopen/${userId}`);
      setContracts(response.data);
    } catch (error) {
      console.error('Error fetching contracts:', error);
      // Handle error fetching contracts (e.g., show a message)
    }
  };


  const handleAcceptBid = async (contractId, bidId) => {
    try {
      // Send a request to accept the bid 
      const response = await axios.post(`http://127.0.0.1:5000/api/client/${contractId}/bids/${bidId}/accept`);

      if(response.status === 200) {
        fetchContracts(); // Fetch contracts after accepting a bid
      }

    } catch (error) {
      console.error('Error accepting bid:', error);
    }
  };


  const handleRejectBid = async (contractId, bidId) => {
    try {
      // Send a request to reject the bid
      const response = await axios.post(`http://127.0.0.1:5000/api/client/${contractId}/bids/${bidId}/reject`);

      if(response.status === 200) {
        fetchContracts(); // Fetch contracts after accepting a bid
      }
    } catch (error) {
      console.error('Error rejecting bid:', error);
    }
  };

  const handleDeleteContract = async (contractId) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:5000/api/client/${contractId}`);

      if (response.status === 200) {
        fetchContracts(); // Fetch contracts after deleting a contract
      }
    } catch (error) {
      console.error('Error deleting contract:', error);
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
      <h1 className='title'>My Contracts</h1>
      
      <div className="contracts">
        {contracts.length > 0 ? (
          contracts.map(contract => (
            <div key={contract._id} className="contract-card">
              <h2>{contract.title}</h2>
              <p>{contract.description}</p>
              
              <ul className="bid-list">
              <h3>Bids:</h3>
                {contract.bids.length > 0 ? (
                  contract.bids.map(bid => (
                    <li key={bid.bidId}  className="bid-item">
                      {bid.bidderName} - ${bid.amount}
                      <div className="bid-actions">
                        <button onClick={() => handleAcceptBid(contract._id, bid.bidId)}>Accept</button>
                        <button onClick={() => handleRejectBid(contract._id, bid.bidId)}>Reject</button>
                      </div>
                    </li>
                  ))
                ) : (
                  <li>No bids yet</li>
                )}
              </ul>
              <button className="delete-button" onClick={() => handleDeleteContract(contract._id)}>Delete</button>
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
>>>>>>> Stashed changes
