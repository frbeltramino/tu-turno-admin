import React from 'react'
import { data } from 'react-router-dom'
import { useTranslation } from "react-i18next";
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

export const SuccessScreen = ( { title, data, onClose } ) => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh"
      }}
    >
     
      <Card sx={{ maxWidth: 500, width: "100%", textAlign: "center", p: 3 }}>
        <CardContent>
          {/* Ícono de éxito */}
          <CheckCircle color="success" sx={{ fontSize: 90, mb: 2 }} />

          {/* Título */}
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
            {title}
          </Typography>

          {/* Info alineada a la izquierda */}
          <Box sx={{ textAlign: "left", mt: 3 }}>
            {
              data.map((d, index) => (
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>{d.label}:</strong> {d.value}
                </Typography>
              ))
            }
  
          </Box>
          {/* Botón */}
          <Button variant="contained" fullWidth onClick={onClose} sx={{ mt: 3 }}>
            {t("i18n.common.001")}
          </Button>
        </CardContent>
      </Card>
    </Box>
  )
}
