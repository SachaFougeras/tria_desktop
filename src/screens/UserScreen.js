import React, { useEffect, useState } from 'react';
import Menu from './Menu';
import '../stylesheet/main.css';

function UserScreen() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token'); // Replace 'token' with the key you used to store the token
        const response = await fetch('https://api.triaonline.live/api/users', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (data.status_code === 200 && Array.isArray(data.data)) {
          setUsers(data.data);
        } else {
          console.error('Unexpected API response:', data);
        }
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    const token = localStorage.getItem('token');

    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`https://api.triaonline.live/api/users/delete/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.status_code === 200) {
        setUsers(users.filter(user => user.id !== userId));
      } else {
        console.error('Failed to delete user:', data);
      }
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  return (
    <div>
      <Menu />
      <div className="theater-list" style={{ marginTop: '150px' }}>
        {users && users.map((user, index) => (
          <div key={index} className="theater-card">
            <h2 className="itemTitle">{user.name} {user.first_name}</h2>
            <p>Email : {user.email}</p>
            <p>Téléphone : {user.phone}</p>
            <p>Date de naissance : {user.birth_date}</p>
            <button onClick={() => handleDelete(user.id)} className="buttonAdd">Supprimer</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserScreen;