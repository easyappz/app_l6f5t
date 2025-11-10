import React, { useState } from 'react';
import { registerUser } from '../api/auth';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

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

    if (!formData.first_name.trim()) {
      newErrors.first_name = 'Имя обязательно';
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Фамилия обязательна';
    }

    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Пароль должен содержать минимум 8 символов';
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
    setSuccessMessage('');

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const response = await registerUser(formData);
      
      if (response.token) {
        localStorage.setItem('token', response.token);
      }

      setSuccessMessage('Регистрация прошла успешно!');
      setFormData({
        email: '',
        first_name: '',
        last_name: '',
        password: ''
      });

      setTimeout(() => {
        window.location.href = '/profile';
      }, 1500);
    } catch (error) {
      if (error.response && error.response.data) {
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
        setErrors({ general: 'Произошла ошибка при регистрации. Попробуйте позже.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container" data-easytag="id1-react/src/pages/Register.js">
      <div className="register-card" data-easytag="id2-react/src/pages/Register.js">
        <div className="register-header" data-easytag="id3-react/src/pages/Register.js">
          <h1 data-easytag="id4-react/src/pages/Register.js">Регистрация</h1>
          <p data-easytag="id5-react/src/pages/Register.js">Создайте новый аккаунт</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form" data-easytag="id6-react/src/pages/Register.js">
          {errors.general && (
            <div className="error-message general-error" data-easytag="id7-react/src/pages/Register.js">
              {errors.general}
            </div>
          )}

          {successMessage && (
            <div className="success-message" data-easytag="id8-react/src/pages/Register.js">
              {successMessage}
            </div>
          )}

          <div className="form-group" data-easytag="id9-react/src/pages/Register.js">
            <label htmlFor="email" data-easytag="id10-react/src/pages/Register.js">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
              placeholder="example@mail.com"
              data-easytag="id11-react/src/pages/Register.js"
            />
            {errors.email && (
              <span className="error-message" data-easytag="id12-react/src/pages/Register.js">
                {errors.email}
              </span>
            )}
          </div>

          <div className="form-group" data-easytag="id13-react/src/pages/Register.js">
            <label htmlFor="first_name" data-easytag="id14-react/src/pages/Register.js">
              Имя
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className={errors.first_name ? 'input-error' : ''}
              placeholder="Иван"
              data-easytag="id15-react/src/pages/Register.js"
            />
            {errors.first_name && (
              <span className="error-message" data-easytag="id16-react/src/pages/Register.js">
                {errors.first_name}
              </span>
            )}
          </div>

          <div className="form-group" data-easytag="id17-react/src/pages/Register.js">
            <label htmlFor="last_name" data-easytag="id18-react/src/pages/Register.js">
              Фамилия
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className={errors.last_name ? 'input-error' : ''}
              placeholder="Иванов"
              data-easytag="id19-react/src/pages/Register.js"
            />
            {errors.last_name && (
              <span className="error-message" data-easytag="id20-react/src/pages/Register.js">
                {errors.last_name}
              </span>
            )}
          </div>

          <div className="form-group" data-easytag="id21-react/src/pages/Register.js">
            <label htmlFor="password" data-easytag="id22-react/src/pages/Register.js">
              Пароль
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'input-error' : ''}
              placeholder="Минимум 8 символов"
              data-easytag="id23-react/src/pages/Register.js"
            />
            {errors.password && (
              <span className="error-message" data-easytag="id24-react/src/pages/Register.js">
                {errors.password}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={isLoading}
            data-easytag="id25-react/src/pages/Register.js"
          >
            {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>

          <div className="login-link" data-easytag="id26-react/src/pages/Register.js">
            Уже есть аккаунт? <a href="/login" data-easytag="id27-react/src/pages/Register.js">Войти</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
