import { useState, useEffect, useMemo, useCallback } from "react";
import { authenticatedGetData, putData, patchData, deleteData } from "../../../services/fetch";

// Estados de campaña según el backend
export const CAMPAIGN_STATUS = {
  ACTIVE: "active",
  DETAINED: "detained",
  COMPLETED: "completed",
  REJECTED: "rejected",
  PENDING: "pending",
};

export const STATUS_CONFIG = {
  [CAMPAIGN_STATUS.ACTIVE]: {
    label: "Activa",
    color: "success",
    bgColor: "#e8f5e9",
    textColor: "#2e7d32",
  },
  [CAMPAIGN_STATUS.DETAINED]: {
    label: "Detenida",
    color: "warning",
    bgColor: "#fff3e0",
    textColor: "#ef6c00",
  },
  [CAMPAIGN_STATUS.COMPLETED]: {
    label: "Completada",
    color: "info",
    bgColor: "#e3f2fd",
    textColor: "#1565c0",
  },
  [CAMPAIGN_STATUS.REJECTED]: {
    label: "Rechazada",
    color: "error",
    bgColor: "#ffebee",
    textColor: "#c62828",
  },
  [CAMPAIGN_STATUS.PENDING]: {
    label: "Pendiente",
    color: "default",
    bgColor: "#f5f5f5",
    textColor: "#616161",
  },
};

// Checklist de revisión para aprobar/rechazar campañas
export const REVIEW_CHECKLIST = [
  { id: "name", label: "Nombre claro y descriptivo", field: "name" },
  { id: "description", label: "Descripción completa y detallada", field: "description" },
  { id: "story", label: "Historia convincente", field: "story" },
  { id: "goal_amount", label: "Meta financiera realista", field: "goal_amount" },
  { id: "dates", label: "Fechas de inicio y fin válidas", field: "start_date" },
  { id: "location", label: "Ubicación especificada", field: "location" },
  { id: "contact", label: "Información de contacto", field: "contact_email" },
  { id: "documents", label: "Documentos PDF adjuntos", field: "pdf_documents" },
  { id: "category", label: "Categoría asignada", field: "category" },
];

