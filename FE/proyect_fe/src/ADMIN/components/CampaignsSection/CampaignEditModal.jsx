import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  TextField,
  Grid,
  MenuItem,
  IconButton,
  Alert,
  CircularProgress,
  InputAdornment,
  Paper,
  Link,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { patchData, authenticatedGetData } from "../../../services/fetch";
import { CAMPAIGN_STATUS, STATUS_CONFIG } from "./useCampaigns";

export default function CampaignEditModal({ open, onClose, campaign, onSave }) {
  const [formData, setFormData] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  // Estado para nueva sección
  const [newSection, setNewSection] = useState({ name: "", goal: "" });
  
  // Estados para archivos PDF
  const [newPdfFiles, setNewPdfFiles] = useState([]); // Archivos pendientes de subir
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const fileInputRef = useRef(null);
  
  // Cloudinary config
  const cloudName = "dfcwqzjks";
  const uploadPreset = "pdfsss";

  // Cargar datos de la campaña cuando se abre el modal
  useEffect(() => {
    if (open && campaign) {
      setFormData({
        name: campaign.name || "",
        description: campaign.description || "",
        short_description: campaign.short_description || "",
        slogan: campaign.slogan || "",
        story: campaign.story || "",
        start_date: campaign.start_date || "",
        end_date: campaign.end_date || "",
        goal_amount: campaign.goal_amount || "",
        location: campaign.location || "",
        category: campaign.category || "",
        contact_phone: campaign.contact_phone || "",
        contact_email: campaign.contact_email || "",
        website: campaign.website || "",
        campaign_status: campaign.campaign_status || "pending",
        admin_comment: campaign.admin_comment || "",
        project_sections: campaign.project_sections || [],
        pdf_documents: campaign.pdf_documents || [],
      });
      setNewSection({ name: "", goal: "" });
      setNewPdfFiles([]);
      setError(null);
      setSuccess(false);
      fetchCategories();
    }
  }, [open, campaign]);

  // Cargar categorías
  const fetchCategories = async () => {
    try {
      const response = await authenticatedGetData("campaign/new_categories/");
      if (response && Array.isArray(response)) {
        setCategories(response);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  // Agregar nueva sección
  const handleAddSection = () => {
    if (newSection.name.trim() && newSection.goal && parseFloat(newSection.goal) > 0) {
      setFormData((prev) => ({
        ...prev,
        project_sections: [
          ...(prev.project_sections || []),
          { name: newSection.name.trim(), goal: parseFloat(newSection.goal) }
        ]
      }));
      setNewSection({ name: "", goal: "" });
    }
  };

  // Eliminar sección
  const handleRemoveSection = (index) => {
    setFormData((prev) => ({
      ...prev,
      project_sections: (prev.project_sections || []).filter((_, i) => i !== index)
    }));
  };

  // ============================================================
  // FUNCIONES PARA ARCHIVOS PDF
  // ============================================================
  
  // Actualizar descripción de un PDF existente
  const handlePdfDescriptionChange = (index, value) => {
    setFormData((prev) => {
      const updatedPdfs = [...(prev.pdf_documents || [])];
      updatedPdfs[index] = { ...updatedPdfs[index], description: value };
      return { ...prev, pdf_documents: updatedPdfs };
    });
  };

  // Eliminar un PDF existente
  const handleRemovePdf = (index) => {
    setFormData((prev) => ({
      ...prev,
      pdf_documents: (prev.pdf_documents || []).filter((_, i) => i !== index)
    }));
  };

  // Manejar selección de nuevos archivos
  const handleFileSelect = (e) => {
    const selected = Array.from(e.target.files);
    const mapped = selected.map(file => ({
      file,
      description: ""
    }));
    setNewPdfFiles(prev => [...prev, ...mapped]);
  };

  // Actualizar descripción de archivo pendiente
  const handleNewPdfDescriptionChange = (index, value) => {
    const updated = [...newPdfFiles];
    updated[index].description = value;
    setNewPdfFiles(updated);
  };

  // Eliminar archivo pendiente
  const handleRemoveNewPdf = (index) => {
    setNewPdfFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Subir archivo a Cloudinary
  const uploadPdfToCloudinary = async (file) => {
    const formDataUpload = new FormData();
    formDataUpload.append("file", file);
    formDataUpload.append("upload_preset", uploadPreset);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`,
      { method: "POST", body: formDataUpload }
    );
    return await res.json();
  };

  // Subir todos los archivos pendientes
  const handleUploadNewPdfs = async () => {
    // Validar descripciones
    for (const f of newPdfFiles) {
      if (!f.description.trim()) {
        setError("Todos los archivos requieren una descripción antes de subir.");
        return;
      }
    }

    setUploadingPdf(true);
    const uploadedList = [];

    for (const item of newPdfFiles) {
      try {
        const data = await uploadPdfToCloudinary(item.file);
        uploadedList.push({
          name: item.file.name,
          description: item.description,
          url: data.secure_url,
        });
      } catch (err) {
        console.error(`Error subiendo ${item.file.name}:`, err);
      }
    }

    setUploadingPdf(false);

    if (uploadedList.length > 0) {
      setFormData((prev) => ({
        ...prev,
        pdf_documents: [...(prev.pdf_documents || []), ...uploadedList]
      }));
      setNewPdfFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Verificar si se requiere comentario del admin
  const requiresAdminComment = () => {
    return formData.campaign_status && formData.campaign_status !== "active";
  };

  const handleSubmit = async () => {
    // Validar comentario obligatorio si el estado no es "active"
    if (requiresAdminComment() && !formData.admin_comment?.trim()) {
      setError("Debes proporcionar un comentario explicando la razón del estado seleccionado.");
      return;
    }

    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await patchData(`campaign/update/${campaign.id}/`, formData);
      
      if (response?.ok || response?.campaign) {
        setSuccess(true);
        onSave?.(campaign.id, response.campaign || { ...campaign, ...formData });
        setTimeout(() => {
          onClose();
        }, 1000);
      } else {
        setError(response?.error || "Error al guardar los cambios");
      }
    } catch (err) {
      console.error("Error updating campaign:", err);
      setError("Error de conexión. Intenta de nuevo.");
    } finally {
      setSaving(false);
    }
  };

  if (!campaign) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3 },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <EditIcon color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Editar Campaña
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 3, maxHeight: "70vh", overflowY: "auto" }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            ¡Campaña actualizada exitosamente!
          </Alert>
        )}

        {/* ============================================================ */}
        {/* INFORMACIÓN BÁSICA */}
        {/* ============================================================ */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: "primary.main", display: "flex", alignItems: "center", gap: 1 }}>
            📝 Información Básica
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nombre de la campaña *"
                value={formData.name}
                onChange={handleChange("name")}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Slogan"
                value={formData.slogan}
                onChange={handleChange("slogan")}
                placeholder="Frase corta que identifica tu campaña"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descripción corta"
                value={formData.short_description}
                onChange={handleChange("short_description")}
                placeholder="Resumen breve de la campaña"
                inputProps={{ maxLength: 200 }}
                helperText={`${formData.short_description?.length || 0}/200 caracteres`}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Descripción completa *"
                value={formData.description}
                onChange={handleChange("description")}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Historia"
                value={formData.story}
                onChange={handleChange("story")}
                placeholder="Cuenta la historia detrás de tu campaña..."
              />
            </Grid>
          </Grid>
        </Box>

        {/* ============================================================ */}
        {/* FECHAS Y META FINANCIERA */}
        {/* ============================================================ */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: "primary.main", display: "flex", alignItems: "center", gap: 1 }}>
            📅 Fechas y Meta Financiera
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type="date"
                label="Fecha de inicio *"
                value={formData.start_date}
                onChange={handleChange("start_date")}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type="date"
                label="Fecha de fin *"
                value={formData.end_date}
                onChange={handleChange("end_date")}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type="number"
                label="Meta financiera *"
                value={formData.goal_amount}
                onChange={handleChange("goal_amount")}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₡</InputAdornment>,
                }}
              />
            </Grid>
          </Grid>
        </Box>

        {/* ============================================================ */}
        {/* UBICACIÓN Y CATEGORÍA */}
        {/* ============================================================ */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: "primary.main", display: "flex", alignItems: "center", gap: 1 }}>
            📍 Ubicación y Categoría
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Ubicación *"
                value={formData.location}
                onChange={handleChange("location")}
                placeholder="Ciudad, País"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Categoría *"
                value={formData.category}
                onChange={handleChange("category")}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Box>

        {/* ============================================================ */}
        {/* INFORMACIÓN DE CONTACTO */}
        {/* ============================================================ */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: "primary.main", display: "flex", alignItems: "center", gap: 1 }}>
            📞 Información de Contacto
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Teléfono"
                value={formData.contact_phone}
                onChange={handleChange("contact_phone")}
                placeholder="+506 8888-8888"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type="email"
                label="Email de contacto"
                value={formData.contact_email}
                onChange={handleChange("contact_email")}
                placeholder="correo@ejemplo.com"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Sitio web"
                value={formData.website}
                onChange={handleChange("website")}
                placeholder="https://..."
              />
            </Grid>
          </Grid>
        </Box>

        {/* ============================================================ */}
        {/* ESTADO DE LA CAMPAÑA */}
        {/* ============================================================ */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: "primary.main", display: "flex", alignItems: "center", gap: 1 }}>
            ⚙️ Estado de la Campaña
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Estado"
                value={formData.campaign_status}
                onChange={handleChange("campaign_status")}
              >
                {Object.entries(STATUS_CONFIG).map(([value, config]) => (
                  <MenuItem key={value} value={value}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          bgcolor: config.textColor,
                        }}
                      />
                      {config.label}
                    </Box>
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            
            {/* Comentario del administrador - obligatorio si no está activa */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label={requiresAdminComment() ? "Comentario del administrador *" : "Comentario del administrador"}
                value={formData.admin_comment || ""}
                onChange={handleChange("admin_comment")}
                placeholder={
                  formData.campaign_status === "rejected" ? "Explica la razón del rechazo..." :
                  formData.campaign_status === "detained" ? "Explica la razón de la detención..." :
                  formData.campaign_status === "pending" ? "Explica por qué está pendiente..." :
                  formData.campaign_status === "completed" ? "Comentarios sobre la finalización..." :
                  "Comentarios adicionales (opcional)"
                }
                required={requiresAdminComment()}
                error={requiresAdminComment() && !formData.admin_comment?.trim()}
                helperText={
                  requiresAdminComment() && !formData.admin_comment?.trim()
                    ? "Este campo es obligatorio cuando el estado no es 'Activa'"
                    : formData.campaign_status === "active" 
                      ? "Opcional para campañas activas"
                      : ""
                }
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: requiresAdminComment() ? 'rgba(255, 152, 0, 0.05)' : 'transparent',
                  }
                }}
              />
            </Grid>
          </Grid>
        </Box>

        {/* ============================================================ */}
        {/* METAS POR SECCIÓN DEL PROYECTO */}
        {/* ============================================================ */}
        <Box sx={{ mb: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: "primary.main", display: "flex", alignItems: "center", gap: 1 }}>
            📊 Metas por Sección del Proyecto
          </Typography>
          
          {/* Formulario para agregar nueva sección */}
          <Paper elevation={0} sx={{ p: 2, bgcolor: "grey.50", borderRadius: 2, mb: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={5}>
                <TextField
                  fullWidth
                  size="small"
                  label="Nombre de la sección"
                  placeholder="Ej: Mano de obra"
                  value={newSection.name}
                  onChange={(e) => setNewSection(prev => ({ ...prev, name: e.target.value }))}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  label="Meta en colones"
                  placeholder="Ej: 50000"
                  value={newSection.goal}
                  onChange={(e) => setNewSection(prev => ({ ...prev, goal: e.target.value }))}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">₡</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleAddSection}
                  disabled={!newSection.name.trim() || !newSection.goal || parseFloat(newSection.goal) <= 0}
                  startIcon={<AddIcon />}
                  sx={{ height: 40 }}
                >
                  Agregar
                </Button>
              </Grid>
            </Grid>
          </Paper>

          {/* Lista de secciones */}
          {formData.project_sections && formData.project_sections.length > 0 ? (
            <Box>
              <Grid container spacing={1}>
                {formData.project_sections.map((section, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 1.5,
                        border: 1,
                        borderColor: "divider",
                        borderRadius: 1,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {section.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          ₡{parseFloat(section.goal).toLocaleString()}
                        </Typography>
                      </Box>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleRemoveSection(index)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
              {/* Total */}
              <Box sx={{ 
                mt: 2, 
                p: 1.5, 
                borderRadius: 1, 
                bgcolor: "rgba(42, 157, 143, 0.1)", 
                border: 1, 
                borderColor: "rgba(42, 157, 143, 0.3)",
                display: "flex",
                justifyContent: "space-between"
              }}>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  Total Secciones:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, color: "#008b19ff" }}>
                  ₡{formData.project_sections.reduce((sum, s) => sum + (parseFloat(s.goal) || 0), 0).toLocaleString()}
                </Typography>
              </Box>
            </Box>
          ) : (
            <Box sx={{ 
              p: 3, 
              borderRadius: 2, 
              border: "2px dashed rgba(0,0,0,0.1)", 
              textAlign: "center"
            }}>
              <Typography variant="body2" color="text.secondary">
                No hay secciones agregadas. Usa el formulario de arriba para agregar metas por sección.
              </Typography>
            </Box>
          )}
        </Box>

        {/* ============================================================ */}
        {/* ARCHIVOS ADJUNTOS (PDF) */}
        {/* ============================================================ */}
        <Box sx={{ mb: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: "primary.main", display: "flex", alignItems: "center", gap: 1 }}>
            📎 Documentos Adjuntos (PDF)
          </Typography>

          {/* Lista de PDFs existentes */}
          {formData.pdf_documents && formData.pdf_documents.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Archivos actuales:
              </Typography>
              {formData.pdf_documents.map((doc, index) => (
                <Paper
                  key={index}
                  elevation={0}
                  sx={{
                    p: 2,
                    mb: 1,
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 1,
                  }}
                >
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={3}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <AttachFileIcon color="primary" fontSize="small" />
                        <Link 
                          href={doc.url} 
                          target="_blank" 
                          rel="noopener" 
                          sx={{ 
                            fontSize: "0.875rem", 
                            fontWeight: 600,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            maxWidth: "150px",
                            display: "block"
                          }}
                        >
                          {doc.name}
                        </Link>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={7}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Descripción"
                        value={doc.description || ""}
                        onChange={(e) => handlePdfDescriptionChange(index, e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Button
                        fullWidth
                        size="small"
                        color="error"
                        variant="outlined"
                        onClick={() => handleRemovePdf(index)}
                        startIcon={<DeleteIcon />}
                      >
                        Eliminar
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              ))}
            </Box>
          )}

          {/* Subir nuevos archivos */}
          <Paper elevation={0} sx={{ p: 2, bgcolor: "grey.50", borderRadius: 2 }}>
            <Typography variant="body2" sx={{ mb: 2, fontWeight: 600 }}>
              Subir nuevos archivos:
            </Typography>
            
            <input
              type="file"
              accept="application/pdf"
              multiple
              onChange={handleFileSelect}
              ref={fileInputRef}
              style={{ display: "none" }}
              id="pdf-upload-input"
            />
            <label htmlFor="pdf-upload-input">
              <Button
                component="span"
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                sx={{ mb: 2 }}
              >
                Seleccionar archivos PDF
              </Button>
            </label>

            {/* Lista de archivos pendientes */}
            {newPdfFiles.length > 0 && (
              <Box sx={{ mt: 2 }}>
                {newPdfFiles.map((item, index) => (
                  <Paper
                    key={index}
                    elevation={0}
                    sx={{
                      p: 2,
                      mb: 1,
                      border: 1,
                      borderColor: "warning.light",
                      borderRadius: 1,
                      bgcolor: "rgba(255, 193, 7, 0.05)"
                    }}
                  >
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} sm={3}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: "warning.dark" }}>
                          {item.file.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          (Pendiente de subir)
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={7}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Descripción (obligatoria)"
                          value={item.description}
                          onChange={(e) => handleNewPdfDescriptionChange(index, e.target.value)}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={2}>
                        <Button
                          fullWidth
                          size="small"
                          color="error"
                          variant="outlined"
                          onClick={() => handleRemoveNewPdf(index)}
                        >
                          Quitar
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                ))}
                
                <Button
                  variant="contained"
                  color="warning"
                  onClick={handleUploadNewPdfs}
                  disabled={uploadingPdf || newPdfFiles.some(f => !f.description.trim())}
                  startIcon={uploadingPdf ? <CircularProgress size={20} color="inherit" /> : <CloudUploadIcon />}
                  sx={{ mt: 1 }}
                >
                  {uploadingPdf ? "Subiendo..." : `Subir ${newPdfFiles.length} archivo(s)`}
                </Button>
              </Box>
            )}

            {/* Estado vacío */}
            {(!formData.pdf_documents || formData.pdf_documents.length === 0) && newPdfFiles.length === 0 && (
              <Box sx={{ 
                p: 2, 
                borderRadius: 1, 
                border: "2px dashed rgba(0,0,0,0.1)", 
                textAlign: "center"
              }}>
                <Typography variant="body2" color="text.secondary">
                  No hay documentos adjuntos. Usa el botón de arriba para agregar archivos PDF.
                </Typography>
              </Box>
            )}
          </Paper>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button onClick={onClose} variant="outlined" disabled={saving}>
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          startIcon={saving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
          disabled={saving}
        >
          {saving ? "Guardando..." : "Guardar Cambios"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
