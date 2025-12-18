/**
 * Auth Service
 * Servicio para operaciones de autenticación y seguridad
 */

import { postData, putData, authenticatedPostData } from './fetch.js';

// ============================================================
// VALIDACIONES
// ============================================================

/**
 * Valida que una contraseña cumpla con los requisitos
 * @param {string} password - Contraseña a validar
 * @returns {Object} Objeto con validación y mensajes
 */
export function validatePassword(password) {
  const errors = [];

  if (password.length < 8) {
    errors.push('La contraseña debe tener al menos 8 caracteres');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Debe contener al menos una mayúscula');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Debe contener al menos una minúscula');
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Debe contener al menos un número');
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Debe contener al menos un carácter especial (!@#$%^&*)');
  }

  return {
    isValid: errors.length === 0,
    errors,
    strength: calculatePasswordStrength(password)
  };
}

/**
 * Calcula la fortaleza de una contraseña
 * @param {string} password - Contraseña
 * @returns {string} 'weak' | 'medium' | 'strong'
 */
export function calculatePasswordStrength(password) {
  let strength = 0;

  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

  if (strength <= 2) return 'weak';
  if (strength <= 3) return 'medium';
  return 'strong';
}

/**
 * Valida un email
 * @param {string} email - Email a validar
 * @returns {boolean} True si es válido
 */
export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valida un número de teléfono
 * @param {string} phone - Teléfono
 * @returns {boolean} True si es válido
 */
export function validatePhone(phone) {
  // Acepta números de Costa Rica (8 dígitos) o internacionales
  const phoneRegex = /^[\d\s\-\+\(\)]{8,}$/;
  return phoneRegex.test(phone.trim());
}

// ============================================================
// CAMBIO DE CONTRASEÑA
// ============================================================

/**
 * Cambia la contraseña del usuario
 * @param {number} userId - ID del usuario
 * @param {string} oldPassword - Contraseña anterior
 * @param {string} newPassword - Nueva contraseña
 * @returns {Promise<Object>} Respuesta del servidor
 */
export async function changePassword(userId, oldPassword, newPassword) {
  try {
    // Primero validar la nueva contraseña
    const validation = validatePassword(newPassword);
    if (!validation.isValid) {
      return {
        success: false,
        errors: validation.errors
      };
    }

    // Nota: Aquí necesitarías un endpoint específico en el backend para cambiar contraseña
    // Por ahora, usaré el endpoint existente de update_delete pero generalmente deberías tener
    // un endpoint separado que valide la contraseña anterior
    
    const response = await putData('user/update_delete/', {
      id: userId,
      password: newPassword
    });

    return {
      success: response && response.ok !== false,
      message: response && response.message,
      data: response
    };
  } catch (error) {
    console.error('Error changing password:', error);
    return {
      success: false,
      message: 'Error al cambiar la contraseña'
    };
  }
}

/**
 * Inicia el proceso de recuperación de contraseña
 * @param {string} email - Email del usuario
 * @returns {Promise<Object>} Respuesta del servidor
 */
export async function initiatePasswordRecovery(email) {
  try {
    const response = await postData('user/recover_password/', {
      email: email
    });

    return response || { success: false };
  } catch (error) {
    console.error('Error initiating password recovery:', error);
    return { success: false };
  }
}

/**
 * Resetea la contraseña con código de recuperación
 * @param {string} email - Email del usuario
 * @param {string} recoveryCode - Código de recuperación
 * @param {string} newPassword - Nueva contraseña
 * @returns {Promise<Object>} Respuesta del servidor
 */
export async function resetPassword(email, recoveryCode, newPassword) {
  try {
    const validation = validatePassword(newPassword);
    if (!validation.isValid) {
      return {
        success: false,
        errors: validation.errors
      };
    }

    const response = await postData('user/recover_password/', {
      email: email,
      code: recoveryCode,
      new_password: newPassword
    });

    return response || { success: false };
  } catch (error) {
    console.error('Error resetting password:', error);
    return { success: false };
  }
}

// ============================================================
// VERIFICACIÓN Y SEGURIDAD
// ============================================================

/**
 * Verifica si el usuario está autenticado
 * @returns {boolean}
 */
export function isAuthenticated() {
  return !!localStorage.getItem('token') && !!localStorage.getItem('id');
}

/**
 * Obtiene el ID del usuario logueado
 * @returns {string|null}
 */
export function getUserId() {
  return localStorage.getItem('id');
}

/**
 * Obtiene el token de autenticación
 * @returns {string|null}
 */
export function getAuthToken() {
  return localStorage.getItem('token');
}

/**
 * Logout del usuario
 */
export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('id');
  localStorage.removeItem('role_id');
  return true;
}

export default {
  validatePassword,
  calculatePasswordStrength,
  validateEmail,
  validatePhone,
  changePassword,
  initiatePasswordRecovery,
  resetPassword,
  isAuthenticated,
  getUserId,
  getAuthToken,
  logout
};
