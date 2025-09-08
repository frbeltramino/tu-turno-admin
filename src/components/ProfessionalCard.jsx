import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Box,
  Tooltip,
  DialogActions,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { formatDate, getDayByIndexDay } from '../utils/commonUtilities';
import { useTranslation } from 'react-i18next';
import { Delete } from '@mui/icons-material';
import { useServicesAndProfessionals } from '../hooks/useServicesAndProfessionals';

export const ProfessionalCard = ({ professional }) => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const { deleteProfessional } = useServicesAndProfessionals();
  
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const handleOpenDelete = (professional) => {
    setSelectedProfessional(professional);
    setOpenDelete(true);
  }
  const handleCloseDelete = () => setOpenDelete(false);
  const { t } = useTranslation();

  const handleDeleteProfessional = (professional) => {
    deleteProfessional(selectedProfessional);
    handleCloseDelete();
  };

  return (
    <>
      <Card sx={{ borderRadius: 3, boxShadow: 3, 
      flexShrink: 0, width: "100%" }}>
       <CardContent>
  <Box 
    display="flex" 
    alignItems="flex-start" 
    justifyContent="space-between"
    width="100%"
  >
    {/* Columna izquierda 80% */}
    <Box flex="0 0 90%" pr={2}>
      <Typography gutterBottom variant="h6" component="div">
        {professional.name}
      </Typography>

      <Typography variant="body2" color="text.secondary" paragraph>
        {professional.description}
      </Typography>
      <Box display= "flex" flexDirection="row" justifyContent="flex-start" alignItems="center" mt={1}>
        <Typography variant="subtitle2">📞 {t('i18n.auth.008')}:</Typography>
        <Typography variant="body2">&nbsp;{professional.phone}</Typography>
      </Box>
     
      <Box display= "flex" flexDirection="row" justifyContent="flex-start" alignItems="center">
        <Typography variant="subtitle2">📧 {t('i18n.auth.007')}:</Typography>
        <Typography variant="body2">
          &nbsp;{professional.email}
        </Typography>
      </Box>
      <Box display= "flex" flexDirection="row" justifyContent="flex-start" alignItems="center" mt={1}>
        <Button variant="outlined" size="small" onClick={handleOpenModal}>
          {t('i18n.professionals.009')}
        </Button>
      </Box>
    </Box>

    {/* Columna derecha 20% */}
    <Box 
      flex="0 0 10%" 
      display="flex" 
      justifyContent="flex-end" 
      alignItems="flex-start"
    >
      <Tooltip title={t("i18n.professionals.060")}>
        <IconButton color="error" onClick={() => handleOpenDelete(professional)}>
          <Delete />
        </IconButton>
      </Tooltip>
    </Box>
  </Box>
</CardContent>

      </Card>

      {/* Modal con información adicional */}
      <Dialog open={open} onClose={handleCloseModal} fullWidth maxWidth="sm">
        <DialogTitle>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h6">
              {professional.name} — { t('i18n.professionals.002') }
            </Typography>
            <IconButton aria-label="close" onClick={handleCloseModal}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent dividers>
          <Typography variant="subtitle2">🏦 { t('i18n.professionals.003') }:</Typography>
          <Typography variant="body2">{ t('i18n.professionals.004') }: {professional.bank_account_cbu}</Typography>
          <Typography variant="body2">{ t('i18n.professionals.005') }: {professional.bank_account_alias}</Typography>
          <Typography variant="body2" gutterBottom>
            { t('i18n.professionals.006') }: {professional.bank_account_titular}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle2">🗓️ { t('i18n.professionals.007') }:</Typography>
          <List dense>
            {professional.working_days.map((day) => (
              <ListItem key={day.day} disableGutters>
                <ListItemText
                  primary={`${getDayByIndexDay(day.index_day)}: ${day.working_hours.am.start}–${day.working_hours.am.end}, ${day.working_hours.pm.start}–${day.working_hours.pm.end}`}
                />
              </ListItem>
            ))}
          </List>

          <Typography variant="subtitle2">🚫 { t('i18n.professionals.008') }:</Typography>
          <List dense>
            {professional.holidays.map((date) => (
              <ListItem key={date} disableGutters>
                <ListItemText primary={formatDate(date)} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>

      <Dialog open={openDelete} onClose={handleCloseDelete} fullWidth maxWidth="sm">
        <DialogTitle>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h6">
              { t('i18n.professionals.060') }
            </Typography>
            <IconButton aria-label="close" onClick={handleCloseDelete}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent dividers>
          <Typography variant="subtitle2">{ t('i18n.professionals.061').replace("{profesionalName}", professional.name) }</Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDelete} variant="outlined">
            {t('i18n.common.cancel')}
          </Button>
          <Button onClick={handleDeleteProfessional} variant="contained">
            {t('i18n.common.delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};