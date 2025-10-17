import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { AppBar, IconButton, Toolbar, Typography, Menu, MenuItem, Box } from '@mui/material';
import React, { useState } from 'react';
import { useAuth } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SelectLanguage } from '../../components/SelectLanguage';

export const NavBar = () => {
  const { startLogout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const { t } = useTranslation();

  const handleLogout = () => startLogout();
  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleNavigation = (path) => {
    navigate(path);
    handleMenuClose();
  };

  return (
    <AppBar position="fixed" sx={{ bgcolor: 'primary.main' }}>
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 1, sm: 2 } }}>
        {/* --- LADO IZQUIERDO --- */}
        <IconButton color="inherit" edge="start" onClick={handleMenuClick}>
          <MenuOutlined />
        </IconButton>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={() => handleNavigation('/adminTurno')}>{t('i18n.titles.003')}</MenuItem>
          <MenuItem onClick={() => handleNavigation('/professionals')}>{t('i18n.titles.004')}</MenuItem>
          <MenuItem onClick={() => handleNavigation('/services')}>{t('i18n.titles.005')}</MenuItem>
          <MenuItem onClick={() => handleNavigation('/holidays')}>{t('i18n.titles.006')}</MenuItem>
          <MenuItem onClick={() => handleNavigation('/adminHistoricoTurnos')}>{t('i18n.titles.001')}</MenuItem>
          <MenuItem onClick={() => handleNavigation('/register')}>{t('i18n.auth.010')}</MenuItem>
        </Menu>

        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            textAlign: 'left',
            fontSize: { xs: '0.9rem', sm: '1rem' },
            whiteSpace: 'nowrap',
          }}
        >
          {t('i18n.titles.007')}
        </Typography>

        {/* --- LADO DERECHO --- */}
        <Box display="flex" alignItems="center" gap={0.5}>
          <SelectLanguage compact />
          <IconButton color="error" onClick={handleLogout} size="small">
            <LogoutOutlined fontSize="small" />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
