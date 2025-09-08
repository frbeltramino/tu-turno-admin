import React, { useContext, useEffect, useState } from 'react'
import { Box, Grid, IconButton, Tooltip, Typography, TextField, InputAdornment, MenuItem, Select, FormControl, InputLabel } from '@mui/material'
import { CheckCircle, Delete, MailOutline, Search } from '@mui/icons-material'
import { AdminTurnoLayout } from '../layout/AdminTurnoLayout'
import { useAppointment } from '../../hooks/useAppointment'
import { AppointmentsContext } from '../../context/AppointmentsContext'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AppointmentsList } from '../../components';
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next';

export const AdminHistoricoTurnosPage = () => {

  const { getAppointmentsHistory } = useAppointment();
  const { historyAppointments, historyAppointementLoading } = useContext(AppointmentsContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [searchAppointmentLoading, setSearchAppointmentLoading] = useState(historyAppointementLoading);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    getAppointmentsHistory();
  }, []);

  const handleConfirm = (appointmentId) => {
    // lógica para confirmar el turno
  };

  const handleCancel = (appointmentId) => {
    // lógica para cancelar el turno
  };

  const getStatusFromAppointment = (appointment) => {
    if (appointment.is_cancelled) return 'cancelled';
    if (appointment.is_completed) return 'confirmed';
    return 'pending';
  };

  const filteredAppointments = historyAppointments.filter((appointment) => {
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
          <Typography variant="h4">{t('i18n.titles.001')}</Typography>
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
              <DatePicker
                label={ t('i18n.appointments.004') }
                value={selectedDate}
                onChange={(newDate) => setSelectedDate(newDate)}
                slotProps={{ textField: { size: 'small', fullWidth: true } }}
                format={i18n.language === "es" ? "DD/MM/YYYY" : "MM/DD/YYYY"} 
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>{t("i18n.appointments.005")}</InputLabel>
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
      </Box>
      <AppointmentsList appointments={filteredAppointments} handleConfirm={handleConfirm} handleCancel={handleCancel} loadingAppointments={historyAppointementLoading} />
    </AdminTurnoLayout>
  );
}
