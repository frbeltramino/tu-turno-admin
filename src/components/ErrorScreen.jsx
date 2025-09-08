import React from 'react';
import { useTranslation } from "react-i18next";
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';



export const ErrorScreen = ({ title, message, onClose }) => {
   const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        
      }}
    >
      <Card sx={{ maxWidth: 500, width: "100%", textAlign: "center", p: 3 }}>
        <CardContent>
          {/* Icono de error */}
          <ErrorOutline color="error" sx={{ fontSize: 90, mb: 2 }} />

          {/* Título */}
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
            {title || t("i18n.common.006")}
          </Typography>

          {/* Mensaje adicional */}
          {message && (
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Typography variant="body1">{message || t("i18n.common.error_message")}</Typography>
            </Box>
          )}
          <Button variant="contained" fullWidth onClick={onClose} sx={{ mt: 3 }}>
            {t("i18n.common.001")}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};