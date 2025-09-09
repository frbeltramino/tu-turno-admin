import React, { useContext, useEffect, useState } from 'react'
import { Box, Grid, IconButton, Tooltip, Typography, TextField, InputAdornment, MenuItem, Select, FormControl, InputLabel, Modal, Button, OutlinedInput } from '@mui/material'
import { CheckCircle, Delete, MailOutline, Search } from '@mui/icons-material'
import { AdminTurnoLayout } from '../layout/AdminTurnoLayout'
import { useAppointment } from '../../hooks/useAppointment'
import { AppointmentsContext } from '../../context/AppointmentsContext'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AppointmentsList, DateSelector } from '../../components';
import dayjs from 'dayjs'
import { formatDate, getI18nDay } from '../../utils'
import '../../styles.css'
import { useTranslation } from 'react-i18next';


export const AdminTurnoPage = () => {

  const { getAppointmentsFromToday, getDates, getAppointmentsByDate, cancelAppointment, completeAppointment, acceptAppointment
   } = useAppointment();
  const { appointments, appointmentLoading, selectedAppointment, setSelectedAppointment } = useContext(AppointmentsContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [searchAppointmentLoading, setSearchAppointmentLoading] = useState(appointmentLoading);
  const [openModal, setOpenModal] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [modalMode, setModalMode] = useState('confirm');
  const [amount, setAmount] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    getDates();
  }, []);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleComplete = (appointment) => {
    setModalMode('complete');
    setSelectedAppointment(appointment);
    setOpenModal(true);
  };

  const handleConfirm = (appointment) => {
    setModalMode('confirm');
    setSelectedAppointment(appointment);
    setOpenModal(true);
  };

  const handleCancel = (appointment) => {
    setModalMode('cancel');
    setSelectedAppointment(appointment);
    setOpenModal(true);
  };


  const handleCallCancelAppointment = (appointment) => {
    cancelAppointment(appointment);
    setOpenModal(false);
  };

  const handleCallCompleteAppointment = (appointment, amount) => {
    completeAppointment(appointment, amount);
    setOpenModal(false);
  };

  const handleCallAcceptAppointment = (appointment, amount) => {
    acceptAppointment(appointment, amount);
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
          <Typography variant="h4">{t('i18n.titles.002')}</Typography>
          <Tooltip title={showFilters ? t('i18n.appointments.002') : t('i18n.appointments.001')}>
            <IconButton onClick={() => setShowFilters(prev => !prev)}>
              <Search />
            </IconButton>
          </Tooltip>
        </Box>

        {showFilters && (
          <Grid container spacing={2} mb={3}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label={ t('i18n.appointments.003') }
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
                <InputLabel>{ t('i18n.appointments.005') }</InputLabel>
                <Select
                  value={statusFilter}
                  label={ t('i18n.appointments.005') }
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="all">{t('i18n.appointments.006')}</MenuItem>
                  <MenuItem value="pending">{t('i18n.appointments.007')}</MenuItem>
                  <MenuItem value="confirmed">{t('i18n.appointments.008')}</MenuItem>
                  <MenuItem value="cancelled">{t('i18n.appointments.009')}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        )}
          <Box
            sx={{
                width: "100%",
                display: 'flex',
                flexDirection: 'column',   // apila los hijos verticalmente
                justifyContent: 'center',  // centra verticalmente
                alignItems: 'center'     // centra horizontalmente
                          
              }}
          >
          <DateSelector />
          <AppointmentsList appointments={appointments} handleConfirm={handleConfirm} handleComplete={handleComplete} handleCancel={handleCancel} loadingAppointments={appointmentLoading} />
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
            {modalMode === 'confirm' && (
              <>
                <CheckCircle color="primary" />
                <Typography variant="h6">{t('i18n.appointments.010')}</Typography>
              </>
            )}
            {modalMode === 'complete' && (
              <>
                <CheckCircle color="success" />
                <Typography variant="h6">{t('i18n.appointments.011')}</Typography>
              </>
            )}
            {modalMode === 'cancel' && (
              <>
                <Delete color="error" />
                <Typography variant="h6">{t('i18n.appointments.012')}</Typography>
              </>
            )}
          </Box>

          <Typography variant="h6" sx={{ mt: 2 }}>{selectedAppointment.service_name}</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>{t('i18n.appointments.013')}: {selectedAppointment.professional_name}</Typography>
          <Typography>
            { t("i18n.appointments.019") }: {getI18nDay(selectedAppointment.date) + " " + formatDate(selectedAppointment.date)}<br />
            { t("i18n.appointments.020") }: {selectedAppointment.start_hour}
          </Typography>

          <Box mt={1}>
            <Typography variant="body1">{t('i18n.appointments.014')}: {selectedAppointment.client_name}</Typography>
            <Typography variant="body2">{t('i18n.appointments.015')}: {selectedAppointment.client_phone}</Typography>
            <Typography variant="body2">{t('i18n.appointments.016')}: {selectedAppointment.client_email}</Typography>
          </Box>

          {modalMode === 'confirm' && selectedAppointment.requires_deposit && (
            <Typography variant="body2" color="textSecondary" mt={2}>
              {t("i18n.appointments.037")}: ${selectedAppointment.deposit_amount}
            </Typography>
          )}

          {(modalMode === 'confirm' || modalMode === 'complete') && (
           <Box mt={2} maxWidth="200px">
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="amount">{t('i18n.appointments.017')}</InputLabel>
              <OutlinedInput
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                label={t('i18n.appointments.017')}
                type="number"
              />
            </FormControl>
          </Box>
          )}

          <Box display="flex" justifyContent="flex-start" gap={2} mt={2}>
            <Button
              variant="contained"
              onClick={handleClose}
              sx={{ backgroundColor: 'grey.500', '&:hover': { backgroundColor: 'grey.700' } }}
            >
              {t('i18n.common.001')}
            </Button>

            {modalMode === 'confirm' && (
              <Button
                variant="contained"
                onClick={() => handleCallAcceptAppointment(selectedAppointment, amount)}
                sx={{ backgroundColor: 'primary.main', '&:hover': { backgroundColor: 'primary.dark' } }}
              >
                {t('i18n.common.002')}
              </Button>
            )}

            {modalMode === 'complete' && (
              <Button
                variant="contained"
                onClick={() => handleCallCompleteAppointment(selectedAppointment, amount)}
                sx={{ backgroundColor: 'success.main', '&:hover': { backgroundColor: 'success.dark' } }}
              >
                {t('i18n.common.003')}
              </Button>
            )}

            {modalMode === 'cancel' && (
              <Button
                variant="contained"
                onClick={() => handleCallCancelAppointment(selectedAppointment)}
                sx={{ backgroundColor: 'error.main', '&:hover': { backgroundColor: 'error.dark' } }}
              >
                {t('i18n.common.004')}
              </Button>
            )}
          </Box>
        </Box>
      </Modal>

    
    </AdminTurnoLayout>
  );
}
