import React, { useState, useEffect, useContext } from 'react';
import { Box, Button, Card, CardActionArea, CardContent, Grid, IconButton, Typography } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { AppointmentsContext } from "../context/AppointmentsContext";
import { formatDate, getI18nDay } from '../utils';
import { useAppointment } from '../hooks/useAppointment';
import { CardDate } from './CardDate';
import { useTranslation } from 'react-i18next';

export const DateSelector = () => {
  const {
    dates
  } = useContext(AppointmentsContext);

  const { getAppointmentsByDate } = useAppointment();

  const [currentPage, setCurrentPage] = useState(0);
  const [datesPerPage, setDatesPerPage] = useState(5);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    setCurrentPage(0);
    const updateDatesPerPage = () => {
      if (window.innerWidth < 576) {
        setDatesPerPage(3);
      } else if (window.innerWidth < 768) {
        setDatesPerPage(5);
      } else {
        setDatesPerPage(7);
      }
    };

    updateDatesPerPage();
    window.addEventListener("resize", updateDatesPerPage);
    return () => window.removeEventListener("resize", updateDatesPerPage);
  }, [datesPerPage]);

  useEffect(() => {
    if (dates.length > 0) {
      const today = new Date().toISOString().split('T')[0]; // formato YYYY-MM-DD
      const todayDate = dates.find((d) => d.date === today);

      if (todayDate) {
        setSelectedDate(todayDate);
        getAppointmentsByDate(todayDate.date);
      }
    }
  }, [dates]);

  const startIndex = currentPage * datesPerPage;
  const currentDates = dates.slice(startIndex, startIndex + datesPerPage);
  const totalPages = Math.ceil(dates.length / datesPerPage);

  const handleOnSelectDate = (date) => {
    setSelectedDate(date);
    getAppointmentsByDate(date.date);
  };

  const { t } = useTranslation();

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      spacing={2}
      textAlign="center"
      sx={{ width: '100%', maxWidth: 600 }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
        sx={{ mt: 2 }}
        width="100%"
      >

      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
          py: 1,
          flexWrap: 'nowrap',
        }}
      >
          <IconButton
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            disabled={currentPage === 0}
            color={currentPage === 0 ? 'inherit' : 'primary'}
          >
            <ChevronLeft />
          </IconButton>

          {currentDates.map((date, index) => (
            <CardDate index={index} date={date} handleOnSelectDate={handleOnSelectDate} selectedDate={selectedDate} />


          ))}

          <IconButton
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
            disabled={currentPage >= totalPages - 1}
            color={currentPage >= totalPages - 1 ? 'inherit' : 'primary'}
          >
            <ChevronRight />
          </IconButton>
        </Box>

        <Typography variant="h5" sx={{ mt: 2 }}>
          {selectedDate ? getI18nDay(selectedDate.date)  + " " + formatDate(selectedDate.date) : t('i18n.common.005')}
        </Typography>

      </Box>
    </Grid>
  );
};
