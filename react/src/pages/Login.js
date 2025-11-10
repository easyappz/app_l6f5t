import React, { useState } from 'react';
import { loginUser } from '../api/auth';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email обязателен';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Введите корректный email';
    }

    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const response = await loginUser(formData);
      
      if (response.token) {
        localStorage.setItem('token', response.token);
      }

      window.location.href = '/profile';
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrors({ general: error.response.data.error || 'Неверный email или пароль' });
      } else if (error.response && error.response.data) {
        const serverErrors = {};
        const errorData = error.response.data;

        Object.keys(errorData).forEach(key => {
          if (Array.isArray(errorData[key])) {
            serverErrors[key] = errorData[key][0];
          } else {
            serverErrors[key] = errorData[key];
          }
        });

        setErrors(serverErrors);
      } else {
        setErrors({ general: 'Произошла ошибка при входе. Попробуйте позже.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container" data-easytag="id1-react/src/pages/Login.js">
      <div className="login-card" data-easytag="id2-react/src/pages/Login.js">
        <div className="login-header" data-easytag="id3-react/src/pages/Login.js">
          <h1 data-easytag="id4-react/src/pages/Login.js">Вход</h1>
          <p data-easytag="id5-react/src/pages/Login.js">Войдите в свой аккаунт</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form" data-easytag="id6-react/src/pages/Login.js">
          {errors.general && (
            <div className="error-message general-error" data-easytag="id7-react/src/pages/Login.js">
              {errors.general}
            </div>
          )}

          <div className="form-group" data-easytag="id8-react/src/pages/Login.js">
            <label htmlFor="email" data-easytag="id9-react/src/pages/Login.js">
              Почта
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
              placeholder="example@mail.com"
              data-easytag="id10-react/src/pages/Login.js"
            />
            {errors.email && (
              <span className="error-message" data-easytag="id11-react/src/pages/Login.js">
                {errors.email}
              </span>
            )}
          </div>

          <div className="form-group" data-easytag="id12-react/src/pages/Login.js">
            <label htmlFor="password" data-easytag="id13-react/src/pages/Login.js">
              Пароль
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'input-error' : ''}
              placeholder="Введите пароль"
              data-easytag="id14-react/src/pages/Login.js"
            />
            {errors.password && (
              <span className="error-message" data-easytag="id15-react/src/pages/Login.js">
                {errors.password}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={isLoading}
            data-easytag="id16-react/src/pages/Login.js"
          >
            {isLoading ? 'Вход...' : 'Войти'}
          </button>

          <div className="register-link" data-easytag="id17-react/src/pages/Login.js">
            Нет аккаунта? <a href="/register" data-easytag="id18-react/src/pages/Login.js">Зарегистрироваться</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
