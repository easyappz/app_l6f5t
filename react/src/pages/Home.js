import React, { useState, useEffect } from 'react';
import './Home.css';

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <div className="home-container" data-easytag="id1-react/src/pages/Home.js">
      <div className="home-content" data-easytag="id2-react/src/pages/Home.js">
        <div className="hero-section" data-easytag="id3-react/src/pages/Home.js">
          <h1 className="welcome-title" data-easytag="id4-react/src/pages/Home.js">
            Добро пожаловать!
          </h1>
          <p className="welcome-subtitle" data-easytag="id5-react/src/pages/Home.js">
            Управление вашим профилем стало проще
          </p>
        </div>

        <div className="features-section" data-easytag="id6-react/src/pages/Home.js">
          <div className="feature-card" data-easytag="id7-react/src/pages/Home.js">
            <div className="feature-icon" data-easytag="id8-react/src/pages/Home.js">👤</div>
            <h3 data-easytag="id9-react/src/pages/Home.js">Личный профиль</h3>
            <p data-easytag="id10-react/src/pages/Home.js">
              Управляйте своими данными в удобном интерфейсе
            </p>
          </div>

          <div className="feature-card" data-easytag="id11-react/src/pages/Home.js">
            <div className="feature-icon" data-easytag="id12-react/src/pages/Home.js">🔒</div>
            <h3 data-easytag="id13-react/src/pages/Home.js">Безопасность</h3>
            <p data-easytag="id14-react/src/pages/Home.js">
              Ваши данные надежно защищены
            </p>
          </div>

          <div className="feature-card" data-easytag="id15-react/src/pages/Home.js">
            <div className="feature-icon" data-easytag="id16-react/src/pages/Home.js">⚡</div>
            <h3 data-easytag="id17-react/src/pages/Home.js">Быстрый доступ</h3>
            <p data-easytag="id18-react/src/pages/Home.js">
              Мгновенный доступ к вашему аккаунту
            </p>
          </div>
        </div>

        <div className="actions-section" data-easytag="id19-react/src/pages/Home.js">
          {isAuthenticated ? (
            <div className="authenticated-actions" data-easytag="id20-react/src/pages/Home.js">
              <p className="auth-message" data-easytag="id21-react/src/pages/Home.js">
                Вы вошли в систему
              </p>
              <a
                href="/profile"
                className="primary-button"
                data-easytag="id22-react/src/pages/Home.js"
              >
                Перейти в профиль
              </a>
            </div>
          ) : (
            <div className="unauthenticated-actions" data-easytag="id23-react/src/pages/Home.js">
              <p className="auth-message" data-easytag="id24-react/src/pages/Home.js">
                Начните работу с вашим профилем
              </p>
              <div className="button-group" data-easytag="id25-react/src/pages/Home.js">
                <a
                  href="/login"
                  className="primary-button"
                  data-easytag="id26-react/src/pages/Home.js"
                >
                  Войти
                </a>
                <a
                  href="/register"
                  className="secondary-button"
                  data-easytag="id27-react/src/pages/Home.js"
                >
                  Зарегистрироваться
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;