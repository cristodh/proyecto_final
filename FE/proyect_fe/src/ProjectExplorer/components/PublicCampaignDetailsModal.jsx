import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  IconButton,
  Chip,
  LinearProgress,
  Divider,
  Grid,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  CircularProgress,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BusinessIcon from "@mui/icons-material/Business";
import CategoryIcon from "@mui/icons-material/Category";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import LockIcon from "@mui/icons-material/Lock";
import LoginIcon from "@mui/icons-material/Login";
import ReportIcon from "@mui/icons-material/Report";
import DonationModal from "./DonationModal";
import { isFollowingCampaign, followCampaign, unfollowCampaign } from "../../services/campaignService";

const PLACEHOLDER_IMAGE = "https://via.placeholder.com/800x400?text=Campa%C3%B1a";

export default function PublicCampaignDetailsModal({
  open,
  onClose,
  campaign,
  user,
  canDonate,
  onDonate,
  formatCurrency,
  calculateProgress,
  refetchCampaigns,
}) {
  const navigate = useNavigate();
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [paymentMethodsLoading, setPaymentMethodsLoading] = useState(true);
  const [donationData, setDonationData] = useState({
    amount: "",
    paymentMethod: "",
    message: "",
    anonymous: false,
    confirmationEmail: "",
    proofOfPaymentUrl: "",
    proofOfPaymentDescription: "",
  });
  const [donationLoading, setDonationLoading] = useState(false);
  const [donationSuccess, setDonationSuccess] = useState(false);
  const [donationError, setDonationError] = useState(null);
  const [donationsModalOpen, setDonationsModalOpen] = useState(false);
  const [donationsData, setDonationsData] = useState({ donations: [], stats: null });
  const [donationsLoading, setDonationsLoading] = useState(false);
  const [donationsError, setDonationsError] = useState(null);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportData, setReportData] = useState({ reason: 'spam', description: '', reported_user: null, donation: null });
  const [reportLoading, setReportLoading] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);
  const [reportError, setReportError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [followError, setFollowError] = useState(null);
  
  // Cargar métodos de pago del backend
  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        setPaymentMethodsLoading(true);
        const response = await fetch("http://127.0.0.1:8000/campaign/payments/methods/");
        if (!response.ok) {
          throw new Error(`Error al cargar métodos de pago: ${response.status}`);
        }
        const data = await response.json();
        setPaymentMethods(data.payment_methods || []);
        // Establecer el primer método como predeterminado
        if (data.payment_methods && data.payment_methods.length > 0) {
          setDonationData((prev) => ({
            ...prev,
            paymentMethod: data.payment_methods[0].value,
          }));
        }
      } catch (error) {
        console.error("Error fetching payment methods:", error);
        setDonationError("No se pudieron cargar los métodos de pago: " + error.message);
      } finally {
        setPaymentMethodsLoading(false);
      }
    };

    fetchPaymentMethods();
  }, []);

  const {
    id,
    name,
    description,
    main_image,
    goal_amount,
    current_amount,
    start_date,
    end_date,
    campaign_status,
    category_name,
    creator_username,
    location,
    contact_email,
    contact_phone,
    project_sections,
    pdf_documents,
  } = campaign || {};

  // ¿Usuario autenticado?
  const token = localStorage.getItem("token");
  const roleId = localStorage.getItem("role_id");
  const userId = localStorage.getItem("id");
  
  // Si no hay user del prop, intentar construirlo desde localStorage
  const currentUser = user || (token && userId ? { 
    id: parseInt(userId), 
    role: roleId ? parseInt(roleId) : null 
  } : null);
  
  const isAuthenticated = !!token && !!currentUser;
  const isDonor = isAuthenticated && currentUser?.role === 2; // Rol 2 = Donor según backend

  // Consultar si el usuario ya sigue la campaña cuando se abre el modal
  useEffect(() => {
    const checkFollowing = async () => {
      if (!open || !campaign?.id || !isAuthenticated || !isDonor) {
        setIsFollowing(false);
        return;
      }
      try {
        setFollowLoading(true);
        const following = await isFollowingCampaign(campaign.id);
        setIsFollowing(!!following);
      } catch (error) {
        console.error('Error checking follow status:', error);
      } finally {
        setFollowLoading(false);
      }
    };

    checkFollowing();
  }, [open, campaign?.id, isAuthenticated, isDonor]);

  // Progreso
  const progress = calculateProgress
    ? calculateProgress(current_amount, goal_amount)
    : ((parseFloat(current_amount || 0) / parseFloat(goal_amount || 1)) * 100) || 0;

  // Formatear moneda
  const formatMoney = (value) => {
    if (formatCurrency) return formatCurrency(value);
    return new Intl.NumberFormat("es-CR", {
      style: "currency",
      currency: "CRC",
      minimumFractionDigits: 0,
    }).format(value || 0);
  };

  // Formatear fecha
  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("es-CR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Días restantes
  const getDaysRemaining = () => {
    if (!end_date) return null;
    const endDate = new Date(end_date);
    const today = new Date();
    const diffTime = endDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const daysRemaining = getDaysRemaining();

  // Manejo de donación
  const handleDonationChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDonationData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmitDonation = async (e) => {
    e.preventDefault();
    setDonationLoading(true);
    setDonationError(null);

    try {
      // Validaciones
      if (!donationData.amount || parseFloat(donationData.amount) <= 0) {
        setDonationError("El monto debe ser mayor a 0");
        setDonationLoading(false);
        return;
      }

      if (!donationData.confirmationEmail) {
        setDonationError("El email de confirmación es requerido");
        setDonationLoading(false);
        return;
      }

      if (!donationData.proofOfPaymentUrl) {
        setDonationError("El comprobante de pago es requerido");
        setDonationLoading(false);
        return;
      }

      if (!donationData.proofOfPaymentDescription) {
        setDonationError("La descripción del comprobante es requerida");
        setDonationLoading(false);
        return;
      }

      // Simular la llamada al backend
      const payload = {
        campaign: id,
        amount: parseFloat(donationData.amount),
        message: donationData.message,
        anonymous: donationData.anonymous,
        payment_method: donationData.paymentMethod,
        confirmation_email: donationData.confirmationEmail,
        proof_of_payment_url: donationData.proofOfPaymentUrl,
        proof_of_payment_description: donationData.proofOfPaymentDescription,
        proof_of_payment_name: donationData.proofOfPaymentName || "",
      };

      // Obtener token del localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Debes iniciar sesión para donar");
      }

      // Aquí iría la llamada real al endpoint: POST /campaign/donations/create/
      const response = await fetch("http://127.0.0.1:8000/campaign/donations/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al enviar donación");
      }

      const data = await response.json();

      setDonationSuccess(true);
      setDonationData({
        amount: "",
        paymentMethod: paymentMethods.length > 0 ? paymentMethods[0].value : "",
        message: "",
        anonymous: false,
        confirmationEmail: "",
        proofOfPaymentUrl: "",
        proofOfPaymentDescription: "",
      });

      // Recargar campañas para actualizar el monto recaudado
      if (refetchCampaigns) {
        await refetchCampaigns();
      }

      // Limpiar mensaje de éxito después de 3 segundos
      setTimeout(() => {
        setDonationSuccess(false);
        setShowDonationForm(false);
      }, 3000);
    } catch (error) {
      setDonationError(error.message || "Error al procesar la donación");
    } finally {
      setDonationLoading(false);
    }
  };

  const handleToggleFollow = async () => {
    try {
      if (!isAuthenticated) {
        navigate("/auth-user");
        return;
      }
      setFollowError(null);
      setFollowLoading(true);

      if (isFollowing) {
        await unfollowCampaign(id);
        setIsFollowing(false);
      } else {
        await followCampaign(id);
        setIsFollowing(true);
      }

      if (refetchCampaigns) {
        await refetchCampaigns();
      }
    } catch (error) {
      console.error('Error toggling follow:', error);
      setFollowError('No se pudo actualizar el seguimiento.');
    } finally {
      setFollowLoading(false);
    }
  };

  return (<>
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      scroll="paper"
      PaperProps={{
        sx: { borderRadius: 2 },
      }}
    >
      <DialogTitle sx={{ pr: 6, py: 1.5 }}>
        <Typography variant="subtitle1" fontWeight={700}>
          {name}
        </Typography>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 2 }}>
        {/* Imagen principal */}
        <Box
          sx={{
            width: "100%",
            height: 180,
            borderRadius: 1.5,
            overflow: "hidden",
            mb: 2,
          }}
        >
          <Box
            component="img"
            src={main_image || PLACEHOLDER_IMAGE}
            alt={name}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>

        {/* Categoría y ubicación */}
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
          {category_name && (
            <Chip
              icon={<CategoryIcon />}
              label={category_name}
              color="primary"
              size="small"
            />
          )}
          {location && (
            <Chip
              icon={<LocationOnIcon />}
              label={location}
              variant="outlined"
              size="small"
            />
          )}
          {daysRemaining !== null && (
            <Chip
              icon={<CalendarTodayIcon />}
              label={daysRemaining > 0 ? `${daysRemaining} días restantes` : "Finalizada"}
              color={daysRemaining > 0 ? "success" : "default"}
              size="small"
            />
          )}
        </Box>

        {/* Progreso de financiamiento */}
        <Paper elevation={0} sx={{ p: 1.5, mb: 2, bgcolor: "grey.50", borderRadius: 1.5 }}>
          <Typography variant="body2" fontWeight={700} gutterBottom>
            Progreso de Financiamiento
          </Typography>
          <LinearProgress
            variant="determinate"
            value={Math.min(progress, 100)}
            sx={{
              height: 8,
              borderRadius: 4,
              mb: 1,
              bgcolor: "grey.200",
              "& .MuiLinearProgress-bar": { borderRadius: 4 },
            }}
          />
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Typography variant="body2" fontWeight={700} color="primary">
                {formatMoney(current_amount)}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.65rem" }}>
                Recaudado
              </Typography>
            </Grid>
            <Grid item xs={4} sx={{ textAlign: "center" }}>
              <Typography variant="body2" fontWeight={700}>
                {progress.toFixed(1)}%
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.65rem" }}>
                Completado
              </Typography>
            </Grid>
            <Grid item xs={4} sx={{ textAlign: "right" }}>
              <Typography variant="body2" fontWeight={700}>
                {formatMoney(goal_amount)}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.65rem" }}>
                Meta
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* Botón: Ver donaciones */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            size="small"
            variant="outlined"
            onClick={async () => {
              try {
                setDonationsError(null);
                setDonationsLoading(true);
                setDonationsModalOpen(true);
                const authToken = localStorage.getItem("token");
                const res = await fetch(`http://127.0.0.1:8000/campaign/donations/campaign/${id}/`, {
                  headers: {
                    "Accept": "application/json",
                    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
                  },
                });
                if (!res.ok) {
                  const err = await res.json().catch(() => ({}));
                  throw new Error(err.error || `Error al cargar donaciones (${res.status})`);
                }
                const data = await res.json();
                setDonationsData({ donations: data.donations || [], stats: data.stats || null });
              } catch (e) {
                setDonationsError(e.message);
              } finally {
                setDonationsLoading(false);
              }
            }}
          >
            Ver donaciones
          </Button>
        </Box>

        {/* Descripción */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" fontWeight={700} gutterBottom>
            Descripción
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: "pre-line", display: "block" }}>
            {description}
          </Typography>
        </Box>

        <Divider sx={{ my: 1.5 }} />

        {/* Información del creador - Solo visible para usuarios autenticados */}
        {isAuthenticated ? (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" fontWeight={700} gutterBottom>
              Información de Contacto
            </Typography>
            <List dense disablePadding>
              <ListItem disableGutters sx={{ py: 0.25 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <BusinessIcon color="primary" fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={creator_username || "No especificado"}
                  secondary="Creador"
                  primaryTypographyProps={{ variant: "caption", fontWeight: 600 }}
                  secondaryTypographyProps={{ variant: "caption", sx: { fontSize: "0.65rem" } }}
                />
              </ListItem>
              {contact_email && (
                <ListItem disableGutters sx={{ py: 0.25 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <EmailIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={contact_email}
                    secondary="Email"
                    primaryTypographyProps={{ variant: "caption", fontWeight: 600 }}
                    secondaryTypographyProps={{ variant: "caption", sx: { fontSize: "0.65rem" } }}
                  />
                </ListItem>
              )}
              {contact_phone && (
                <ListItem disableGutters sx={{ py: 0.25 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <PhoneIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={contact_phone}
                    secondary="Teléfono"
                    primaryTypographyProps={{ variant: "caption", fontWeight: 600 }}
                    secondaryTypographyProps={{ variant: "caption", sx: { fontSize: "0.65rem" } }}
                  />
                </ListItem>
              )}
            </List>
          </Box>
        ) : (
          <Alert severity="info" icon={<LockIcon fontSize="small" />} sx={{ mb: 2, py: 0.5 }}>
            <Typography variant="caption">
              <strong>Inicia sesión</strong> para ver la información de contacto.
            </Typography>
          </Alert>
        )}

        {/* Fechas */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" fontWeight={700} gutterBottom>
            Fechas
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.65rem" }}>
                Inicio
              </Typography>
              <Typography variant="caption" fontWeight={600} display="block">
                {formatDate(start_date)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.65rem" }}>
                Finalización
              </Typography>
              <Typography variant="caption" fontWeight={600} display="block">
                {formatDate(end_date)}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Desglose del presupuesto - Solo para usuarios autenticados */}
        {isAuthenticated && project_sections && project_sections.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" fontWeight={700} gutterBottom>
              Desglose del Presupuesto
            </Typography>
            <Paper variant="outlined" sx={{ p: 1 }}>
              {project_sections.map((section, index) => {
                const percentage = (section.goal / goal_amount) * 100;
                return (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      py: 0.75,
                      px: 1,
                      borderBottom: index < project_sections.length - 1 ? 1 : 0,
                      borderColor: "divider",
                    }}
                  >
                    <Box>
                      <Typography variant="caption" fontWeight={600} display="block">
                        {section.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.65rem" }}>
                        {percentage.toFixed(1)}%
                      </Typography>
                    </Box>
                    <Typography variant="caption" fontWeight={600}>
                      {formatMoney(section.goal)}
                    </Typography>
                  </Box>
                );
              })}
              <Divider sx={{ my: 0.5 }} />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  py: 0.75,
                  px: 1,
                }}
              >
                <Typography variant="caption" fontWeight={700}>
                  Total
                </Typography>
                <Typography variant="caption" fontWeight={700} color="primary">
                  {formatMoney(goal_amount)}
                </Typography>
              </Box>
            </Paper>
          </Box>
        )}

        {/* Mensaje para no autenticados sobre funciones restringidas */}
        {!isAuthenticated && (
          <Alert severity="warning" sx={{ mt: 1, py: 0.5 }}>
            <Typography variant="caption">
              Para <strong>donar</strong> y ver más información, <strong>inicia sesión</strong> o regístrate.
            </Typography>
          </Alert>
        )}

        <Divider sx={{ my: 2 }} />

        {/* Formulario de Donación - Solo para donantes autenticados */}
        {isDonor && (
          <Box sx={{ mb: 2 }}>
            <Button
              variant={isFollowing ? "outlined" : "contained"}
              color="primary"
              fullWidth
              startIcon={<FavoriteIcon />}
              onClick={handleToggleFollow}
              disabled={followLoading}
              sx={{ mb: 1 }}
            >
              {isFollowing ? "Dejar de seguir" : "Seguir campaña"}
            </Button>
            {followError && (
              <Alert severity="error" sx={{ mt: 1 }}>
                {followError}
              </Alert>
            )}
          </Box>
        )}

        {isDonor && daysRemaining > 0 && (
          <Box sx={{ mb: 2 }}>
            <Button
              variant="contained"
              color="success"
              fullWidth
              startIcon={<FavoriteIcon />}
              onClick={() => {
                setShowDonationForm(true);
                setDonationData({
                  ...donationData,
                  confirmationEmail: currentUser?.email || "",
                });
              }}
              sx={{ mb: 2 }}
            >
              Hacer una Donación
            </Button>
          </Box>
        )}

        {/* Información: No es donante */}
        {isAuthenticated && !isDonor && (
          <Alert severity="info" icon={<LockIcon fontSize="small" />} sx={{ mb: 2, py: 0.5 }}>
            <Typography variant="caption">
              Solo los donantes pueden realizar contribuciones a las campañas.
            </Typography>
          </Alert>
        )}

        {/* Información: Campaña finalizada */}
        {isAuthenticated && daysRemaining <= 0 && (
          <Alert severity="warning" sx={{ mb: 2, py: 0.5 }}>
            <Typography variant="caption">
              Esta campaña ha finalizado y no acepta más donaciones.
            </Typography>
          </Alert>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 1.5, gap: 1 }}>
        <Button onClick={onClose} variant="outlined" size="small">
          Cerrar
        </Button>
        {isAuthenticated && (
          <Button
            variant="outlined"
            color="error"
            startIcon={<ReportIcon />}
            size="small"
            onClick={() => {
              setReportData({ reason: 'spam', description: '', reported_user: null, donation: null });
              setReportModalOpen(true);
              setReportSuccess(false);
              setReportError(null);
            }}
          >
            Reportar campaña
          </Button>
        )}
        {!isAuthenticated && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<LoginIcon />}
            onClick={() => navigate("/auth-user")}
            size="small"
          >
            Iniciar Sesión
          </Button>
        )}
      </DialogActions>

      {/* Modal de Donación */}
      <DonationModal
        open={showDonationForm}
        onClose={() => {
          setShowDonationForm(false);
          setDonationError(null);
        }}
        campaign={campaign}
        paymentMethods={paymentMethods}
        paymentMethodsLoading={paymentMethodsLoading}
        donationData={donationData}
        setDonationData={setDonationData}
        donationLoading={donationLoading}
        donationSuccess={donationSuccess}
        donationError={donationError}
        setDonationError={setDonationError}
        handleDonationChange={handleDonationChange}
        handleSubmitDonation={handleSubmitDonation}
      />
    </Dialog>

    {/* Modal: Lista de Donaciones */}
    <Dialog
      open={donationsModalOpen}
      onClose={() => setDonationsModalOpen(false)}
      maxWidth="sm"
      fullWidth
      scroll="paper"
      PaperProps={{ sx: { borderRadius: 2 } }}
    >
      <DialogTitle sx={{ pr: 6, py: 1.5 }}>
        <Typography variant="subtitle1" fontWeight={700}>
          Donaciones de {name}
        </Typography>
        <IconButton onClick={() => setDonationsModalOpen(false)} size="small" sx={{ position: "absolute", right: 8, top: 8 }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ p: 2 }}>
        {/* Misma barra de progreso */}
        <Paper elevation={0} sx={{ p: 1.5, mb: 2, bgcolor: "grey.50", borderRadius: 1.5 }}>
          <Typography variant="body2" fontWeight={700} gutterBottom>
            Progreso de Financiamiento
          </Typography>
          <LinearProgress
            variant="determinate"
            value={Math.min(
              donationsData.stats?.progress_percentage ?? progress,
              100
            )}
            sx={{ height: 8, borderRadius: 4, mb: 1, bgcolor: "grey.200", "& .MuiLinearProgress-bar": { borderRadius: 4 } }}
          />
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Typography variant="body2" fontWeight={700} color="primary">
                {formatMoney(donationsData.stats?.current_amount ?? current_amount)}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.65rem" }}>
                Recaudado
              </Typography>
            </Grid>
            <Grid item xs={4} sx={{ textAlign: "center" }}>
              <Typography variant="body2" fontWeight={700}>
                {(donationsData.stats?.progress_percentage ?? progress).toFixed(1)}%
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.65rem" }}>
                Completado
              </Typography>
            </Grid>
            <Grid item xs={4} sx={{ textAlign: "right" }}>
              <Typography variant="body2" fontWeight={700}>
                {formatMoney(donationsData.stats?.goal_amount ?? goal_amount)}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.65rem" }}>
                Meta
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {donationsLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
            <CircularProgress size={20} />
          </Box>
        )}
        {donationsError && (
          <Alert severity="error" sx={{ mb: 2 }}>{donationsError}</Alert>
        )}

        {!donationsLoading && !donationsError && (
          <List dense>
            {donationsData.donations.length === 0 && (
              <Typography variant="caption" color="text.secondary">
                Aún no hay donaciones registradas.
              </Typography>
            )}
            {donationsData.donations.map((d) => (
              <ListItem key={d.confirmation_number} disableGutters sx={{ py: 0.75, display: 'flex', alignItems: 'flex-start' }}>
                <ListItemIcon sx={{ minWidth: 32, mt: 0.5 }}>
                  <Avatar sx={{ bgcolor: "success.main", width: 24, height: 24 }}>
                    ₡
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography variant="caption" fontWeight={700}>
                        {d.donor_username === 'Anónimo' ? 'Usuario anónimo' : d.donor_username}
                      </Typography>
                      <Typography variant="caption" fontWeight={700} color="primary">
                        {formatMoney(d.amount)}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem", display: 'block' }}>
                        {d.message ? d.message : 'Sin mensaje'}
                      </Typography>
                      {d.proof_of_payment_name && (
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.65rem" }}>
                          Comprobante: {d.proof_of_payment_name}
                        </Typography>
                      )}
                    </Box>
                  }
                />
                {/* Botón Reportar - Solo si no es anónimo y hay usuario autenticado */}
                {d.donor_username !== 'Anónimo' && d.donor && isAuthenticated && (
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => {
                      setReportData({
                        reason: 'spam',
                        description: '',
                        reported_user: d.donor,
                        donation: d.id
                      });
                      setReportModalOpen(true);
                      setReportSuccess(false);
                      setReportError(null);
                    }}
                    sx={{ ml: 1 }}
                  >
                    <ReportIcon fontSize="small" />
                  </IconButton>
                )}
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
      <DialogActions sx={{ p: 1.5, gap: 1 }}>
        <Button onClick={() => setDonationsModalOpen(false)} variant="outlined" size="small">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>

    {/* Modal: Reportar Usuario */}
    <Dialog
      open={reportModalOpen}
      onClose={() => setReportModalOpen(false)}
      maxWidth="xs"
      fullWidth
      PaperProps={{ sx: { borderRadius: 2 } }}
    >
      <DialogTitle sx={{ pr: 6, py: 1.5 }}>
        <Typography variant="subtitle1" fontWeight={700}>
          {reportData.reported_user ? 'Reportar Usuario' : 'Reportar Campaña'}
        </Typography>
        <IconButton onClick={() => setReportModalOpen(false)} size="small" sx={{ position: "absolute", right: 8, top: 8 }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ p: 2 }}>
        {reportSuccess && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Reporte enviado exitosamente. Será revisado por un administrador.
          </Alert>
        )}
        {reportError && (
          <Alert severity="error" sx={{ mb: 2 }}>{reportError}</Alert>
        )}
        
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Motivo del reporte</InputLabel>
            <Select
              value={reportData.reason}
              onChange={(e) => setReportData({ ...reportData, reason: e.target.value })}
              label="Motivo del reporte"
              disabled={reportLoading || reportSuccess}
            >
              <MenuItem value="spam">Spam o contenido no deseado</MenuItem>
              <MenuItem value="fraud">Fraude o estafa</MenuItem>
              <MenuItem value="abuse">Acoso o abuso</MenuItem>
              <MenuItem value="inappropriate">Contenido inapropiado</MenuItem>
              <MenuItem value="other">Otro</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            multiline
            rows={3}
            size="small"
            label="Descripción (opcional)"
            placeholder="Describe el motivo de tu reporte..."
            value={reportData.description}
            onChange={(e) => setReportData({ ...reportData, description: e.target.value })}
            disabled={reportLoading || reportSuccess}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 1.5, gap: 1 }}>
        <Button 
          onClick={() => setReportModalOpen(false)} 
          variant="outlined" 
          size="small"
          disabled={reportLoading}
        >
          Cancelar
        </Button>
        <Button 
          onClick={async () => {
            try {
              setReportLoading(true);
              setReportError(null);
              
              const authToken = localStorage.getItem("token");
              if (!authToken) {
                throw new Error("Debes iniciar sesión para reportar");
              }

              const payload = {
                campaign: Number(id),
                reason: reportData.reason,
                description: reportData.description
              };
              if (reportData.reported_user) {
                payload.reported_user = reportData.reported_user;
              }
              if (reportData.donation) {
                payload.donation = reportData.donation;
              }

              console.log('REPORT PAYLOAD', payload);

              const res = await fetch('http://127.0.0.1:8000/campaign/reports/create/', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify(payload)
              });

              if (!res.ok) {
                const text = await res.text();
                let errMsg = `Error al enviar reporte (${res.status})`;
                try {
                  const parsed = JSON.parse(text || '{}');
                  errMsg = parsed.error || parsed.detail || errMsg;
                } catch (_) {
                  if (text) errMsg = `${errMsg}: ${text}`;
                }
                throw new Error(errMsg);
              }

              setReportSuccess(true);
              setTimeout(() => {
                setReportModalOpen(false);
                setReportSuccess(false);
                setReportData({ reason: 'spam', description: '', reported_user: null, donation: null });
              }, 2000);
            } catch (e) {
              setReportError(e.message);
            } finally {
              setReportLoading(false);
            }
          }}
          variant="contained" 
          color="error" 
          size="small"
          disabled={reportLoading || reportSuccess}
          startIcon={reportLoading ? <CircularProgress size={16} /> : <ReportIcon />}
        >
          {reportLoading ? 'Enviando...' : 'Enviar Reporte'}
        </Button>
      </DialogActions>
    </Dialog>
  </>);
}
