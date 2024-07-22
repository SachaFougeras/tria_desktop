import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Menu from './Menu';
import '../stylesheet/main.css';

function ShowsScreen() {
  const { id } = useParams();
  console.log('Theater ID:', id); // Log the theater ID

  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch(`https://api.triaonline.live/api/theaters/${id}/shows`);
        const data = await response.json();
        console.log('API response:', data); // Log the API response

        if (data.status_code === 200 && Array.isArray(data.shows)) {
          setShows(data.shows);
        } else {
          console.error('Unexpected API response:', data);
        }
      } catch (error) {
        console.error('Failed to fetch shows:', error);
      }
    };

    fetchShows();
  }, [id]);
  const handleDelete = async (showId) => {
    const token = localStorage.getItem('token');
    const confirmDelete = window.confirm('Voulez-vous vraiment supprimer ce spectacle ?');
  if (!confirmDelete) {
    // If the user clicked "Cancel", stop here
    return;
  }

    try {
      const response = await fetch(`https://api.triaonline.live/api/show/delete/${showId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
   
      const data = await response.json();
  
      if (data.status_code === 200) {
        // Remove the deleted show from the state
        setShows(shows.filter(show => show.id !== showId));
      } else {
        console.error('Failed to delete show:', data);
      }
    } catch (error) {
      console.error('Failed to delete show:', error);
    }
  };

  console.log('Shows:', shows); // Log the shows

  return (
    <div>
      <Menu />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
      <Link to={`/theater/show`} className="buttonAdd" style={{ textDecoration: 'none' }}>+ Ajouter</Link> {/* Add textDecoration: none here */}
        </div>
      <div className="show-list">
        {shows.map((show, index) => (
          <div key={index} className="show-card">
            <h2 className="itemTitle">{show.title}</h2>
            <p>{show.description}</p>
            <p>Durée : {show.duration}</p>
            <p>Date : {show.date}</p>
            <p>Prix : {show.price}</p>
            <p>Mise en scène : {show.director}</p>
            <p>Comédiens : {show.actors}</p>
            <Link to={`/update/show/${show.id}`} className="buttonUpdate">Modifier</Link>
            <button onClick={() => handleDelete(show.id)} className="buttonAdd">Supprimer</button>
          </div>
        ))}
              
      </div>
    </div>
  );
}

export default ShowsScreen;