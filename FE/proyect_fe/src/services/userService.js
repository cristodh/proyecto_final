/**
 * User Service
 * Servicio para operaciones relacionadas con usuarios
 */

import { authenticatedGetData, tokenGetData, putData } from './fetch.js';

// ============================================================
// OBTENER INFORMACIÓN DEL USUARIO
// ============================================================

/**
 * Obtiene la información completa del usuario logueado
 * @param {number} userId - ID del usuario (generalmente desde localStorage)
 * @returns {Promise<Object>} Datos del usuario
 */
export async function getUserData(userId) {
  try {
    const response = await tokenGetData(`user/user_id/${userId}/`);
    return response && response[0] ? response[0] : null;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}

/**
 * Obtiene los intereses clave del usuario
 * @param {number} userId - ID del usuario
 * @returns {Promise<Array>} Lista de intereses
 */
export async function getUserInterests(userId) {
  try {
    // Nota: Ajusta este endpoint según tu estructura backend
    const response = await tokenGetData(`user/user_id/${userId}/`);
    if (response && response[0] && response[0].key_interests) {
      return response[0].key_interests;
    }
    return [];
  } catch (error) {
    console.error('Error fetching user interests:', error);
    return [];
  }
}

/**
 * Actualiza la información del usuario
 * @param {number} userId - ID del usuario
 * @param {Object} userData - Datos a actualizar (nombre, email, teléfono, dirección, etc)
 * @returns {Promise<Object>} Respuesta del servidor
 */
export async function updateUserData(userId, userData) {
  try {
    const payload = {
      id: userId,
      ...userData
    };
    const response = await putData('user/update_delete/', payload);
    return response;
  } catch (error) {
    console.error('Error updating user data:', error);
    return null;
  }
}

/**
 * Obtiene todos los usuarios (generalmente para admin)
 * @returns {Promise<Array>} Lista de usuarios
 */
export async function getAllUsers() {
  try {
    const response = await authenticatedGetData('user/new_users/');
    return Array.isArray(response) ? response : [];
  } catch (error) {
    console.error('Error fetching all users:', error);
    return [];
  }
}

/**
 * Genera iniciales para el avatar del usuario
 * @param {string} firstName - Primer nombre
 * @param {string} lastName - Apellido
 * @returns {string} Iniciales (ej: "JD" para John Doe)
 */
export function getUserInitials(firstName, lastName) {
  const first = (firstName || '').charAt(0).toUpperCase();
  const last = (lastName || '').charAt(0).toUpperCase();
  return `${first}${last}`;
}

/**
 * Genera un color único basado en el nombre del usuario
 * @param {string} username - Nombre de usuario
 * @returns {string} Color en formato hexadecimal
 */
export function getAvatarColor(username) {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
    '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B88B', '#85C1E2'
  ];
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export default {
  getUserData,
  getUserInterests,
  updateUserData,
  getAllUsers,
  getUserInitials,
  getAvatarColor
};
