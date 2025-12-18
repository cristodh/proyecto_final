/**
 * Donation Service
 * Servicio para operaciones relacionadas con donaciones
 */

import { authenticatedGetData, tokenGetData, patchData } from './fetch.js';

// ============================================================
// OBTENER DONACIONES DEL USUARIO
// ============================================================

/**
 * Obtiene el historial de donaciones del usuario logueado
 * @returns {Promise<Object>} Objeto con donaciones y estadísticas
 */
export async function getUserDonations() {
  try {
    const response = await authenticatedGetData('campaign/donations/my-donations/');
    return response || { donations: [], stats: {} };
  } catch (error) {
    console.error('Error fetching user donations:', error);
    return { donations: [], stats: {} };
  }
}

/**
 * Obtiene donaciones filtradas por estado y fecha
 * @param {string} status - Estado de la donación ('pending', 'approved', 'rejected')
 * @param {Date} startDate - Fecha inicial (opcional)
 * @param {Date} endDate - Fecha final (opcional)
 * @returns {Promise<Array>} Donaciones filtradas
 */
export async function getFilteredDonations(status = null, startDate = null, endDate = null) {
  try {
    const response = await authenticatedGetData('campaign/donations/my-donations/');
    
    if (!response || !response.donations) {
      return [];
    }
    
    let donations = response.donations;
    
    // Filtrar por estado
    if (status) {
      donations = donations.filter(d => d.donation_status === status);
    }
    
    // Filtrar por fecha
    if (startDate) {
      const start = new Date(startDate);
      donations = donations.filter(d => new Date(d.donated_at) >= start);
    }
    
    if (endDate) {
      const end = new Date(endDate);
      donations = donations.filter(d => new Date(d.donated_at) <= end);
    }
    
    return donations;
  } catch (error) {
    console.error('Error filtering donations:', error);
    return [];
  }
}

/**
 * Obtiene detalles de una donación específica
 * @param {string} confirmationNumber - Número de confirmación de la donación
 * @returns {Promise<Object>} Detalles de la donación
 */
export async function getDonationDetail(confirmationNumber) {
  try {
    const response = await authenticatedGetData(
      `campaign/donations/detail/${confirmationNumber}/`
    );
    return response || null;
  } catch (error) {
    console.error('Error fetching donation detail:', error);
    return null;
  }
}

/**
 * Calcula estadísticas de donaciones
 * @param {Array} donations - Array de donaciones
 * @returns {Object} Objeto con estadísticas
 */
export function calculateDonationStats(donations) {
  if (!Array.isArray(donations) || donations.length === 0) {
    return {
      totalDonated: 0,
      totalDonations: 0,
      projectsSupported: 0,
      averageDonation: 0,
      approvedDonations: 0,
      pendingDonations: 0,
      rejectedDonations: 0
    };
  }

  const totalDonated = donations.reduce((sum, d) => {
    return sum + (parseFloat(d.amount) || 0);
  }, 0);

  const projects = new Set(donations.map(d => d.campaign));
  
  const approvedDonations = donations.filter(d => d.donation_status === 'approved').length;
  const pendingDonations = donations.filter(d => d.donation_status === 'pending').length;
  const rejectedDonations = donations.filter(d => d.donation_status === 'rejected').length;

  return {
    totalDonated: parseFloat(totalDonated.toFixed(2)),
    totalDonations: donations.length,
    projectsSupported: projects.size,
    averageDonation: parseFloat((totalDonated / donations.length).toFixed(2)),
    approvedDonations,
    pendingDonations,
    rejectedDonations
  };
}

/**
 * Agrupa donaciones por categoría
 * @param {Array} donations - Array de donaciones
 * @returns {Object} Donaciones agrupadas por categoría
 */
export function groupDonationsByCategory(donations) {
  if (!Array.isArray(donations)) {
    return {};
  }

  return donations.reduce((acc, donation) => {
    const category = donation.campaign_name || 'Sin categoría';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(donation);
    return acc;
  }, {});
}

/**
 * Obtiene donaciones agrupadas por mes
 * @param {Array} donations - Array de donaciones
 * @returns {Object} Donaciones agrupadas por mes
 */
export function groupDonationsByMonth(donations) {
  if (!Array.isArray(donations)) {
    return {};
  }

  return donations.reduce((acc, donation) => {
    const date = new Date(donation.donated_at);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!acc[monthKey]) {
      acc[monthKey] = {
        month: monthKey,
        total: 0,
        count: 0,
        donations: []
      };
    }
    
    acc[monthKey].total += parseFloat(donation.amount) || 0;
    acc[monthKey].count += 1;
    acc[monthKey].donations.push(donation);
    
    return acc;
  }, {});
}

/**
 * Descarga comprobante de pago
 * @param {string} proofUrl - URL del comprobante
 * @param {string} fileName - Nombre del archivo para descargar
 */
export async function downloadProofOfPayment(proofUrl, fileName = 'comprobante_pago.pdf') {
  try {
    if (!proofUrl) {
      throw new Error('No proof URL provided');
    }
    
    const link = document.createElement('a');
    link.href = proofUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    return { success: true };
  } catch (error) {
    console.error('Error downloading proof of payment:', error);
    return { success: false, error: error.message };
  }
}

export default {
  getUserDonations,
  getFilteredDonations,
  getDonationDetail,
  calculateDonationStats,
  groupDonationsByCategory,
  groupDonationsByMonth,
  downloadProofOfPayment
};
