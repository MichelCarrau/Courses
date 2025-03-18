import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppHeader from './Components/AppHeader';
import AppRoutes from './mipagina/AppRoutes';

const theme = createTheme({
  palette: {
    background: {
      default: '#fb3d21', // Cambia este color al que desees
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppHeader />
      <AppRoutes />
    </ThemeProvider>
  );
}
