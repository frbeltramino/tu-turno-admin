import React, { useEffect, useState } from 'react'
import { AdminTurnoLayout } from '../layout/AdminTurnoLayout'
import { ProfessionalCard } from '../../components/ProfessionalCard';
import { Box, Button, CircularProgress, Grid, IconButton, Modal, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useServicesAndProfessionals } from '../../hooks/useServicesAndProfessionals';
import { ProfessionalRegistrationForm } from '../../components/ProfessionalForm';
import CloseIcon from '@mui/icons-material/Close';


export const ProfessionalsPage = () => {
  const { professionals, getProfessionals, getProfessionalsLoading } = useServicesAndProfessionals();
  const { t } = useTranslation();

  useEffect(() => {
    getProfessionals();
  }, []);

  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <>
      <AdminTurnoLayout>

        {
          getProfessionalsLoading ?
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
              <CircularProgress />
            </Box>
            :
            <>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4">{t('i18n.professionals.001')}</Typography>
                <Button onClick={handleOpenModal}>{t('i18n.auth.013')}</Button>
              </Box>

              <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center">
                <Grid container direction="column" alignItems="center" spacing={2} mt={2}>
                  {professionals.map((pro, index) => (
                    <Grid item xs={12} key={index} sx={{ width: '100%', maxWidth: 600 }}>
                      <Box display="flex" justifyContent="center" alignItems="center" mb={3} >
                        <ProfessionalCard professional={pro} />
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </>
        }


      </AdminTurnoLayout>

      <Modal open={open} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "95%", sm: "80%", md: "70%", lg: "60%" },
            maxHeight: "90vh",
            bgcolor: "background.paper",
            borderRadius: 3,
            boxShadow: 24,
            p: 4,
            overflowY: "auto"
          }}
        >
          {/* Botón de cierre arriba a la derecha */}
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Contenido del modal */}
          <ProfessionalRegistrationForm onClose={handleCloseModal} />
        </Box>
      </Modal>

    </>
  );
};

