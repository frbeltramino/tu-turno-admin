import { createTheme } from '@mui/material'
import { red } from '@mui/material/colors'

export const purpleTheme = createTheme({
  palette: {
    primary: {
      main: '#262254'
    },
    secondary: {
      main: '#543884'
    },
    error: {
      main: red.A400
    },
    cardGreen: {
      main: '#55B56F'
    },
    cardRed: {
      main: '#9A364C'
    }

  },
})
