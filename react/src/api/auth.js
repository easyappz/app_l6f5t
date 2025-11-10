import instance from './axios';

/**
 * Register a new user
 * @param {string} email - User's email address
 * @param {string} firstName - User's first name
 * @param {string} lastName - User's last name
 * @param {string} password - User's password (minimum 8 characters)
 * @returns {Promise<Object>} Response with token and user data
 */
export const register = async (email, firstName, lastName, password) => {
  try {
    const response = await instance.post('/register/', {
      email,
      first_name: firstName,
      last_name: lastName,
      password
    });

    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Login user
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Promise<Object>} Response with token and user data
 */
export const login = async (email, password) => {
  try {
    const response = await instance.post('/login/', {
      email,
      password
    });

    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Logout user
 * @returns {Promise<Object>} Response with success message
 */
export const logout = async () => {
  try {
    const response = await instance.post('/logout/');

    localStorage.removeItem('token');

    return response.data;
  } catch (error) {
    localStorage.removeItem('token');
    throw error;
  }
};

/**
 * Get user profile
 * @returns {Promise<Object>} User profile data
 */
export const getProfile = async () => {
  try {
    const response = await instance.get('/profile/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Update user profile
 * @param {string} firstName - User's first name
 * @param {string} lastName - User's last name
 * @returns {Promise<Object>} Updated user profile data
 */
export const updateProfile = async (firstName, lastName) => {
  try {
    const response = await instance.patch('/profile/', {
      first_name: firstName,
      last_name: lastName
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
