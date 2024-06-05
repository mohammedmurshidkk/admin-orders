import LogoutIcon from '@mui/icons-material/Logout';
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Search from '../../../core/components/Search';

const PanelHeader = () => {
  const theme = useTheme();

  return (
    <Stack sx={{ px: 1.8, py: 1, borderBottom: `1px solid ${theme.palette.grey[400]}` }}>
      <Grid container justifyContent='space-between' alignItems='center'>
        <Typography fontWeight='bold'>Conversations</Typography>
        <IconButton size='small' color='error'>
          <LogoutIcon fontSize='small' />
        </IconButton>
      </Grid>
      <Grid sx={{ mt: 1 }}>
        <Search />
      </Grid>
    </Stack>
  );
};

export default PanelHeader;
