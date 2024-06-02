import { ReactNode } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import defaultPalette from './palette';

type Props = {
  children: ReactNode;
};

const ThemeComponent = (props: Props) => {
  const { children } = props;

  const theme = createTheme({ palette: defaultPalette('light') });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeComponent;
