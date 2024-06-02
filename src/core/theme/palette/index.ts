import { Palette } from '@mui/material';

const defaultPalette = (mode: Palette['mode']): Palette => {
  return {
    mode: mode,
    primary: {
      light: '#66C0DB',
      main: '#1E91B6',
      dark: '#00688B',
      contrastText: '#FFFFFF',
    },
    background: {
      paper: '#FFFFFF',
      default: '#F3F6F9',
    },
  } as Palette;
};

export default defaultPalette;
