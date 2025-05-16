import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode' // for token data
import './Articles.css';
import './NewArticle.css'

function NewArticle() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const navigate = useNavigate();

  // token data
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setSelectedAuthor(decoded.id); // or decoded._id ????
      } catch (err) {
        console.error('Invalid token:', err);
      }
    }
  }, []);
  
  useEffect(() => {
    fetch('http://localhost:4000/articles/authors')
      .then(res => {
        if (!res.ok) { // check the response status
          throw new Error('Failed to fetch authors.');
        }
        return res.json(); // parse the JSON response if status is OK
      })
      .then(data => setAuthors(data)) // use the data directly
      .catch(err => {
        console.error('Error fetching authors:', err);
      });
  }, []);

  const handleCreate = async () => {
    try {
      await fetch('http://localhost:4000/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          content,
          author: selectedAuthor,
        }),
      });
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div className="articles-container"> 
      <h1>New Article</h1>
  
      {/* === Title field */}
      <div style={{ marginBottom: '1.2rem' }}>
        <label htmlFor="title">Title:</label><br />
        <input
          id="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="article-input title-input"
        />
      </div>
  
      <div style={{ marginBottom: '1.2rem' }}>
        <label htmlFor="description">Description:</label><br />
        <input
          id="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="article-input description-input"
        />
      </div>
  
      <div style={{ marginBottom: '1.5rem' }}>
        <label htmlFor="content">Content (Markdown is supported):</label><br />
        <textarea
          id="content"
          value={content}
          onChange={e => setContent(e.target.value)}
          className="article-input content-input" 
        />
      </div>
  
      <div style={{ marginBottom: '1.5rem' }}>
        <label htmlFor="author" style={{ marginRight: '0.5rem' }}>Author:</label>
        <select
          id="author"
          value={selectedAuthor}
          onChange={e => setSelectedAuthor(e.target.value)}
        >
          <option value="">Select Author</option>
          {authors.map(a => (
            <option key={a._id} value={a._id}>{a.name}</option>
          ))}
        </select>
      </div>
  
      <div className="article-buttons"> 
        <button className="new-article-button" onClick={handleCreate}>Create Article</button>
        <button className="new-article-button white" onClick={() => navigate('/')}>Cancel</button>
      </div>
    </div>
  );
  

}

export default NewArticle;