import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { AppBar, Grid, IconButton, Toolbar, Typography, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { useAuth } from '../../hooks';
import { useNavigate } from 'react-router-dom';

export const NavBar = () => {
  const { startLogout } = useAuth();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    startLogout();
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleMenuClose();
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          sx={{ mr: 2 }}
          onClick={handleMenuClick}
        >
          <MenuOutlined />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleNavigation('/adminTurno')}>Turnos</MenuItem>
          <MenuItem onClick={() => {}}>Profesionales</MenuItem>
          <MenuItem onClick={() => {}}>Servicios</MenuItem>
          <MenuItem onClick={() => {}}>Feriados</MenuItem>
          <MenuItem onClick={() => handleNavigation('/adminHistoricoTurnos')}>Histórico de Turnos</MenuItem>
          <MenuItem onClick={() => handleNavigation('/register')}>Crear cuenta</MenuItem>
        </Menu>

        <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
          <Typography>Administrar Turnos</Typography>

          <IconButton color="error" onClick={handleLogout}>
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};