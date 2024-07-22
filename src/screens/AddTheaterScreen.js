import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../stylesheet/main.css';

function AddTheaterScreen() {
  const [name, setName] = useState('');
  const [adress, setAdress] = useState('');
  const [description, setDescription] = useState('');
  const [SIRET, setSIRET] = useState('');

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel?')) {
      navigate('/PrincipalScreen');
    }
  };
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token'); // Replace 'token' with the key you used to store the token

    try {
      const response = await fetch('https://api.triaonline.live/api/theater/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, adress, SIRET })
      });

      const data = await response.json();

      if (data.status_code === 200) {
        if (window.confirm('Theater created successfully. Click OK to go to the home page.')) { // Add this line
          navigate('/PrincipalScreen'); // Use navigate instead of history.push
        }
      } else {
        console.error('Failed to create theater:', data);
      }
    } catch (error) {
      console.error('Failed to create theater:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <div className="add-list" style={{ marginTop: '30px' }}> {/* Add margin-top here */}
        <h1  style={{ margin: '0', fontSize: '2em' }}>Ajouter un théâtre</h1>
        <div className="add-card">
        <div className="inputGroup">
      <label>
        <input className="inputGroupInput" type="text" value={name} onChange={e => setName(e.target.value)} required style={{ width: '100%' }} placeholder="Nom du théâtre" /> {/* Add placeholder here */}
      </label>
      </div>
      <div className="inputGroup">
      <label>
        <input className="inputGroupInput" type="text" value={adress} onChange={e => setAdress(e.target.value)} required style={{ width: '100%' }} placeholder="Adresse du théâtre" /> {/* Add placeholder here */}
      </label>
      </div>
      <div className="inputGroup">
      <label>
        <input className="inputGroupInput" type="text" value={description} onChange={e => setDescription(e.target.value)} required style={{ width: '100%' }} placeholder="Description du théâtre" /> {/* Add placeholder here */}
      </label>
      </div>
        <div className="inputGroup">
      <label>
        <input className="inputGroupInput" type="text" value={SIRET} onChange={e => setSIRET(e.target.value)} required style={{ width: '100%' }} placeholder="SIRET du théâtre" /> {/* Add placeholder here */}
      </label>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button className="buttonUpdate" type="submit">Ajouter</button>
        <button className="buttonAdd2" type="button" onClick={handleCancel}>Annuler</button> {/* Add this line */}
      </div>
      </div>
      </div>
    </form>
  );
}

export default AddTheaterScreen;