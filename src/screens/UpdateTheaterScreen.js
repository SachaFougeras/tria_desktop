import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams
import '../stylesheet/main.css';

function UpdateTheaterScreen() {
  const [name, setName] = useState('');
  const [adress, setAdress] = useState('');
  const [description, setDescription] = useState('');
  const [SIRET, setSIRET] = useState('');
  const navigate = useNavigate();
  const { id } = useParams(); // Utilisez useParams pour récupérer l'ID du théâtre

  useEffect(() => {
    // Fonction pour charger les données du théâtre
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`https://api.triaonline.live/api/theatre/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          setName(data.name);
          setAdress(data.adress);
          setDescription(data.description);
          setSIRET(data.SIRET);
        } else {
          console.error('Failed to fetch theater:', data);
        }
      } catch (error) {
        console.error('Failed to fetch theater:', error);
      }
    };
    fetchData();
  }, [id]);

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel?')) {
      navigate('/PrincipalScreen');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`https://api.triaonline.live/api/theatre/edit/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, adress, description, SIRET })
      });
      const data = await response.json();
      if (data.status_code === 200) {
        if (window.confirm('Theater updated successfully. Click OK to go to the home page.')) {
          navigate('/PrincipalScreen');
        }
      } else {
        console.error('Failed to update theater:', data);
      }
    } catch (error) {
      console.error('Failed to update theater:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <div className="add-list" style={{ marginTop: '30px' }}> {/* Add margin-top here */}
        <h1  style={{ margin: '0', fontSize: '2em' }}>Modifier un théâtre</h1>
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
        <button className="buttonUpdate" type="button">Modifier</button>
        <button className="buttonAdd2" type="button" onClick={handleCancel}>Annuler</button> {/* Add this line */}
      </div>
      </div>
      </div>
    </form>
  );
}

export default UpdateTheaterScreen;