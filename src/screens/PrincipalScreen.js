import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import '../stylesheet/main.css';

function MainPage() {
  const [theaters, setTheaters] = useState([]);

  useEffect(() => {
    const fetchTheaters = async () => {
      try {
        const response = await fetch('https://api.triaonline.live/api/theaters/search');
        const data = await response.json();
        if (data.status_code === 200 && Array.isArray(data.theaters)) {
          setTheaters(data.theaters);
        } else {
          console.error('Unexpected API response:', data);
        }
      } catch (error) {
        console.error('Failed to fetch theaters:', error);
      }
    };

    fetchTheaters();
  }, []);

  return (
    <div>
      <Menu />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '450px' }}>
        <Link to="/add/theater" className="buttonAdd" style={{ textDecoration: 'none' }}>+ Ajouter</Link> {/* Add textDecoration: none here */}
      </div>
      <div className="theater-list" >
        {theaters.map((theater, index) => (
          <div key={index} className="theater-card">
            <h2 className="itemTitle">{theater.name}</h2>
            <p>{theater.adress}</p>
            <p>{theater.description}</p>
            <Link className="buttonShows" to={`/theater/${theater.id}/shows`}>Tous les pièces</Link>
            <Link to={`/update/theater/${theater.id}`} className="buttonUpdate" style={{ textDecoration: 'none' }}>Modifier</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainPage;