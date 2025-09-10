import React from 'react';
import { useTranslation } from "react-i18next";
import { Box, Button, Typography } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

export const SuccessScreen = ({ title, data, onClose }) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        px: 2, // padding horizontal en mobile
      }}
    >
      {/* Contenedor principal */}
      <Box
        sx={{
          width: "100%",
          textAlign: "center",
          p: { xs: 2, sm: 3 }, // padding responsive
       
        }}
      >
        {/* Ícono de éxito */}
        <CheckCircle color="success" sx={{ fontSize: { xs: 70, sm: 90 }, mb: 2 }} />

        {/* Título */}
        <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", fontSize: { xs: "1.2rem", sm: "1.5rem" } }}>
          {title}
        </Typography>

        {/* Información alineada a la izquierda */}
        <Box sx={{ textAlign: "left", mt: 3 }}>
          {data.map((d, index) => (
            <Typography key={index} variant="body1" sx={{ mb: 1, fontSize: { xs: "0.85rem", sm: "1rem" } }}>
              <strong>{d.label}:</strong> {d.value}
            </Typography>
          ))}
        </Box>

        {/* Botón */}
        <Button
          variant="contained"
          fullWidth
          onClick={onClose}
          sx={{ mt: 3, py: { xs: 1.5, sm: 2 } }}
        >
          {t("i18n.common.001")}
        </Button>
      </Box>
    </Box>
  );
};