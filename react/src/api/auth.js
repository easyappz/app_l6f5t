import instance from './axios';

export const registerUser = async (userData) => {
  const response = await instance.post('/register/', userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await instance.post('/login/', credentials);
  return response.data;
};

export const logoutUser = async () => {
  const response = await instance.post('/logout/');
  return response.data;
};

export const getUserProfile = async () => {
  const response = await instance.get('/profile/');
  return response.data;
};

export const updateUserProfile = async (profileData) => {
  const response = await instance.patch('/profile/', profileData);
  return response.data;
};
