import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Contractor.css'; // Import the CSS file

const ContractorPage = () => {
  const [contracts, setContracts] = useState([]);
  const [showBidForm, setShowBidForm] = useState(false);
  const [bidData, setBidData] = useState({
    bidId: '',
    bidderName: '',
    amount: 0
  });
  const [selectedContractId, setSelectedContractId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/contract/getAllContracts');
        setContracts(response.data);
      } catch (error) {
        console.error('Error fetching contracts:', error);
        // Handle error fetching contracts (e.g., show a message)
      }
    };

    fetchContracts();
  }, []);

  const handleContractClick = (contractId) => {
    console.log('Contract ID:', contractId);
    setShowBidForm(true);
    setSelectedContractId(contractId);
    setBidData({
      bidId: `bid-${Date.now()}`, // Generate a unique bid ID (you can customize this logic)
      bidderName: '', // Reset bidder name
      amount: 0 // Reset bid amount
    });
  };

  const handleBidSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://127.0.0.1:5000/api/contract/${selectedContractId}/bids`,
        bidData
      );

      // Update contracts after successful bid addition
      const updatedContracts = contracts.map(contract => {
        if (contract._id === selectedContractId) {
          return {
            ...contract,
            bids: [...contract.bids, bidData] // Add the new bid to the existing bids array
          };
        }
        return contract;
      });

      setContracts(updatedContracts);
      setShowBidForm(false);
      setSelectedContractId(null);

      // Redirect to contractor page with state
      navigate(`/contractor/${userId}`, { state: { userId, userRole } });

    } catch (error) {
      console.error('Error adding bid:', error);
      // Handle error adding bid (e.g., show a message)
    }
  };

  return (
    <div className="contractor-page">
      <h1>All Contracts</h1>
      <div className="contract-list">
        {contracts.length > 0 ? (
          contracts.map(contract => (
            <div key={contract._id} className="contract-card">
              <h2>{contract.title}</h2>
              <p>{contract.description}</p>
              <h3>Posted by: {contract.clientId}</h3>
              <h3>Bids:</h3>
              <ul className="bid-list">
                {contract.bids.length > 0 ? (
                  contract.bids.map(bid => (
                    <li key={bid.bidId} className="bid-item">
                      {bid.bidderName} - ${bid.amount}
                    </li>
                  ))
                ) : (
                  <li>No bids yet</li>
                )}
              </ul>
              <button onClick={() => handleContractClick(contract._id)}>Add Bid</button>
            </div>
          ))
        ) : (
          <p>No contracts found.</p>
        )}
      </div>

      {/* Bid Form Modal */}
      {showBidForm && (
        <div className="bid-form-modal">
          <div className="bid-form-container">
            <h2>Add Bid</h2>
            <form onSubmit={handleBidSubmit}>
              <div className="form-group">
                <label htmlFor="bidderName">Bidder Name:</label>
                <input
                  type="text"
                  id="bidderName"
                  value={bidData.bidderName}
                  onChange={(e) => setBidData({ ...bidData, bidderName: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="amount">Bid Amount:</label>
                <input
                  type="number"
                  id="amount"
                  value={bidData.amount}
                  onChange={(e) => setBidData({ ...bidData, amount: parseFloat(e.target.value) })}
                  required
                />
              </div>
              <button type="submit">Submit Bid</button>
            </form>
          </div>
          <div className="modal-background" onClick={() => setShowBidForm(false)}></div>
        </div>
      )}
    </div>
  );
};
export default ContractorPage;
