import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateShowScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [real, setReal] = useState("");
  const [theater_name, setTheaterName] = useState("");
  const [durée, setDuration] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [theme_id, setThemeId] = useState("");
  const [theater_id, setTheaterId] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchShowData = async () => {
      const response = await fetch(`https://api.triaonline.live/api/show/${id}`);
      const data = await response.json();

      setTitle(data.title);
      setDescription(data.description);
      setReal(data.real);
      setTheaterName(data.theater_name);
      setDuration(data.durée);
      setDate(data.date);
      setPrice(data.price);
      setThemeId(data.theme_id);
      setTheaterId(data.theater_id);
    };

    fetchShowData();
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
      const response = await fetch(`https://api.triaonline.live/api/shows/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, description, real, theater_name, durée, date, price, theme_id, theater_id })
      });
  
      const data = await response.json();
      console.log('Update response:', data);
  
      if (data.status_code === 200) {
        if (window.confirm('Pièce de théâtre modifiee avec succès. Cliquez sur OK pour valider')){
          navigate('/PrincipalScreen');
        }
      } else {
        console.error('Failed to update show:', data);
      }
    } catch (error) {
      console.error('Une erreur est survenue', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    <div className="add-list" style={{ marginTop: '30px' }}>
      <h1 style={{ margin: '0', fontSize: '2em' }}>Modifier un spectacle</h1>
      <div className="add-card">
        <div className="inputGroup">
        <input className="inputGroupInput"  type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
      </div>
      <div className="inputGroup">
      <textarea value={description} className="inputGroupInput" onChange={e => setDescription(e.target.value)} style={{ width: '100%', height:'100px' }}  placeholder="Description" required />
      </div>
      <div className="inputGroup">
      <input className="inputGroupInput"type="text" value={real} onChange={e => setReal(e.target.value)} placeholder="Real" required />
      </div>
      <div className="inputGroup">
      <input className="inputGroupInput" type="text" value={theater_name} onChange={e => setTheaterName(e.target.value)} placeholder="Theater Name" required />
      </div>
      <div className="inputGroup">
      <input className="inputGroupInput" type="text" value={durée} onChange={e => setDuration(e.target.value)} placeholder="Duration" required />
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
      <button className="buttonUpdate" type="submit">Modifier</button>
     <button className="buttonAdd2" type="button" onClick={handleCancel}>Annuler</button>
     </div>
      </div>
      </div>
    </form>
  );
}

export default UpdateShowScreen;