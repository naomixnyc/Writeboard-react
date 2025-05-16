

import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // for token data
import './AuthModal.css';
import './Articles.css';  // buttons
import './CommentModal.css'; 

function CommentModal({ articleId, onClose, onCommentPosted }) { 
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [comment, setComment] = useState('');


  useEffect(() => {
    fetch('http://localhost:4000/articles/authors')
      .then(res => res.json())
      .then(data => {
        setAuthors(data);

        // automatically select logged-in user
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const decoded = jwtDecode(token);
            setSelectedAuthor(decoded.id); // or decoded._id depending on your token
          } catch (err) {
            console.error('Invalid token:', err);
          }
        }
      })
      .catch(console.error);
  }, []);

  const handlePost = async () => {
    try {
      const res = await fetch(`http://localhost:4000/articles/${articleId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ author: selectedAuthor, content: comment }),
      });

      const newComment = await res.json();

      if (onCommentPosted) onCommentPosted(newComment);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };
  const currentAuthor = authors.find(a => a._id === selectedAuthor);
  
  return (
    <div className="comment-modal">
      <h3 className="comment-title">Post a Comment</h3>

      <div className="comment-field">
      <label>Your Name:</label>
      {/* {currentAuthor ? (
        <div>{currentAuthor.name}</div> // display name instead of dropdown
      ) : (
        <select value={selectedAuthor} onChange={(e) => setSelectedAuthor(e.target.value)}>
          <option value="">Select Author</option>
          {authors.map((a) => (
            <option key={a._id} value={a._id}>
              {a.name}
            </option>
          ))}
        </select>
      )} */}
      {currentAuthor ? (
          <span className="author-name">{currentAuthor.name}</span>
        ) : (
          <select value={selectedAuthor} onChange={e => setSelectedAuthor(e.target.value)}>
            <option value="">Select Author</option>
            {authors.map(a => (
              <option key={a._id} value={a._id}>{a.name}</option>
            ))}
          </select>
        )}
      </div>
      

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Comment:</label>
        <textarea className="comment-textarea" value={comment} onChange={(e) => setComment(e.target.value)} />
      </div>


      <div className="article-buttons">
      <button className="new-article-button white" onClick={handlePost}>Post Comment</button>
      <button className="new-article-button white" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default CommentModal;


