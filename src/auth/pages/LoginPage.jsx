import React, { useContext, useState, useEffect } from 'react';
import { Grid, Typography, TextField, OutlinedInput, InputAdornment, IconButton, Button, FormControl, InputLabel, CircularProgress } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Google } from '@mui/icons-material'
import { Link as RouterLink, Link } from 'react-router-dom'
import { AuthLayout } from '../layout/AuthLayout';
import { useAuth, useForm } from '../../hooks';
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/AuthContext';


export const LoginPage = () => {


  const loginFormFields = {
    loginEmail: '',
    loginPassword: ''
  }


  const { loginEmail, loginPassword, onInputChange } = useForm(loginFormFields);

  const { startLogin } = useAuth();

  const { errorLogin, loadingLogin } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log({loginEmail, loginPassword})
    startLogin({email: loginEmail, password: loginPassword});
  }

  useEffect(() => {
    if (errorLogin) {
        Swal.fire('Error en la autenticación', errorLogin, 'error');
    }
  }, [errorLogin]);

  return (
    <AuthLayout title="Login">

        <form>
          <Grid container size={{ xs: 12 }}>

            <Grid size={{ xs: 12 }}>
              <TextField
                label="Correo"
                type="email"
                placeholder="correo@google.com"
                fullWidth
                name="loginEmail"
                value={loginEmail}
                onChange={onInputChange}
              />
            </Grid>

            <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                <OutlinedInput

                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  label="Contraseña"
                  placeholder="Contraseña"
                  fullWidth
                  name="loginPassword"
                  value={loginPassword}
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
                    sx={{ height: '40px', position: 'relative' }}
                    onClick={onSubmit}
                    disabled={loadingLogin} // opcional: desactiva el botón mientras carga
                  >
                    Login
                    {loadingLogin && (
                      <CircularProgress
                        size={20}
                        color="inherit"
                        sx={{ position: 'absolute', right: 16 }}
                      />
                    )}
                  </Button>
                 
                </Grid>

              </Grid>
            </Grid>
          </Grid>
        </form>

      </AuthLayout>
    
  )
}
