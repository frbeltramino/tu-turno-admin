import React from 'react';
import { Grid, Typography, TextField, OutlinedInput, InputAdornment, IconButton, Button, FormControl, InputLabel } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Google } from '@mui/icons-material'
import { Link as RouterLink, Link } from 'react-router-dom'


import { useForm } from '../../hooks/useForm';
import { AdminTurnoLayout } from '../layout/AdminTurnoLayout';
import { useAuth } from '../../hooks';

const registerFormFields = {
  registerName: '',
  registerEmail: '',
  registerPassword: '',
  registerPhone: ''
};

export const RegisterPage = () => {


  const { registerName, registerEmail, registerPassword, onInputChange, registerPhone } = useForm(registerFormFields);

  const { startRegister } = useAuth();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log({ registerEmail, registerName, registerPassword, registerPhone });
    let objAdmin = {
      name: registerName,
      email: registerEmail,
      phone: registerPhone,
      password: registerPassword
    }
    startRegister(objAdmin);
  }

  return (
  
      <AdminTurnoLayout> 

      
      <Typography variant="h4">Crear cuenta</Typography>

        <form>
          <Grid container size={{ xs: 12 }}>

          <Grid size={{ xs: 12 }}>
              <TextField
                label="Nombre completo"
                type="text"
                placeholder="Nombre completo"
                fullWidth
                name="registerName"
                value={registerName}
                onChange={onInputChange}
              />
            </Grid>

            <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
              <TextField
                label="Correo"
                type="email"
                placeholder="correo@google.com"
                fullWidth
                name="registerEmail"
                value={registerEmail}
                onChange={onInputChange}
              />
            </Grid>

            <Grid item size={12} sx={{ mt: 2 }}>
              <TextField
                label="Teléfono"
                type="tel"
                placeholder="Ej: 1123456789"
                fullWidth
                name="registerPhone"
                value={registerPhone}
                onChange={onInputChange}
              />
            </Grid>

            <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>

            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
              <OutlinedInput

                id="outlined-adornment-password"
                label="Contraseña"
                type={showPassword ? 'text' : 'password'}
                placeholder="Contraseña"
                fullWidth
                name="registerPassword"
                value={registerPassword}
                onChange={onInputChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword ? 'hide the password' : 'display the password'
                      }
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              </FormControl>

            </Grid>

            <Grid item size={{ xs: 12 }} sx={{ mt: 2 }}>
              <Grid container spacing={2} justifyContent="center">

                <Grid
                  item
                  size={{ xs: 12}}
                >
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ height: '40px' }} // misma altura para los dos
                    onClick={onSubmit}
                  >
                    Crear cuenta
                  </Button>
                </Grid>

              </Grid>
            </Grid>
          </Grid>
        </form>
      </AdminTurnoLayout>       
  
    
  )
}
