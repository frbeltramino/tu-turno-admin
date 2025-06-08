import React, { useContext, useEffect, useState } from 'react'
import { Box, Grid, IconButton, Tooltip, Typography, TextField, InputAdornment, MenuItem, Select, FormControl, InputLabel, Modal, Button, OutlinedInput } from '@mui/material'
import { CheckCircle, Delete, MailOutline, Search } from '@mui/icons-material'
import { AdminTurnoLayout } from '../layout/AdminTurnoLayout'
import { useAppointment } from '../../hooks/useAppointment'
import { AppointmentsContext } from '../../context/AppointmentsContext'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AppointmentsList, DateSelector } from '../../components';
import dayjs from 'dayjs'
import { formatDate } from '../../utils'
import '../../styles.css'


export const AdminTurnoPage = () => {

  const { getAppointmentsFromToday, getDates, getAppointmentsByDate, cancelAppointment, completeAppointment } = useAppointment();
  const { appointments, appointmentLoading, selectedAppointment, setSelectedAppointment } = useContext(AppointmentsContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [searchAppointmentLoading, setSearchAppointmentLoading] = useState(appointmentLoading);
  const [openModal, setOpenModal] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);

  useEffect(() => {
    getDates();
  }, []);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleConfirm = (appointment) => {
    setIsConfirm(true);
    setSelectedAppointment(appointment);
    setOpenModal(true);
  };

  const handleCancel = (appointment) => {
    setIsConfirm(false);
    setSelectedAppointment(appointment);
    setOpenModal(true);
  };


  const handleCallCancelAppointment = () => {
    cancelAppointment(selectedAppointment);
    setOpenModal(false);
  };

  const handleCallCompleteAppointment = () => {
    completeAppointment(selectedAppointment);
    setOpenModal(false);
  };

 
  const getStatusFromAppointment = (appointment) => {
    if (appointment.is_cancelled) return 'cancelled';
    if (appointment.is_completed) return 'confirmed';
    return 'pending';
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch = [appointment.client_name, appointment.professional_name]
      .some(field => field.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesDate = () => {};

    const status = getStatusFromAppointment(appointment);
    const matchesStatus = statusFilter === 'all' || status === statusFilter;
    
    return matchesSearch && matchesDate && matchesStatus;

  });


  return (
    <AdminTurnoLayout>
      <Box mb={3}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4">Gestión de Turnos</Typography>
          <Tooltip title={showFilters ? "Ocultar filtros" : "Mostrar filtros"}>
            <IconButton onClick={() => setShowFilters(prev => !prev)}>
              <Search />
            </IconButton>
          </Tooltip>
        </Box>

        {showFilters && (
          <Grid container spacing={2} mb={3}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Buscar cliente o profesional"
                variant="outlined"
                fullWidth
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Estado</InputLabel>
                <Select
                  value={statusFilter}
                  label="Estado"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="all">Todos</MenuItem>
                  <MenuItem value="pending">Pendiente</MenuItem>
                  <MenuItem value="confirmed">Confirmado</MenuItem>
                  <MenuItem value="cancelled">Cancelado</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        )}
          <Box
            sx={{
                  // ocupa toda la altura visible
                display: 'flex',
                flexDirection: 'column',   // apila los hijos verticalmente
                justifyContent: 'center',  // centra verticalmente
                alignItems: 'center'     // centra horizontalmente
                          
              }}
          >
          <DateSelector />
          <AppointmentsList appointments={appointments} handleConfirm={handleConfirm} handleCancel={handleCancel} loadingAppointments={appointmentLoading} />
        </Box>
      </Box>
      
    
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modalStyle">
        <Box display="flex" alignItems="center" gap={1}>
          {isConfirm ? (
            <>
              <CheckCircle color="success" />
              <Typography variant="h6">Confirmación de turno</Typography>
            </>
          ) : (
            <>
              <Delete color="error" />
              <Typography variant="h6">Cancelación de turno</Typography>
            </>
          )}
        </Box>
          <Typography variant="h6" sx={{ mt: 2 }}>{selectedAppointment.service_name}</Typography>
          <Typography variant="body1"  sx={{ mt: 2 }}>Profesional: {selectedAppointment.professional_name}</Typography>
          <Typography id="modal-modal-description">
            Día: {selectedAppointment.day + " " + formatDate(selectedAppointment.date)}
            <br />
            Hora: {selectedAppointment.start_hour}
          </Typography>
 
          <Box mt={1}>
            <Typography variant="body1">Cliente: {selectedAppointment.client_name}</Typography>
            <Typography variant="body2">Tel: {selectedAppointment.client_phone}</Typography>
            <Typography variant="body2">Email: {selectedAppointment.client_email}</Typography>
          </Box>
          {isConfirm && (
             <Box mt={2}>
             <FormControl fullWidth>
               <InputLabel htmlFor="outlined-adornment-amount">Monto</InputLabel>
               <OutlinedInput
                 id="outlined-adornment-amount"
                 startAdornment={<InputAdornment position="start">$</InputAdornment>}
                 label="Amount"
                 size="small"
               />
             </FormControl>
           </Box>
           )}
          <Box direction="row" display="flex" justifyContent="flex-end" gap={2} sx={{ mt: 2 }}>
            <Button
              variant="contained"
              onClick={handleClose}
              sx={{ backgroundColor: 'grey.500', '&:hover': { backgroundColor: 'grey.700' } }}
            >
              Cerrar
            </Button>
            {isConfirm ? (
              <Button
                variant="contained"
                onClick={() => handleCallCompleteAppointment(selectedAppointment)}
                sx={{ backgroundColor: 'success.main', '&:hover': { backgroundColor: 'success.dark' } }}
              >
                Confirmar
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={() => handleCancelAppointment(selectedAppointment)}
                sx={{ backgroundColor: 'error.main', '&:hover': { backgroundColor: 'error.dark' } }}
              >
                Cancelar turno
              </Button>
            )}
          </Box>
        </Box>
      </Modal>

    
    </AdminTurnoLayout>
  );
}
