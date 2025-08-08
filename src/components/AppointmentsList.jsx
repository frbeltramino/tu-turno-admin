import { CheckCircle, Delete, Info as InfoIcon } from '@mui/icons-material'
import { Box, Card, CardContent, Grid, IconButton, Tooltip, Typography, CircularProgress, Modal, Button } from '@mui/material'
import { formatAmount, formatDate } from '../utils';
import React, { useState } from 'react'

const getAppointmentStatus = (appointment) => {
  if (!appointment.is_confirmed) return 'Pendiente';
  if (appointment.is_cancelled) return 'Cancelado';
  if (appointment.is_completed) return 'Completado';
  if (appointment.is_confirmed) return 'Aceptado';
  return 'Desconocido';
};

const DepositInfo = ({ deposit, paid, price }) => (
  <Box display="flex" flexDirection="column" gap={0.5}>
    <Typography variant="caption" color="text.secondary">
      Total a pagar: {formatAmount(price)}
    </Typography>
    <Typography variant="caption" color="text.secondary">
      Requiere depósito: {formatAmount(deposit)}
    </Typography>
    <Typography variant="caption" color="text.secondary">
      Depositado: {formatAmount(paid)}
    </Typography>
    <Typography variant="caption" color="text.secondary">
      Falta pagar: {formatAmount(price - paid)}
    </Typography>
  </Box>
);

export const AppointmentsList = ({
  appointments,
  handleComplete,
  handleCancel,
  loadingAppointments,
  handleConfirm
}) => {
  const [openDepositModal, setOpenDepositModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleOpenDepositModal = (appointment) => {
    setSelectedAppointment(appointment);
    setOpenDepositModal(true);
  };

  const handleCloseDepositModal = () => {
    setOpenDepositModal(false);
    setSelectedAppointment(null);
  };

  if (loadingAppointments) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (appointments.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px" width="100%" textAlign="center">
        <Typography variant="h4">No hay turnos para mostrar</Typography>
      </Box>
    );
  }

  return (
    <Grid container direction="column" alignItems="center" spacing={2} mt={2} width="100%">
      {appointments.map((appointment) => (
        <Grid item key={appointment.id || appointment._id || appointment.date} sx={{ width: '100%', maxWidth: 600 }}>
          <Card
            elevation={3}
            sx={{
              backgroundColor: appointment.is_cancelled
                ? 'cardRed.main'
                : appointment.is_completed
                  ? 'cardGreen.main'
                  : 'white'
            }}
          >
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="h6">{appointment.service_name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Día: {appointment.day + " " + formatDate(appointment.date)} - Hora: {appointment.start_hour}
                  </Typography>

                  <Box mt={1}>
                    <Typography variant="body1">Profesional: {appointment.professional_name}</Typography>
                    <Typography variant="body1">Cliente: {appointment.client_name}</Typography>
                    <Typography variant="body2">Tel: {appointment.client_phone}</Typography>
                    <Typography variant="body2">Email: {appointment.client_email}</Typography>
                    <Typography variant="body2">Precio: {formatAmount(appointment.price)}</Typography>

                    <Typography
                      variant="caption"
                      fontWeight="bold"
                      color={
                        getAppointmentStatus(appointment) === 'Pendiente' ? 'warning.main' :
                        getAppointmentStatus(appointment) === 'Aceptado' ? 'primary.main' :
                        getAppointmentStatus(appointment) === 'Completado' ? 'success.main' :
                        getAppointmentStatus(appointment) === 'Cancelado' ? 'error.main' :
                        'text.secondary'
                      }
                    >
                      Estado: {getAppointmentStatus(appointment)}
                    </Typography>

                    {getAppointmentStatus(appointment) === 'Pendiente' || getAppointmentStatus(appointment) === 'Aceptado' && (
                      <Tooltip title="Ver info de depósito">
                      <IconButton color="warning" onClick={() => handleOpenDepositModal(appointment)}>
                          <InfoIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                </Box>

                <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
                  {
                    !appointment.is_confirmed &&
                    <Tooltip title="Confirmar turno">
                    <IconButton color="primary" onClick={() => handleConfirm(appointment)}>
                      <CheckCircle />
                    </IconButton>
                  </Tooltip>
                  }
                { appointment.is_confirmed &&
                  <Tooltip title="Completar turno">
                    <IconButton color="success" onClick={() => handleComplete(appointment)}>
                      <CheckCircle />
                    </IconButton>
                  </Tooltip>
                }
                  <Tooltip title="Cancelar turno">
                    <IconButton color="error" onClick={() => handleCancel(appointment)}>
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
             
            </CardContent>
          </Card>
        </Grid>
      ))}

      

      <Modal
      open={openDepositModal}
      onClose={handleCloseDepositModal}
      aria-labelledby="deposit-modal-title"
      aria-describedby="deposit-modal-description"
    >
      <Box className="modalStyle">
        <Typography id="deposit-modal-title" variant="h6" mb={2}>
          Información de Depósito
        </Typography>
        
        {selectedAppointment && (
          <DepositInfo
            deposit={selectedAppointment.deposit_amount}
            paid={selectedAppointment.deposit_paid_amount}
            price={selectedAppointment.price}
          />
        )}

        <Box mt={3} textAlign="right">
          <Button onClick={handleCloseDepositModal} variant="contained">
            Cerrar
          </Button>
        </Box>
      </Box>
    </Modal>
    </Grid>
  );
};