import React, { createContext, useState, useEffect, useContext } from 'react';
import apiInstance from '../api/axios';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('authToken');
      const storedUser = localStorage.getItem('currentUser');

      if (storedToken && storedUser) {
        try {
          setToken(storedToken);
          setCurrentUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
          
          apiInstance.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
          
          const response = await apiInstance.get('/profile/');
          setCurrentUser(response.data);
          localStorage.setItem('currentUser', JSON.stringify(response.data));
        } catch (error) {
          console.error('Token validation failed:', error);
          logout();
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await apiInstance.post('/login/', {
        email,
        password
      });

      const { token: authToken, user } = response.data;

      setToken(authToken);
      setCurrentUser(user);
      setIsAuthenticated(true);

      localStorage.setItem('authToken', authToken);
      localStorage.setItem('currentUser', JSON.stringify(user));

      apiInstance.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;

      return { success: true, user };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error.response?.data || { error: 'Ошибка при входе' }
      };
    }
  };

  const register = async (email, firstName, lastName, password) => {
    try {
      const response = await apiInstance.post('/register/', {
        email,
        first_name: firstName,
        last_name: lastName,
        password
      });

      const { token: authToken, user } = response.data;

      setToken(authToken);
      setCurrentUser(user);
      setIsAuthenticated(true);

      localStorage.setItem('authToken', authToken);
      localStorage.setItem('currentUser', JSON.stringify(user));

      apiInstance.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;

      return { success: true, user };
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        error: error.response?.data || { error: 'Ошибка при регистрации' }
      };
    }
  };

  const logout = async () => {
    try {
      if (token) {
        await apiInstance.post('/logout/');
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setToken(null);
      setCurrentUser(null);
      setIsAuthenticated(false);

      localStorage.removeItem('authToken');
      localStorage.removeItem('currentUser');

      delete apiInstance.defaults.headers.common['Authorization'];
    }
  };

  const updateUser = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const value = {
    currentUser,
    token,
    isAuthenticated,
    isLoading,
    login,
    logout,
    register,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
