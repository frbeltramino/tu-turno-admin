import React from 'react'
import { Route } from 'react-router-dom'
import { AppRouter } from './router/AppRouter'
import { AppTheme } from './theme'
import { AuthProvider } from './context/AuthProvider'
import { AppointmentsProvider } from './context/AppointmentsProvider'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import "./i18n";
import { ServicesAndProfessionalsProvider } from './context/ServicesAndProfessionalsProvider'

export const  AdminTurnoApp = () => {
  return (
    <>
       <AuthProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ServicesAndProfessionalsProvider>
        <AppointmentsProvider>
          <AppTheme>
            <AppRouter />
          </AppTheme>
        </AppointmentsProvider>
        </ServicesAndProfessionalsProvider>
        </LocalizationProvider>
      </AuthProvider>
     
    </>
    
  )
}
