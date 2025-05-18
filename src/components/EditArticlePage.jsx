import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './NewArticle.css';
import './Articles.css';
import baseURL from '../api-config.js';

function ArticleEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [articleData, setArticleData] = useState({
    title: '',
    description: '',
    content: '',
    author: '',  // AUTHOR ID
  });
  const [authorName, setAuthorName] = useState(''); // DISPLAY NAME ONLY

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        // const res = await fetch(`http://localhost:4000/articles/${id}`);
        const res = await fetch(`${baseURL}/articles/${id}`);
        if (!res.ok) throw new Error('Failed to fetch article'); 

        const data = await res.json();

        const authorId = typeof data.author === 'object' ? data.author._id : data.author;
        const authorDisplayName = typeof data.author === 'object' ? data.author.name : '';

        setArticleData({
          title: data.title || '',
          description: data.description || '',
          content: data.content || '',
          // author: data.author._id || data.author || '',  // 
          author: authorId || '', // set correct author ID
        });
        setAuthorName(data.author.name || '');  // name for display //store name separately
      } catch (err) {
        console.error('Failed to fetch article:', err);
      }
    };

    fetchArticle();
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setArticleData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {


      // const res = await fetch(`http://localhost:4000/articles/${id}`, {
      const res = await fetch(`${baseURL}/articles/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(articleData),
      });

      if (!res.ok) {
        const errText = await res.text(); 
        throw new Error(errText || 'Update failed'); //<----- 

      }

      navigate(`/articles/${id}`, { state: { updated: true } });
    } catch (err) {
      console.error('Submit Edit Error:', err);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this article?');
    if (!confirmDelete) return;

    try {
      // const res = await fetch(`http://localhost:4000/articles/${id}`, {
      const res = await fetch(`${baseURL}/articles/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Delete failed');

      navigate('/');
    } catch (err) {
      console.error('Delete Error:', err);
    }
  };

  const handleCancel = () => {
    navigate(`/articles/${id}`);
  };

  return (
    <div className="articles-container">
      <h1>Edit Article</h1>
  
      <div style={{ marginBottom: '1.2rem' }}>
        <label htmlFor="title">Title:</label><br />
        <input
          id="title"
          name="title"
          className="article-input title-input"
          value={articleData.title}
          onChange={handleChange}
        />
      </div>
  
      <div style={{ marginBottom: '1.2rem' }}>
        <label htmlFor="description">Description:</label><br />
        <input
          id="description"
          name="description"
          className="article-input description-input"
          value={articleData.description}
          onChange={handleChange}
        />
      </div>
  
      {authorName && (
        <p className="article-meta" style={{ marginBottom: '1.5rem' }}>
          By <span className="article-author">{authorName}</span>
        </p>
      )}
  
      <div style={{ marginBottom: '1.5rem' }}>
        <label htmlFor="content">Content (Markdown supported):</label><br />
        <textarea
          id="content"
          name="content"
          className="article-input content-input"
          value={articleData.content}
          onChange={handleChange}
        />
      </div>
  
      <div className="article-buttons">
        <button
          className="new-article-button grey"
          onClick={handleSubmit}
        >
          Submit Edit
        </button>
  
        <button
          className="new-article-button white"
          onClick={handleCancel}
        >
          Cancel
        </button>
  
        <button
          className="new-article-button red"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ArticleEditPage;



