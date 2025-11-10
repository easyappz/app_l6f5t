import React, { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile, logoutUser } from '../api/auth';
import './Profile.css';

const Profile = () => {
  const [userData, setUserData] = useState({
    email: '',
    first_name: '',
    last_name: ''
  });

  const [editData, setEditData] = useState({
    first_name: '',
    last_name: ''
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const profile = await getUserProfile();
      setUserData(profile);
      setEditData({
        first_name: profile.first_name,
        last_name: profile.last_name
      });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage('Необходимо войти в систему');
        setTimeout(() => {
          window.location.href = '/login';
        }, 1500);
      } else {
        setErrorMessage('Не удалось загрузить профиль. Попробуйте позже.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
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

  const validateEditForm = () => {
    const newErrors = {};

    if (!editData.first_name.trim()) {
      newErrors.first_name = 'Имя обязательно';
    }

    if (!editData.last_name.trim()) {
      newErrors.last_name = 'Фамилия обязательна';
    }

    return newErrors;
  };

  const handleEdit = () => {
    setIsEditMode(true);
    setSuccessMessage('');
    setErrorMessage('');
    setErrors({});
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setEditData({
      first_name: userData.first_name,
      last_name: userData.last_name
    });
    setErrors({});
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleSave = async () => {
    setSuccessMessage('');
    setErrorMessage('');

    const validationErrors = validateEditForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSaving(true);
    setErrors({});

    try {
      const updatedProfile = await updateUserProfile(editData);
      setUserData(updatedProfile);
      setEditData({
        first_name: updatedProfile.first_name,
        last_name: updatedProfile.last_name
      });
      setIsEditMode(false);
      setSuccessMessage('Профиль успешно обновлен!');

      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
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
        setErrorMessage('Не удалось обновить профиль. Попробуйте позже.');
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem('token');
      window.location.href = '/login';
    } catch (error) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  };

  if (isLoading) {
    return (
      <div className="profile-container" data-easytag="id1-react/src/pages/Profile.js">
        <div className="profile-card" data-easytag="id2-react/src/pages/Profile.js">
          <div className="loading-spinner" data-easytag="id3-react/src/pages/Profile.js">
            <div className="spinner" data-easytag="id4-react/src/pages/Profile.js"></div>
            <p data-easytag="id5-react/src/pages/Profile.js">Загрузка профиля...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container" data-easytag="id6-react/src/pages/Profile.js">
      <div className="profile-card" data-easytag="id7-react/src/pages/Profile.js">
        <div className="profile-header" data-easytag="id8-react/src/pages/Profile.js">
          <h1 data-easytag="id9-react/src/pages/Profile.js">Профиль</h1>
          <p data-easytag="id10-react/src/pages/Profile.js">Управление личными данными</p>
        </div>

        {successMessage && (
          <div className="success-message" data-easytag="id11-react/src/pages/Profile.js">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="error-message general-error" data-easytag="id12-react/src/pages/Profile.js">
            {errorMessage}
          </div>
        )}

        <div className="profile-content" data-easytag="id13-react/src/pages/Profile.js">
          <div className="form-group" data-easytag="id14-react/src/pages/Profile.js">
            <label data-easytag="id15-react/src/pages/Profile.js">Почта</label>
            <input
              type="email"
              value={userData.email}
              disabled
              className="readonly-input"
              data-easytag="id16-react/src/pages/Profile.js"
            />
            <span className="field-hint" data-easytag="id17-react/src/pages/Profile.js">
              Email нельзя изменить
            </span>
          </div>

          <div className="form-group" data-easytag="id18-react/src/pages/Profile.js">
            <label htmlFor="first_name" data-easytag="id19-react/src/pages/Profile.js">
              Имя
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={isEditMode ? editData.first_name : userData.first_name}
              onChange={handleEditChange}
              disabled={!isEditMode}
              className={errors.first_name ? 'input-error' : ''}
              placeholder="Введите имя"
              data-easytag="id20-react/src/pages/Profile.js"
            />
            {errors.first_name && (
              <span className="error-message" data-easytag="id21-react/src/pages/Profile.js">
                {errors.first_name}
              </span>
            )}
          </div>

          <div className="form-group" data-easytag="id22-react/src/pages/Profile.js">
            <label htmlFor="last_name" data-easytag="id23-react/src/pages/Profile.js">
              Фамилия
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={isEditMode ? editData.last_name : userData.last_name}
              onChange={handleEditChange}
              disabled={!isEditMode}
              className={errors.last_name ? 'input-error' : ''}
              placeholder="Введите фамилию"
              data-easytag="id24-react/src/pages/Profile.js"
            />
            {errors.last_name && (
              <span className="error-message" data-easytag="id25-react/src/pages/Profile.js">
                {errors.last_name}
              </span>
            )}
          </div>

          {!isEditMode ? (
            <div className="button-group" data-easytag="id26-react/src/pages/Profile.js">
              <button
                onClick={handleEdit}
                className="edit-button"
                data-easytag="id27-react/src/pages/Profile.js"
              >
                Редактировать
              </button>
              <button
                onClick={handleLogout}
                className="logout-button"
                data-easytag="id28-react/src/pages/Profile.js"
              >
                Выйти
              </button>
            </div>
          ) : (
            <div className="button-group" data-easytag="id29-react/src/pages/Profile.js">
              <button
                onClick={handleSave}
                className="save-button"
                disabled={isSaving}
                data-easytag="id30-react/src/pages/Profile.js"
              >
                {isSaving ? 'Сохранение...' : 'Сохранить'}
              </button>
              <button
                onClick={handleCancel}
                className="cancel-button"
                disabled={isSaving}
                data-easytag="id31-react/src/pages/Profile.js"
              >
                Отмена
              </button>
            </div>
          )}
        </div>

        <div className="home-link" data-easytag="id32-react/src/pages/Profile.js">
          <a href="/" data-easytag="id33-react/src/pages/Profile.js">← На главную</a>
        </div>
      </div>
    </div>
  );
};

export default Profile;
