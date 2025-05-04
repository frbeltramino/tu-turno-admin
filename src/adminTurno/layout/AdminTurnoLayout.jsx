import { Box } from '@mui/material'
import React from 'react'
import { NavBar } from '../components';

const drowerWith = 240;

export const AdminTurnoLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>

      <NavBar />

      { /* Sidebar */ }

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3,  mt: '64px', }}
      >
        { children }
      </Box>

    </Box>
  )
}
