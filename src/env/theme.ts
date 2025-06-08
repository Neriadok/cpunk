import { createTheme, ThemeOptions } from '@mui/material';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: { main: '#44EBEB' },
    secondary: { main: '#f008f0' },
    error: { main: '#f00808' },
    warning: { main: '#f0f008' },
    info: { main: '#087cf0' },
    success: { main: '#08f07c' },
  },
};

export const theme = createTheme(themeOptions);
