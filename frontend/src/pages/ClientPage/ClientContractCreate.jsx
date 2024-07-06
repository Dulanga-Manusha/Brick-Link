import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './ClientPage.css'; // Import the CSS file

const AddContractPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = location.state || {};

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/contract', {
        title,
        description,
        clientId: userId,
        bids: []
      });
      // Redirect to the client page after successful contract creation
      navigate(`/client/${userId}`, { state: { userId, userRole: 'client' } });
    } catch (error) {
      console.error('Error creating contract:', error);
      // Handle error creating contract (e.g., show a message)
    }
  };

  return (
    <div className="add-contract-page">
      <h1>Add New Contract</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Add Contract</button>
      </form>
    </div>
  );
};

export default AddContractPage;
