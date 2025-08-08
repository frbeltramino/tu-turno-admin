import React from 'react'
import { AdminTurnoLayout } from '../layout/AdminTurnoLayout'
import { ProfessionalCard } from '../../components/ProfessionalCard';
import { Box, Grid, Typography } from '@mui/material';


export const ProfessionalsPage = () => {

  const professionals = [
  {
    "_id": "682907cb6bcf622099c69b21",
    "name": "Bart Simpson",
    "description": "Especialista en primeros auxilios para mascotas y manejo de emergencias veterinarias",
    "image": "barney.jpg",
    "working_days": [
      {
        "day": "Lunes",
        "working_hours": {
          "am": {
            "start": "10:00",
            "end": "13:00"
          },
          "pm": {
            "start": "14:30",
            "end": "18:00"
          }
        }
      },
      {
        "day": "Martes",
        "working_hours": {
          "am": {
            "start": "10:00",
            "end": "13:00"
          },
          "pm": {
            "start": "14:30",
            "end": "18:00"
          }
        }
      },
      {
        "day": "Jueves",
        "working_hours": {
          "am": {
            "start": "10:00",
            "end": "13:00"
          },
          "pm": {
            "start": "14:30",
            "end": "18:00"
          }
        }
      }
    ],
    "holidays": [
      "2025-06-01",
      "2025-12-24"
    ],
    "phone": "2213057195",
    "email": "frbeltra2@gmail.com",
    "bank_account_cbu": "2212222",
    "bank_account_alias": "alias.1",
    "bank_account_titular": "Jhon Doe",
    "__v": 0
  }
];


  return (
       <AdminTurnoLayout>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Profesionales</Typography>
      </Box>

      <Box display="flex" justifyContent="center">
        <Grid container spacing={3} justifyContent="center" maxWidth="md">
          {professionals.map((pro, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ProfessionalCard professional={pro} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </AdminTurnoLayout>
  );
};

