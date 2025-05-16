import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Articles.css'; 

function Articles() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('search') || '';

  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:4000/articles')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        return response.json();
      })
      .then((data) => {
        setArticles(data);
      })
      .catch((error) => {
        console.error('Error fetching articles:', error);
      });
  }, []);

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="articles-container">
      <h1>Articles</h1>
      <button className="new-article-btn" onClick={() => navigate("/articles/new")}>New Article</button>

      <p className="article-count">
        Showing {filteredArticles.length} of {articles.length} articles
        {searchTerm ? ` matching "${searchTerm}"` : ''}
      </p>

      {filteredArticles.map((article) => (
        <div key={article._id} className="article-block">
          <h2 className="article-title" onClick={() => navigate(`/articles/${article._id}`)}>
            {article.title}
          </h2>
          <p className="article-description">{article.description}</p>
          <p className="article-meta">
            By <span className="article-author">{article.author?.name || "Unknown"}</span> | Published {new Date(article.createdAt).toLocaleDateString()}
          </p>
          <div className="read-link" onClick={() => navigate(`/articles/${article._id}`)}>
            READ
            <svg className="read-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="11" fill="none" stroke="#000" strokeWidth="1.5" />
              <path d="M10 8l4 4-4 4" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Articles;


