
//(Added reading and decoding token from localStorage on mount)
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import jwtDecode from 'jwt-decode';  // <-- DO NOT EVER IMPPORT this way!!
import { jwtDecode } from 'jwt-decode'; // for tokens // `npm install jwt-decode`
import Articles from './components/Articles';
import ArticlePage from './components/ArticlePage';
import NewArticle from './components/NewArticle';
import EditArticlePage from './components/EditArticlePage';
import TopBar from './components/TopBar';
import AuthModal from './components/AuthModal';
import './App.css';

const getRandomColor = () => {
  const colors = ['#f87171', '#60a5fa', '#34d399', '#facc15', '#a78bfa'];
  return colors[Math.floor(Math.random() * colors.length)];
};

function App() {
  const headerColor = getRandomColor();

  const [searchTerm, setSearchTerm] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // === check token on mount and decode it ===
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log('Decoded token:', decoded);
        setIsAuthenticated(true);
        setShowLogin(false);
        // You can optionally store decoded info to state here
      } catch (err) {
        console.error('Invalid token:', err);
        setIsAuthenticated(false);
        setShowLogin(true);
      }
    }
  }, []);


  const handleLogin = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthenticated(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');  // <-- REMOVE token on logout
    setIsAuthenticated(false);
    setShowLogin(true);
  };

  return (
    <Router>
      <TopBar
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
        openLoginModal={() => setShowLogin(true)}
      />

      <header className="placeholder-bar" style={{ height: '200px', backgroundColor: headerColor }}></header>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '0' }}>
        <main style={{ width: '700px', padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Articles searchTerm={searchTerm} />} />
            <Route path="/articles/new" element={<NewArticle />} />
            <Route path="/articles/:id" element={<ArticlePage />} />
            <Route path="/articles/:id/edit" element={<EditArticlePage />} />
          </Routes>
        </main>
      </div>

      {showLogin && <AuthModal onLogin={handleLogin} />}
    </Router>
  );
}

export default App;

