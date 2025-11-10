import React from 'react';
import './Home.css';

const Home = () => {
  const token = localStorage.getItem('token');

  return (
    <div className="home-container" data-easytag="id1-react/src/pages/Home.js">
      <div className="home-content" data-easytag="id2-react/src/pages/Home.js">
        <div className="home-header" data-easytag="id3-react/src/pages/Home.js">
          <h1 data-easytag="id4-react/src/pages/Home.js">Добро пожаловать!</h1>
          <p data-easytag="id5-react/src/pages/Home.js">
            Система управления профилем пользователя
          </p>
        </div>

        <div className="home-buttons" data-easytag="id6-react/src/pages/Home.js">
          {token ? (
            <a href="/profile" className="home-button primary" data-easytag="id7-react/src/pages/Home.js">
              Перейти в профиль
            </a>
          ) : (
            <>
              <a href="/login" className="home-button primary" data-easytag="id8-react/src/pages/Home.js">
                Войти
              </a>
              <a href="/register" className="home-button secondary" data-easytag="id9-react/src/pages/Home.js">
                Регистрация
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
