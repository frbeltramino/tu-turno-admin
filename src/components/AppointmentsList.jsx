import { CheckCircle, Delete, Info as InfoIcon } from '@mui/icons-material'
import { Box, Card, CardContent, Grid, IconButton, Tooltip, Typography, CircularProgress, Modal, Button } from '@mui/material'
import { formatAmount, formatDate, getI18nDay } from '../utils';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';

const getAppointmentStatus = (appointment) => {
  if (appointment.is_confirmed && !appointment.is_cancelled && !appointment.is_completed) return t('i18n.status.accepted');
  if (appointment.is_cancelled) return t('i18n.status.canceled');
  if (appointment.is_completed) return t('i18n.status.completed');
  return t('i18n.status.pending');
};

const DepositInfo = ({ deposit, paid, price }) => (
  <Box display="flex" flexDirection="column" gap={0.5}>
    <Typography variant="caption" color="text.secondary">
      {t("i18n.appointments.021")}: {formatAmount(price)}
    </Typography>
    <Typography variant="caption" color="text.secondary">
      {t("i18n.appointments.022")}: {formatAmount(deposit)}
    </Typography>
    <Typography variant="caption" color="text.secondary">
      {t("i18n.appointments.023")}: {formatAmount(paid)}
    </Typography>
    <Typography variant="caption" color="text.secondary">
      {t("i18n.appointments.024")}: {formatAmount(price - paid)}
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

  const { t } = useTranslation();

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
        <Typography variant="h4">{t('i18n.appointments.018')}</Typography>
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
                    { t("i18n.appointments.019") }: {getI18nDay(appointment.date)  + " " + formatDate(appointment.date)} - { t("i18n.appointments.020") }: {appointment.start_hour}
                  </Typography>

                  <Box mt={1}>
                    <Typography variant="body1">{ t("i18n.appointments.013") }: {appointment.professional_name}</Typography>
                    <Typography variant="body1">{ t("i18n.appointments.014") }: {appointment.client_name}</Typography>
                    <Typography variant="body2">{ t("i18n.appointments.015") }: {appointment.client_phone}</Typography>
                    <Typography variant="body2">{ t("i18n.appointments.016") }: {appointment.client_email}</Typography>
                    <Typography variant="body2">{ t("i18n.appointments.017") }: {formatAmount(appointment.price)}</Typography>

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
                      {t("i18n.appointments.005")}: {getAppointmentStatus(appointment)}
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
                    <Tooltip title={ t("i18n.common.002") }>
                    <IconButton color="primary" onClick={() => handleConfirm(appointment)}>
                      <CheckCircle />
                    </IconButton>
                  </Tooltip>
                  }
                { appointment.is_confirmed &&
                  <Tooltip title={ t("i18n.common.003") }>
                    <IconButton color="success" onClick={() => handleComplete(appointment)}>
                      <CheckCircle />
                    </IconButton>
                  </Tooltip>
                }
                  <Tooltip title={ t("i18n.common.004") }>
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
          { t("i18n.appointments.025") }
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
            { t("i18n.common.001") }
          </Button>
        </Box>
      </Box>
    </Modal>
    </Grid>
  );
};