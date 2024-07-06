import React from 'react';
import { clientProjects } from '../../sampleData/clientProjects'; // Import sample data

const ClientProjects = () => {
  // Destructure contracts and bids from sampleData
  const { contracts, bids } = clientProjects;

  return (
    <div className="container">
      <h2>Contracts</h2>
      <div className="contract-list">
        {contracts.map(contract => (
          <div key={contract.id} className="card">
            <h3>{contract.title}</h3>
            <p>{contract.description}</p>
            <p>Client: {contract.client}</p>
            <p>Budget: ${contract.budget}</p>
            <p>Status: {contract.status}</p>
            <h4>Bids:</h4>
            <ul>
              {bids
                .filter(bid => bid.contractId === contract.id)
                .map(bid => (
                  <li key={bid.id}>
                    Contractor: {bid.contractor}, Amount: ${bid.amount}, Status: {bid.status}
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientProjects;
