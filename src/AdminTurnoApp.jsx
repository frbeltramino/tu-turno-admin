import React from 'react'
import { Route } from 'react-router-dom'
import { AppRouter } from './router/AppRouter'
import { AppTheme } from './theme'
import { AuthProvider } from './context/AuthProvider'

export const  AdminTurnoApp = () => {
  return (
    <>
       <AuthProvider>
        <AppTheme>
          <AppRouter />
        </AppTheme>
      </AuthProvider>
     
    </>
    
  )
}
