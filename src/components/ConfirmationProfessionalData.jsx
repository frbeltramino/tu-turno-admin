import { Box, Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from "react-i18next";

export const ConfirmationProfessionalData = ( { formData, daysOfWeek }) => {
  const { t } = useTranslation();
  return (
    <Box>
      <Typography variant="subtitle1"><strong>{t("i18n.professionals.013")}:</strong> {formData.nombre}</Typography>
      <Typography variant="subtitle1"><strong>{t("i18n.professionals.014")}:</strong> {formData.apellido}</Typography>
      <Typography variant="subtitle1"><strong>{t("i18n.professionals.015")}:</strong> {formData.email}</Typography>
      <Typography variant="subtitle1"><strong>{t("i18n.professionals.016")}:</strong> {formData.telefono}</Typography>

      <Typography variant="h6" sx={{ mt: 2 }}>{t("i18n.professionals.011")}</Typography>
      {formData.horarios.map((h, index) => (
        <Box key={index} sx={{ mb: 1, p: 1, border: "1px solid #ddd", borderRadius: 2 }}>
          <Typography variant="subtitle2">
            {daysOfWeek.find(d => d.dayIndex == h.dia.dayIndex)?.label}
          </Typography>
          <Typography variant="body2">{t("i18n.professionals.050")}: {h.manana.inicio} - {h.manana.fin}</Typography>
          <Typography variant="body2">{t("i18n.professionals.053")}: {h.tarde.inicio} - {h.tarde.fin}</Typography>
        </Box>
      ))}
    </Box>
  )
}
