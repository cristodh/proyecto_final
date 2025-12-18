/**
 * Campaign Service
 * Servicio para operaciones relacionadas con campañas y seguimiento
 */

import { authenticatedGetData, tokenGetData, postData, authenticatedPostData } from './fetch.js';

// ============================================================
// OBTENER CAMPAÑAS
// ============================================================

/**
 * Obtiene todas las campañas públicas
 * @param {Object} filters - Filtros (categoria, ubicación, búsqueda, etc)
 * @returns {Promise<Array>} Lista de campañas
 */
export async function getPublicCampaigns(filters = {}) {
  try {
    let endpoint = 'campaign/explore/';
    
    const queryParams = new URLSearchParams();
    if (filters.category) queryParams.append('category', filters.category);
    if (filters.location) queryParams.append('location', filters.location);
    if (filters.search) queryParams.append('search', filters.search);
    if (filters.minGoal) queryParams.append('min_goal', filters.minGoal);
    if (filters.maxGoal) queryParams.append('max_goal', filters.maxGoal);
    if (filters.sortBy) queryParams.append('sort_by', filters.sortBy);
    
    if (queryParams.toString()) {
      endpoint += '?' + queryParams.toString();
    }
    
    const response = await tokenGetData(endpoint);
    return response && response.campaigns ? response.campaigns : [];
  } catch (error) {
    console.error('Error fetching public campaigns:', error);
    return [];
  }
}

/**
 * Obtiene detalles de una campaña específica
 * @param {number} campaignId - ID de la campaña
 * @returns {Promise<Object>} Detalles de la campaña
 */
export async function getCampaignDetail(campaignId) {
  try {
    const response = await tokenGetData(`campaigns/explore/${campaignId}/`);
    return response || null;
  } catch (error) {
    console.error('Error fetching campaign detail:', error);
    return null;
  }
}

// ============================================================
// SEGUIMIENTO DE CAMPAÑAS
// ============================================================

/**
 * Obtiene las campañas que el usuario está siguiendo
 * @returns {Promise<Array>} Lista de campañas seguidas
 */
export async function getFollowedCampaigns() {
  try {
    // Backend expone rutas bajo /campaign/ (singular)
    const response = await authenticatedGetData('campaign/campaigns/user/followed/');
    console.log('Followed campaigns response:', response);
    
    // Manejar respuesta como array directo o como objeto con propiedad campaigns
    if (Array.isArray(response)) {
      return response;
    }
    
    return response && response.campaigns ? response.campaigns : [];
  } catch (error) {
    console.error('Error fetching followed campaigns:', error);
    return [];
  }
}

/**
 * Verifica si el usuario está siguiendo una campaña específica
 * @param {number} campaignId - ID de la campaña
 * @returns {Promise<boolean>} True si la está siguiendo
 */
export async function isFollowingCampaign(campaignId) {
  try {
    const response = await authenticatedGetData(
      `campaign/campaigns/${campaignId}/is-following/`
    );
    return response && response.is_following ? true : false;
  } catch (error) {
    // Si el endpoint no existe o devuelve 404, asumimos que no se está siguiendo
    if (error?.message?.includes('404')) {
      return false;
    }
    console.error('Error checking if following campaign:', error);
    return false;
  }
}

/**
 * Sigue una campaña
 * @param {number} campaignId - ID de la campaña
 * @returns {Promise<Object>} Respuesta del servidor
 */
export async function followCampaign(campaignId) {
  try {
    const response = await authenticatedPostData(
      `campaign/campaigns/${campaignId}/follow/`,
      {}
    );
    return response;
  } catch (error) {
    console.error('Error following campaign:', error);
    return null;
  }
}

/**
 * Deja de seguir una campaña
 * @param {number} campaignId - ID de la campaña
 * @returns {Promise<Object>} Respuesta del servidor
 */
export async function unfollowCampaign(campaignId) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/campaign/campaigns/${campaignId}/follow/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      throw new Error('No se pudo dejar de seguir la campaña');
    }

    return await response.json();
  } catch (error) {
    console.error('Error unfollowing campaign:', error);
    return null;
  }
}

/**
 * Obtiene estadísticas de campañas seguidas
 * @returns {Promise<Object>} Estadísticas
 */
export async function getFollowedCampaignsStats() {
  try {
    const campaigns = await getFollowedCampaigns();
    
    const totalFollowed = campaigns.length;
    const totalToRaise = campaigns.reduce((sum, c) => {
      return sum + (parseFloat(c.campaign.goal_amount) || 0);
    }, 0);
    const totalRaised = campaigns.reduce((sum, c) => {
      return sum + (parseFloat(c.campaign.current_amount) || 0);
    }, 0);

    return {
      totalFollowed,
      totalToRaise: parseFloat(totalToRaise.toFixed(2)),
      totalRaised: parseFloat(totalRaised.toFixed(2)),
      campaigns
    };
  } catch (error) {
    console.error('Error getting followed campaigns stats:', error);
    return {
      totalFollowed: 0,
      totalToRaise: 0,
      totalRaised: 0,
      campaigns: []
    };
  }
}

/**
 * Obtiene campañas por categoría
 * @param {string} category - Nombre de la categoría
 * @returns {Promise<Array>} Campañas de la categoría
 */
export async function getCampaignsByCategory(category) {
  try {
    const response = await tokenGetData(`campaign/explore/?category=${category}`);
    return response && response.campaigns ? response.campaigns : [];
  } catch (error) {
    console.error('Error fetching campaigns by category:', error);
    return [];
  }
}

export default {
  getPublicCampaigns,
  getCampaignDetail,
  getFollowedCampaigns,
  isFollowingCampaign,
  followCampaign,
  unfollowCampaign,
  getFollowedCampaignsStats,
  getCampaignsByCategory
};
