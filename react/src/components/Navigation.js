import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navigation" data-easytag="id1-react/src/components/Navigation.js">
      <div className="nav-container" data-easytag="id2-react/src/components/Navigation.js">
        <div className="nav-brand" data-easytag="id3-react/src/components/Navigation.js">
          <Link to="/" data-easytag="id4-react/src/components/Navigation.js">Главная</Link>
        </div>
        <div className="nav-links" data-easytag="id5-react/src/components/Navigation.js">
          {!token ? (
            <>
              <Link to="/register" className="nav-link" data-easytag="id6-react/src/components/Navigation.js">Регистрация</Link>
              <Link to="/login" className="nav-link" data-easytag="id7-react/src/components/Navigation.js">Вход</Link>
            </>
          ) : (
            <>
              <Link to="/profile" className="nav-link" data-easytag="id8-react/src/components/Navigation.js">Профиль</Link>
              <button onClick={handleLogout} className="nav-link nav-button" data-easytag="id9-react/src/components/Navigation.js">Выход</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
