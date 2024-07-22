import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../stylesheet/main.css';

function AddShowScreen() {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [director, setDirector] = useState();
  const [theater_name, setTheaterName] = useState();
  const [duration, setDuration] = useState();
  const [actors, setActor] = useState();
  const [date, setDate] = useState();
  const [price, setPrice] = useState();
  const [theme_id, setThemeId] = useState();
  const [theater_id, setTheaterId] = useState();

  const navigate = useNavigate();

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel?')) {
      navigate('/PrincipalScreen');
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token'); // Get the token from localStorage

    const response = await fetch('https://api.triaonline.live/api/create/show', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Add the token to the request header
      },
      body: JSON.stringify({ title, description, director, theater_name, duration, actors, date, price, theme_id, theater_id }),
    });

    const data = await response.json();
    console.log('Received response:', data); 
    
    if (data.errorList) {
      console.log('Validation errors:', data.errorList);
    }
    
    if (response.ok) {
      alert(`Vous êtes sur le point d'ajouter un spectacle. Voulez vous continuer?`);
      navigate('/PrincipalScreen');
    } else {
      alert('Failed to create show: ' + data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    <div className="add-list" style={{ marginTop: '30px' }}>
      <h1 style={{ margin: '0', fontSize: '2em' }}>Ajouter un spectacle</h1>
      <div className="add-card">
        <div className="inputGroup">
        <input className="inputGroupInput"  type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Titre" required />
      </div>
      <div className="inputGroup">
      <textarea value={description} className="inputGroupInput" onChange={e => setDescription(e.target.value)} style={{ width: '100%', height:'100px' }}  placeholder="Description" required />
      </div>
      <div className="inputGroup">
      <input className="inputGroupInput"type="text" value={director} onChange={e => setDirector(e.target.value)} placeholder="Mise en scène" required />
      </div>
      <div className="inputGroup">
      <input className="inputGroupInput"type="text" value={actors} onChange={e => setActor(e.target.value)} placeholder="Comédiens" required />
      </div>
      <div className="inputGroup">
      <input className="inputGroupInput" type="text" value={theater_name} onChange={e => setTheaterName(e.target.value)} placeholder="Nom du théâtre" required />
      </div>
      <div className="inputGroup">
      <input className="inputGroupInput" type="text" value={duration} onChange={e => setDuration(e.target.value)} placeholder="Duration" required />
      </div>
      <div className="inputGroup">
      <input className="inputGroupInput" type="text" value={date} onChange={e => setDate(e.target.value)} placeholder="Date" required />
      </div>
      <div className="inputGroup">
      <input className="inputGroupInput" type="text" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" required />
      </div>
      <div className="inputGroup">
      <input className="inputGroupInput" type="number" value={theme_id} onChange={e => setThemeId(e.target.value)} placeholder="Theme ID" required />
      </div>
      <div className="inputGroup">
      <input className="inputGroupInput" type="number" value={theater_id} onChange={e => setTheaterId(e.target.value)} placeholder="Theater ID" required />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <button className="buttonUpdate" type="submit">Ajouter</button>
     <button className="buttonAdd2" type="button" onClick={handleCancel}>Annuler</button>
     </div>
      </div>
      </div>
    </form>
  );
}

export default AddShowScreen;