import { CheckCircle, Delete } from '@mui/icons-material'
import { Box, Card, CardContent, Grid, IconButton, Tooltip, Typography, CircularProgress } from '@mui/material'
import { formatDate } from '../utils';
import React from 'react'


export const AppointmentsList = ({ appointments, handleConfirm, handleCancel, loadingAppointments }) => {
  return (
    <>
      
      {loadingAppointments ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      ) : appointments.length === 0 ? 
        <Box  display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
        width="100%"
        textAlign="center">
           <Typography variant="h4">No hay turnos para mostrar</Typography> 
        </Box>
     
      : 
      (
        <Grid container direction="column" alignItems="center" spacing={2} mt={2}>
          {appointments.map((appointment, index) => (
            <Grid item key={index} sx={{ width: '100%', maxWidth: 600 }}>
              <Card 
                elevation={3}
                sx={ { backgroundColor: appointment.is_cancelled ? 'cardRed.main' : appointment.is_completed ? 'cardGreen.main' : 'white' } } 
                >
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="h6">{appointment.service_name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        Día: {appointment.day + " " +  formatDate(appointment.date)} - Hora: {appointment.start_hour}
                      </Typography>

                      <Box mt={1}>
                        <Typography variant="body1">Profesional: {appointment.professional_name}</Typography>
                        <Typography variant="body1">Cliente: {appointment.client_name}</Typography>
                        <Typography variant="body2">Tel: {appointment.client_phone}</Typography>
                        <Typography variant="body2">Email: {appointment.client_email}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Estado: {appointment.is_cancelled ? 'Cancelado' : appointment.is_completed ? 'Confirmado' : 'Pendiente'}
                        </Typography>
                      </Box>
                    </Box>

                    <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
                      <Tooltip title="Confirmar turno">
                        <IconButton color="success" onClick={() => handleConfirm(appointment)}>
                          <CheckCircle />
                        </IconButton>
                      </Tooltip>

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
        </Grid>
      )}
    </>
  );
};