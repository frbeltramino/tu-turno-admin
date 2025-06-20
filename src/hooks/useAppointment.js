import { useContext, useState } from "react";
import { AppointmentsContext } from "../context/AppointmentsContext";
import Swal from "sweetalert2";
import tuTurnoApi from "../api/tuTurnoApi";
import { turnConstants } from "../turnConstants";



export const useAppointment = () => {


  const {
    appointment,
    errorAppointment,
    setErrorAppointment,
    appointmentLoading,
    setAppointmentLoading,
    appointments,
    setAppointments,
    historyAppointments,
    setHistoryAppointments,
    setErrorHistoryAppointment,
    setHistoryAppointmentLoading,
    dates,
    setDates
  } = useContext(AppointmentsContext);


  const getAppointmentsHistory = async () => {
    setHistoryAppointmentLoading(true);
    try {
      const response = await tuTurnoApi.get("/appointments");
      const data = response.data;
      setHistoryAppointments(data.turnos);
      setErrorHistoryAppointment("");
      setHistoryAppointmentLoading(false);
    } catch (error) {
      setHistoryAppointmentLoading(false);
      setErrorHistoryAppointment(error.response.data?.message || "Error al obtener turnos");
      Swal.fire('Error al obtener turnos', error.response.data?.message, 'error');
    }
  };

  const getAppointmentsFromToday = async () => {
    setAppointmentLoading(true);
    try {
      const response = await tuTurnoApi.get("/appointments/todayAppointments");
      const data = response.data;
      setAppointments(data.turnos);
      setErrorAppointment("");
      setAppointmentLoading(false);
    } catch (error) {
      setAppointmentLoading(false);
      setErrorAppointment(error.response.data?.message || "Error al obtener turnos");
      Swal.fire('Error al obtener turnos', error.response.data?.message, 'error');
    }
  };

  const getLocalDateString = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getDates = () => {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 30);

    for (let i = 0; i < 30; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const day = turnConstants().turns.spanish_days[date.getDay()];
      const dayNumber = date.getDate();
      const month = date.toLocaleString('default', { month: 'long' });
      const isActive = false;
      const isDisabled = true;
      const id = i + 1;
      const localDate = getLocalDateString(date);
      dates.push({
        date: localDate,
        isActive,
        isDisabled,
        id,
        month,
        day,
        dayNumber
      });
    }

    setDates(dates);
  };

  const getAppointmentsByDate = async (date) => {
    setAppointmentLoading(true);
    try {
      const response = await tuTurnoApi.get(`/appointments/dateAppointments/${date}`);
      const data = response.data;
      setAppointments(data.turnos);
      setErrorAppointment("");
      setAppointmentLoading(false);
    } catch (error) {
      setAppointmentLoading(false);
      setErrorAppointment(error.response.data?.message || "Error al obtener turnos");
      Swal.fire('Error al obtener turnos', error.response.data?.message, 'error');
    }
  };

  const cancelAppointment = async (appointment) => {
    try {
      const response = await tuTurnoApi.put(`/appointments/cancel/${appointment._id}`, {
        is_cancelled: true
      });
      const data = response.data;
      // Actualizar lista local tras cancelación
      getAppointmentsByDate(appointment.date);
      
    } catch (error) {
      console.error("Error al cancelar el turno:", error);
    }
  };

  const completeAppointment = async (appointment) => {
    try {
      const response = await tuTurnoApi.put(`/appointments/complete/${appointment._id}`, {
        is_completed: true
      });
      const data = response.data;
      // Actualizar lista local tras cancelación
      getAppointmentsByDate(appointment.date);
      
    } catch (error) {
      console.error("Error al completar el turno:", error);
    }
  };

  return {
    getAppointmentsFromToday,
    getAppointmentsHistory,
    getDates,
    getAppointmentsByDate,
    cancelAppointment,
    completeAppointment
  }

}