import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
import LanguageIcon from '@mui/icons-material/Language';
import { ArrowDropDownIcon } from '@mui/x-date-pickers';
import { useLanguage } from '../context/LanguageProvider';

export const SelectLanguage = ({ compact = false }) => {
  const { language, changeLanguage } = useLanguage();

  const handleChange = (event) => changeLanguage(event.target.value);

  return (
    <FormControl
      size={compact ? 'small' : 'medium'}
      sx={{
        minWidth: compact ? 60 : 80,
        color: 'white',
      }}
    >
      <Select
        value={language}
        onChange={handleChange}
        displayEmpty
        sx={{
          color: 'white',
          '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
          '& .MuiSelect-select': {
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            p: compact ? '4px 8px' : '6px 10px',
          },
        }}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <LanguageIcon sx={{ color: 'white', fontSize: compact ? 18 : 20 }} />
            {selected === 'es' ? 'ES' : 'EN'}
          </Box>
        )}
      >
        <MenuItem value="es">ES</MenuItem>
        <MenuItem value="en">EN</MenuItem>
      </Select>
    </FormControl>
  );
};


