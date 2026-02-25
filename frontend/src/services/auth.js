// src/services/auth.js
import api from './api';

// Registar utilizador
export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    if (response.data.success) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    console.error('Erro no registo:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Erro no registo' };
  }
};

// Login
export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    if (response.data.success) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    console.error('Erro no login:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Erro no login' };
  }
};

// Logout
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Buscar perfil do utilizador
export const getProfile = async (userId) => {
  try {
    const response = await api.get(`/profile/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    throw error;
  }
};

// Atualizar perfil
export const updateProfile = async (userId, data) => {
  try {
    const response = await api.put(`/profile/${userId}`, data);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    throw error;
  }
};

// Ativar plano
export const activatePlan = async (userId, codigo) => {
  try {
    const response = await api.post(`/profile/${userId}/activate`, { codigo });
    return response.data;
  } catch (error) {
    console.error('Erro ao ativar plano:', error);
    throw error;
  }
};

// Upload de imagem
export const uploadImage = async (userId, file) => {
  const formData = new FormData();
  formData.append('imagemPerfil', file);

  try {
    const response = await api.post(`/profile/${userId}/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro no upload:', error);
    throw error;
  }
};