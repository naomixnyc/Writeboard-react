import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { default as jwtDecode };
// import jwtDecode from 'jwt-decode';
import { jwtDecode } from 'jwt-decode'; // <------- THIS!!!
import CommentModal from './CommentModal';
import baseURL from '../api-config.js';

import './Articles.css'; // Shared styles
import './ArticlePage.css';

function ArticlePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchArticle = async () => {
    try {
      const res = await fetch(`${baseURL}/articles/${id}`);
      const data = await res.json();
      setArticle(data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);

        setCurrentUserId(decoded.id || decoded._id || null);
      } catch (err) {
        console.error('Invalid token:', err);
      }
    }
  }, []);

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const handleDelete = async () => {
    try {
      await fetch(`baseURL/articles/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // correct Bearer Token header
        },
      });
      navigate('/');
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleCommentPosted = async () => {
    await fetchArticle();
  };

  const isAuthor =
    article && currentUserId && String(article.author?._id) === String(currentUserId);

  return (
    <div>
      {article ? (
        <>
        <div className="read-link" onClick={() => navigate('/')}>
          <svg className="read-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="11" fill="none" stroke="#000" strokeWidth="1.5" />
            <path d="M14 8l-4 4 4 4" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          ALL ARTICLES
        </div>

        <h1 className="articlepage-title">{article.title}</h1>
        <p className="article-description">{article.description}</p>

        <p className="article-meta">
          By <span className="article-author">{article.author?.name}</span> <br />
          Published {new Date(article.createdAt).toLocaleDateString()}
        </p>

        <div className="article-body" dangerouslySetInnerHTML={{ __html: article.sanitizedHtml }} />

        <div className="article-buttons">

          <button className="new-article-button white" onClick={() => setShowModal(true)}>
            Comment
          </button>

          {isAuthor && (
            <>
              <button className="new-article-button grey" onClick={() => navigate(`/articles/${article._id}/edit`)}>
                Edit
              </button>
              <button className="new-article-button red" onClick={handleDelete}>
                Delete
              </button>
            </>
          )}
        </div>

        <h3>Comments</h3>
        {/* <ul>
          {article.comments?.map((c) => (
            <li key={c._id}>
              <strong>{c.author?.name}:</strong> {c.content}
            </li>
          ))}
        </ul> */}
        <ul className="comment-list">
  {article.comments?.map((c) => (
    <li key={c._id}>
      <strong>{c.author?.name}:</strong> {c.content}
    </li>
  ))}
</ul>
      </>
    ) : (
      <div>Loading article...</div>
    )}

    {showModal && (
      <CommentModal
        articleId={article?._id}
        onClose={() => setShowModal(false)}
        onCommentPosted={handleCommentPosted}
      />
    )}
  </div>
  );
}

export default ArticlePage;
