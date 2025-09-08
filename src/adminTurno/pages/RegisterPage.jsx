import React from 'react';
import {
  Grid,
  Typography,
  TextField,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  FormControl,
  InputLabel,
  Paper,
  Box
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm } from '../../hooks/useForm';
import { AdminTurnoLayout } from '../layout/AdminTurnoLayout';
import { useAuth } from '../../hooks';
import { useTranslation } from 'react-i18next';

const registerFormFields = {
  registerName: '',
  registerEmail: '',
  registerPassword: '',
  registerPhone: ''
};

export const RegisterPage = () => {
  const { registerName, registerEmail, registerPassword, onInputChange, registerPhone } =
    useForm(registerFormFields);

  const { startRegister } = useAuth();
  const [showPassword, setShowPassword] = React.useState(false);
  const { t } = useTranslation();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const onSubmit = (e) => {
    e.preventDefault();
    const objAdmin = {
      name: registerName,
      email: registerEmail,
      phone: registerPhone,
      password: registerPassword
    };
    startRegister(objAdmin);
  };

  return (
    <AdminTurnoLayout>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: 'calc(100vh - 100px)' }}
      >
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{ fontWeight: 'bold', mb: 3 }}
            >
              {t('i18n.auth.005')}
            </Typography>

            <Box component="form" onSubmit={onSubmit}>
              <TextField
                label={t('i18n.auth.006')}
                fullWidth
                name="registerName"
                value={registerName}
                onChange={onInputChange}
                sx={{ mb: 2 }}
              />

              <TextField
                label={t('i18n.auth.007')}
                type="email"
                placeholder="correo@google.com"
                fullWidth
                name="registerEmail"
                value={registerEmail}
                onChange={onInputChange}
                sx={{ mb: 2 }}
              />

              <TextField
                label={t('i18n.auth.008')}
                type="tel"
                placeholder="Ej: 1123456789"
                fullWidth
                name="registerPhone"
                value={registerPhone}
                onChange={onInputChange}
                sx={{ mb: 2 }}
              />

              <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
                <InputLabel htmlFor="outlined-adornment-password">
                  {t('i18n.auth.009')}
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  name="registerPassword"
                  value={registerPassword}
                  onChange={onInputChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword
                            ? t('i18n.auth.011')
                            : t('i18n.auth.012')
                        }
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label={t('i18n.auth.009')}
                />
              </FormControl>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ py: 1.2, fontWeight: 'bold' }}
              >
                {t('i18n.auth.010')}
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </AdminTurnoLayout>
  );
};
