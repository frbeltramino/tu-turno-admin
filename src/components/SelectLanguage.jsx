import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
import LanguageIcon from '@mui/icons-material/Language';
import { ArrowDropDownIcon } from '@mui/x-date-pickers';
import { useLanguage } from '../context/LanguageProvider';

export const SelectLanguage = () => {
  const { language, changeLanguage } = useLanguage();


  const handleChange = (event) => {
    changeLanguage(event.target.value);
  };

  const CustomLanguageIcon = () => (
    <LanguageIcon sx={{ color: "ffffff" }} />
  );

  const CustomArrowDown = () => (
    <ArrowDropDownIcon sx={{ color: "ffffff" }} />
  );

     return (
    <FormControl sx={{ m: 1, minWidth: 80, color: "white" }}>
      <InputLabel
        id="language-select-label"
        sx={{
          color: "white",
          "&.Mui-focused": { color: "white"},
          "&.MuiInputLabel-shrink": { color: "white" }
        }}
      >
        Language
      </InputLabel>

      <Select
        labelId="language-select-label"
        value={language}
        onChange={handleChange}
        label="Language"
        IconComponent={CustomArrowDown}
        sx={{
          color: "white",
          display: "flex",
          alignItems: "center",
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "white", padding: "2px" },
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "white", padding: "2px" },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
            padding: "2px"
          },
          "& .MuiSelect-select": {
            padding: "6px 6px 6px 6px",
          },
        }}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LanguageIcon sx={{ color: "white" }} />
            {selected === "es" ? "Es" : "En"}
          </Box>
        )}
      >
        <MenuItem value={"es"}>
          Es
        </MenuItem>
        <MenuItem value={"en"}>
         En
        </MenuItem>
      </Select>
    </FormControl>
  );
};
 
