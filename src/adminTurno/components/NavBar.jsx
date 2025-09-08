import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { AppBar, Grid, IconButton, Toolbar, Typography, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { useAuth } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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

  const { t } = useTranslation();

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
          <MenuItem onClick={() => handleNavigation('/adminTurno')}>{ t('i18n.titles.003') }</MenuItem>
          <MenuItem onClick={() => handleNavigation('/professionals')}>{ t('i18n.titles.004') }</MenuItem>
          <MenuItem onClick={() => handleNavigation('/services')}>{ t('i18n.titles.005') }</MenuItem>
          <MenuItem onClick={() => handleNavigation('/holidays')}>{ t('i18n.titles.006') }</MenuItem>
          <MenuItem onClick={() => handleNavigation('/adminHistoricoTurnos')}>{ t('i18n.titles.001') }</MenuItem>
          <MenuItem onClick={() => handleNavigation('/register')}>{ t('i18n.auth.010') }</MenuItem>
        </Menu>

        <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
          <Typography>{ t('i18n.titles.007') }</Typography>

          <IconButton color="error" onClick={handleLogout}>
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};