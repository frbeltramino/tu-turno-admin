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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { formatDate } from '../utils/commonUtilities';

export const ProfessionalCard = ({ professional }) => {
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  return (
    <>
      <Card sx={{ maxWidth: 400, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {professional.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            {professional.description}
          </Typography>

          <Typography variant="subtitle2">📞 Teléfono:</Typography>
          <Typography variant="body2">{professional.phone}</Typography>

          <Typography variant="subtitle2">📧 Email:</Typography>
          <Typography variant="body2" gutterBottom>
            {professional.email}
          </Typography>

          <Button variant="outlined" size="small" onClick={handleOpenModal}>
            Ver más información
          </Button>
        </CardContent>
      </Card>

      {/* Modal con información adicional */}
      <Dialog open={open} onClose={handleCloseModal} fullWidth maxWidth="sm">
        <DialogTitle>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h6">
              {professional.name} — Información adicional
            </Typography>
            <IconButton aria-label="close" onClick={handleCloseModal}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent dividers>
          <Typography variant="subtitle2">🏦 Cuenta Bancaria:</Typography>
          <Typography variant="body2">CBU: {professional.bank_account_cbu}</Typography>
          <Typography variant="body2">Alias: {professional.bank_account_alias}</Typography>
          <Typography variant="body2" gutterBottom>
            Titular: {professional.bank_account_titular}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle2">🗓️ Días laborales:</Typography>
          <List dense>
            {professional.working_days.map((day) => (
              <ListItem key={day.day} disableGutters>
                <ListItemText
                  primary={`${day.day}: ${day.working_hours.am.start}–${day.working_hours.am.end}, ${day.working_hours.pm.start}–${day.working_hours.pm.end}`}
                />
              </ListItem>
            ))}
          </List>

          <Typography variant="subtitle2">🚫 No trabaja los días:</Typography>
          <List dense>
            {professional.holidays.map((date) => (
              <ListItem key={date} disableGutters>
                <ListItemText primary={formatDate(date)} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
};