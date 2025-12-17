import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Alert
} from "@mui/material";

import PdfUploader from "./PdfUploader";
import SingleImageUploader from "../../components/NewCampaign/SingleImageUploader";

export default function AddCampaignStep3({ data, update, next, back }) {
  const [local, setLocal] = useState({
    coverImage: data.coverImage || null,
    pdf_documents: data.pdf_documents || [],
    gallery: data.gallery || [],
    videoUrl: data.videoUrl || ""
  });

  const [errors, setErrors] = useState({});

  const validateVideoUrl = (url) => {
    if (!url.trim()) return null;
    const youtubeRegex = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    return youtubeRegex.test(url) ? null : "URL de YouTube inválida";
  };

  const handleNext = () => {
    const videoError = validateVideoUrl(local.videoUrl);
    if (videoError) {
      setErrors({ videoUrl: videoError });
      return;
    }

    // Debug: Ver qué se está enviando al padre
    console.log("📷 Step3 - local.coverImage antes de update:", local.coverImage);
    console.log("📷 Step3 - local completo:", local);
    
    update(local);
    next();
  };

  return (
    <Card variant="outlined" sx={{ p: 3 }}>
      <CardContent>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Multimedia
        </Typography>

        <Box display="flex" flexDirection="column" gap={3} mt={2}>

          {/* IMAGEN PRINCIPAL */}
          <SingleImageUploader
            uploadedImage={local.coverImage}
            onUploaded={(img) => {
              console.log("📷 SingleImageUploader onUploaded:", img);
              setLocal(prev => ({ ...prev, coverImage: img }));
            }}
            onUpdateUploaded={(img) => {
              console.log("📷 SingleImageUploader onUpdateUploaded:", img);
              setLocal(prev => ({ ...prev, coverImage: img }));
            }}
          />

          {/* PDFs */}
          <PdfUploader
            uploadedFiles={local.pdf_documents}
            onUploaded={(list) =>
              setLocal(prev => ({ ...prev, pdf_documents: list }))
            }
            onUpdateUploaded={(list) =>
              setLocal(prev => ({ ...prev, pdf_documents: list }))
            }
          />

          {/* VIDEO */}
          <Box>
            <Typography fontWeight={600} mb={1}>
              Video del proyecto (opcional)
            </Typography>

            <TextField
              fullWidth
              placeholder="https://www.youtube.com/watch?v=..."
              value={local.videoUrl}
              onChange={(e) =>
                setLocal(prev => ({ ...prev, videoUrl: e.target.value }))
              }
              error={!!errors.videoUrl}
              helperText={errors.videoUrl}
            />
          </Box>

          {errors.videoUrl && (
            <Alert severity="error">{errors.videoUrl}</Alert>
          )}

          {/* BOTONES */}
          <Box display="flex" justifyContent="space-between">
            <Button variant="outlined" onClick={back}>
              Volver
            </Button>

            <Button variant="contained" onClick={handleNext}>
              Siguiente
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
