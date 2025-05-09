import React, { useState } from 'react'
import { AppointmentsContext } from "./AppointmentsContext"

export const AppointmentsProvider = ({ children }) => {

   const [appointment, setAppointment] = useState({});
   const [day, setDay] = useState({});
   const [hour, setHour] = useState({});
   const [category, setCategory] = useState({});
   const [professional, setProfessional] = useState({});
   const [errorAppointment, setErrorAppointment] = useState("");
   const [appointmentLoading, setAppointmentLoading] = useState(false);
   const [appointments, setAppointments] = useState([]);
   const [historyAppointments, setHistoryAppointments] = useState([]);
   const [errorHistoryAppointment, setErrorHistoryAppointment] = useState("");
   const [historyAppointmentLoading, setHistoryAppointmentLoading] = useState(false);
   const [dates, setDates] = useState([]);
   const [selectedAppointment, setSelectedAppointment] = useState({});


  
  return (
    <AppointmentsContext.Provider 
      value={{
        errorAppointment,
        setErrorAppointment,
        appointmentLoading,
        setAppointmentLoading,
        appointments,
        setAppointments,
        historyAppointments,
        setHistoryAppointments,
        errorHistoryAppointment,
        setErrorHistoryAppointment,
        historyAppointmentLoading,
        setHistoryAppointmentLoading,
        dates,
        setDates,
        selectedAppointment,
        setSelectedAppointment
      }}
    >

      {children}
    </AppointmentsContext.Provider>
  )
}