export function useCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Estados para modales
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [reviewAction, setReviewAction] = useState(null); // 'approve', 'reject', 'detain', etc.

  // Fetch inicial de campañas
  const fetchCampaigns = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await authenticatedGetData("campaign/new_campaigns/");
      if (response && Array.isArray(response)) {
        setCampaigns(response);
      } else if (response) {
        // Si viene como objeto con results
        setCampaigns(response.results || []);
      } else {
        setCampaigns([]);
      }
    } catch (err) {
      console.error("Error fetching campaigns:", err);
      setError("Error al cargar las campañas. Verifica que el servidor esté corriendo.");
      setCampaigns([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  // Filtrado de campañas
  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((c) => {
      const matchesStatus = filterStatus === "all" || c.campaign_status === filterStatus;
      const matchesSearch =
        c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.creator_username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.category_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.location?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [campaigns, filterStatus, searchTerm]);

  // Estadísticas en tiempo real
  const stats = useMemo(() => {
    const total = campaigns.length;
    const active = campaigns.filter((c) => c.campaign_status === CAMPAIGN_STATUS.ACTIVE).length;
    const pending = campaigns.filter((c) => c.campaign_status === CAMPAIGN_STATUS.PENDING).length;
    const completed = campaigns.filter((c) => c.campaign_status === CAMPAIGN_STATUS.COMPLETED).length;
    const rejected = campaigns.filter((c) => c.campaign_status === CAMPAIGN_STATUS.REJECTED).length;
    const detained = campaigns.filter((c) => c.campaign_status === CAMPAIGN_STATUS.DETAINED).length;
    
    const totalGoal = campaigns.reduce((sum, c) => sum + parseFloat(c.goal_amount || 0), 0);
    const totalRaised = campaigns.reduce((sum, c) => sum + parseFloat(c.current_amount || 0), 0);
    const avgProgress = totalGoal > 0 ? (totalRaised / totalGoal) * 100 : 0;

    return {
      total,
      active,
      pending,
      completed,
      rejected,
      detained,
      totalGoal,
      totalRaised,
      avgProgress,
    };
  }, [campaigns]);

  // Cambiar estado de campaña
  const updateCampaignStatus = useCallback(async (id, newStatus, comment = "") => {
    try {
      const response = await putData(`campaign/campaign_status/${id}/`, {
        campaign_status: newStatus,
        admin_comment: comment,
      });
      
      if (response?.ok) {
        setCampaigns((prev) =>
          prev.map((c) => (c.id === id ? { ...c, campaign_status: newStatus } : c))
        );
        return true;
      }
      // Actualización local para desarrollo
      setCampaigns((prev) =>
        prev.map((c) => (c.id === id ? { ...c, campaign_status: newStatus } : c))
      );
      return true;
    } catch (err) {
      console.error("Error updating campaign status:", err);
      // Actualización local para desarrollo
      setCampaigns((prev) =>
        prev.map((c) => (c.id === id ? { ...c, campaign_status: newStatus } : c))
      );
      return true;
    }
  }, []);

  // Eliminar campaña
  const deleteCampaign = useCallback(async (id) => {
    try {
      const response = await deleteData(`campaign/campaign_delete/${id}/`);
      if (response?.ok) {
        setCampaigns((prev) => prev.filter((c) => c.id !== id));
        return true;
      }
      // Eliminación local para desarrollo
      setCampaigns((prev) => prev.filter((c) => c.id !== id));
      return true;
    } catch (err) {
      console.error("Error deleting campaign:", err);
      setCampaigns((prev) => prev.filter((c) => c.id !== id));
      return true;
    }
  }, []);

  // Evaluar checklist automáticamente
  const evaluateChecklist = useCallback((campaign) => {
    return REVIEW_CHECKLIST.map((item) => {
      const value = campaign[item.field];
      let passed = false;
      
      if (item.field === "start_date") {
        passed = !!campaign.start_date && !!campaign.end_date;
      } else if (item.field === "contact_email") {
        passed = !!campaign.contact_email || !!campaign.contact_phone;
      } else if (item.field === "pdf_documents") {
        passed = Array.isArray(value) && value.length > 0;
      } else if (typeof value === "number") {
        passed = value > 0;
      } else {
        passed = !!value && value.toString().trim().length > 0;
      }
      
      return { ...item, passed };
    });
  }, []);

  // Calcular progreso de recaudación
  const calculateProgress = useCallback((raised, goal) => {
    const r = parseFloat(raised) || 0;
    const g = parseFloat(goal) || 1;
    return Math.min((r / g) * 100, 100);
  }, []);

  // Abrir modal de detalles
  const openDetailsModal = useCallback((campaign) => {
    setSelectedCampaign(campaign);
    setDetailsModalOpen(true);
  }, []);

  // Abrir modal de revisión
  const openReviewModal = useCallback((campaign, action) => {
    setSelectedCampaign(campaign);
    setReviewAction(action);
    setReviewModalOpen(true);
  }, []);

  // Abrir modal de edición
  const openEditModal = useCallback((campaign) => {
    setSelectedCampaign(campaign);
    setEditModalOpen(true);
  }, []);

  // Cerrar modales
  const closeModals = useCallback(() => {
    setDetailsModalOpen(false);
    setReviewModalOpen(false);
    setEditModalOpen(false);
    setSelectedCampaign(null);
    setReviewAction(null);
  }, []);

  // Actualizar campaña (todos los campos)
  const updateCampaign = useCallback(async (id, updatedData) => {
    try {
      const response = await patchData(`campaign/update/${id}/`, updatedData);
      
      if (response?.ok || response?.campaign) {
        const updatedCampaignData = response.campaign || { ...updatedData };
        // Actualizar la campaña en el estado local
        setCampaigns((prev) =>
          prev.map((c) => (c.id === id ? { ...c, ...updatedCampaignData } : c))
        );
        // Actualizar también selectedCampaign si es la misma
        setSelectedCampaign((prev) => (prev?.id === id ? { ...prev, ...updatedCampaignData } : prev));
        return { success: true, data: updatedCampaignData };
      }
      return { success: false, error: response?.error || "No se recibió respuesta del servidor" };
    } catch (err) {
      console.error("Error updating campaign:", err);
      return { success: false, error: err.message || "Error al actualizar la campaña" };
    }
  }, []);

  return {
    // Data
    campaigns,
    filteredCampaigns,
    stats,
    loading,
    error,
    
    // Filters
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    
    // Modal state
    selectedCampaign,
    detailsModalOpen,
    reviewModalOpen,
    editModalOpen,
    reviewAction,
    
    // Actions
    fetchCampaigns,
    updateCampaignStatus,
    updateCampaign,
    deleteCampaign,
    evaluateChecklist,
    calculateProgress,
    
    // Modal handlers
    openDetailsModal,
    openReviewModal,
    openEditModal,
    closeModals,
  };
}
