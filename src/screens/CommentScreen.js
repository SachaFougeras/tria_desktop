import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Menu from './Menu';
import '../stylesheet/main.css';

function CommentScreen() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://api.triaonline.live/api/comments', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (data.status_code === 200 && Array.isArray(data.data)) {
          setComments(data.data);
        } else {
          console.error('Unexpected API response:', data);
        }
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      }
    };

    fetchComments();
  }, []);

  const handleDelete = async (commentId) => {
    const token = localStorage.getItem('token');

    const confirmDelete = window.confirm('Are you sure you want to delete this comment?');
    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`https://api.triaonline.live/api/comments/delete/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.status_code === 200) {
        setComments(comments.filter(comment => comment.id !== commentId));
      } else {
        console.error('Failed to delete comment:', data);
      }
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
  };

  const renderStars = (note) => {
    let stars = '';
    for (let i = 0; i < note; i++) {
      stars += '⭐';
    }
    return stars;
  };

  return (
    <div>
      <Menu />
      <div className="show-list" style={{ marginTop: '150px' }}>
        {comments && comments.map((comment, index) => (
          <div key={index} className="show-card">
             <h2 className="itemTitle">{renderStars(comment.note)}</h2>
            <p>{comment.content}</p>
            <button onClick={() => handleDelete(comment.id)} className="buttonAdd">Supprimer</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentScreen;