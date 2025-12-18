import { useState, useEffect, useCallback, useMemo } from "react";
import { getData, authenticatedGetData } from "../../services/fetch";

// Provincias de Costa Rica
export const PROVINCES = [
  "San José",
  "Alajuela", 
  "Cartago",
  "Heredia",
  "Guanacaste",
  "Puntarenas",
  "Limón",
];

// Opciones de ordenamiento
export const SORT_OPTIONS = [
  { value: "recent", label: "Más Recientes" },
  { value: "popular", label: "Más Populares" },
  { value: "ending", label: "Por Finalizar" },
  { value: "top", label: "Mayor Meta" },
  { value: "name", label: "Alfabético" },
];

export function useExplore() {
  // Estado de campañas
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estado de categorías
  const [categories, setCategories] = useState([]);
  
  // Estado de filtros
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    province: "",
    sortBy: "recent",
    minGoal: 0,
    maxGoal: 100000000,
  });
  
  // Paginación
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(8);
  
  // Estado del usuario
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null); // 'donor', 'manager', 'admin', null
  
  // Campaña seleccionada para modal de detalles
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [donationModalOpen, setDonationModalOpen] = useState(false);

  // Cargar datos del usuario desde localStorage
  useEffect(() => {
    const loadUserData = () => {
      try {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");
        const roleStr = localStorage.getItem("role_id");
        console.log("Loaded role from localStorage:", roleStr);
        console.log("Loaded userData from localStorage:", userData);
        console.log("Loaded token from localStorage:", token);
        
        if (token && userData) {
          const parsedUser = JSON.parse(userData);
          
          // Agregar el rol numérico al objeto user
          if (roleStr) {
            parsedUser.role = parseInt(roleStr);
          }
          
          setUser(parsedUser);
          console.log("Set user state:", parsedUser);
          
          // Determinar rol textual para referencia
          if (roleStr) {
            const roleNum = parseInt(roleStr);
            if (roleNum === 1) setUserRole("manager");
            else if (roleNum === 2) setUserRole("donor");
            else if (roleNum === 5) setUserRole("admin");
            else setUserRole(null);
          }
        } else {
          setUser(null);
          setUserRole(null);
        }
      } catch (err) {
        console.error("Error loading user data:", err);
      }
    };
    
    loadUserData();
  }, []);

  // Cargar categorías
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getData("campaign/categories/");
        if (response && Array.isArray(response)) {
          setCategories(response);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    
    fetchCategories();
  }, []);

  // Cargar campañas
  const fetchCampaigns = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Construir query params
      const params = new URLSearchParams();
      if (filters.search) params.append("search", filters.search);
      if (filters.category) params.append("category", filters.category);
      if (filters.province) params.append("province", filters.province);
      if (filters.sortBy) params.append("sort_by", filters.sortBy);
      if (filters.minGoal > 0) params.append("min_goal", filters.minGoal);
      if (filters.maxGoal < 100000000) params.append("max_goal", filters.maxGoal);
      
      const queryString = params.toString();
      const endpoint = `campaign/explore/${queryString ? `?${queryString}` : ""}`;
      
      const response = await getData(endpoint);
      
      if (response && response.campaigns) {
        setCampaigns(response.campaigns);
      } else {
        setCampaigns([]);
      }
    } catch (err) {
      console.error("Error fetching campaigns:", err);
      setError("Error al cargar las campañas");
      setCampaigns([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Cargar campañas al montar y cuando cambien los filtros
  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  // Campañas filtradas y paginadas
  const paginatedCampaigns = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return campaigns.slice(start, end);
  }, [campaigns, page, itemsPerPage]);

  // Total de páginas
  const totalPages = useMemo(() => {
    return Math.ceil(campaigns.length / itemsPerPage);
  }, [campaigns.length, itemsPerPage]);

  // Handlers de filtros
  const updateFilter = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1); // Reset a página 1 al cambiar filtros
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      search: "",
      category: "",
      province: "",
      sortBy: "recent",
      minGoal: 0,
      maxGoal: 100000000,
    });
    setPage(1);
  }, []);

  // Handlers de modales
  const openDetails = useCallback((campaign) => {
    setSelectedCampaign(campaign);
    setDetailsModalOpen(true);
  }, []);

  const closeDetails = useCallback(() => {
    setDetailsModalOpen(false);
    setSelectedCampaign(null);
  }, []);

  const openDonation = useCallback((campaign) => {
    setSelectedCampaign(campaign);
    setDonationModalOpen(true);
  }, []);

  const closeDonation = useCallback(() => {
    setDonationModalOpen(false);
  }, []);

  // Calcular progreso
  const calculateProgress = useCallback((current, goal) => {
    if (!goal || goal <= 0) return 0;
    const progress = (parseFloat(current) / parseFloat(goal)) * 100;
    return Math.min(progress, 100);
  }, []);

  // Formatear moneda
  const formatCurrency = useCallback((amount) => {
    return new Intl.NumberFormat("es-CR", {
      style: "currency",
      currency: "CRC",
      minimumFractionDigits: 0,
    }).format(amount || 0);
  }, []);

  // Verificar si el usuario puede donar
  const canDonate = useCallback((campaign) => {
    // Usuario debe estar autenticado, ser donor activo y la campaña debe estar activa
    if (!user || userRole !== "donor") return false;
    if (user.active === false) return false;
    if (!campaign) return false;
    return campaign.campaign_status === "ACTIVA";
  }, [user, userRole]);

  // Verificar si el usuario es dueño de una campaña
  const isOwner = useCallback((campaign) => {
    if (!user || !campaign) return false;
    return campaign.creator === user.id;
  }, [user]);

  return {
    // Datos
    campaigns: paginatedCampaigns,
    totalCampaigns: campaigns.length,
    categories,
    loading,
    error,
    
    // Usuario
    user: user ? { ...user, role: userRole === "donor" ? 4 : userRole === "manager" ? 2 : userRole === "admin" ? 1 : null } : null,
    userRole,
    canDonate,
    isOwner,
    
    // Filtros
    filters,
    updateFilter,
    clearFilters,
    
    // Paginación
    pagination: {
      page,
      totalPages,
      total: campaigns.length,
    },
    goToPage: setPage,
    
    // Modales
    modals: {
      details: detailsModalOpen,
      donation: donationModalOpen,
      selectedCampaign,
    },
    openDetailsModal: openDetails,
    closeDetailsModal: closeDetails,
    openDonationModal: openDonation,
    closeDonationModal: closeDonation,
    
    // Utilidades
    calculateProgress,
    formatCurrency,
    refetchCampaigns: fetchCampaigns,
    
    // Constantes
    PROVINCES,
    SORT_OPTIONS,
  };
}

export default useExplore;