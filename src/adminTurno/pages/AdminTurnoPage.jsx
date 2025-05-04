import React from 'react'
import { Typography } from '@mui/material'
import { MailOutline } from '@mui/icons-material'
import { AdminTurnoLayout } from '../layout/AdminTurnoLayout'


export const AdminTurnoPage = () => {
  return (
    <>
      <AdminTurnoLayout>
        <Typography variant="h2" >AdminTurnoPage</Typography>
        <MailOutline />
        <Typography>lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography>
      </AdminTurnoLayout>
       
    
    </>
  )
}
