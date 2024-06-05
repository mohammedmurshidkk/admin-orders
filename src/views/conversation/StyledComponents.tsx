import { Box, styled } from '@mui/material';

export const TileEnd = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  '& .end-label': {
    fontSize: 12,
    color: theme.palette.text.disabled,
  },
}));

export const CustomBadge = styled('span')(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(0, 1),
  borderRadius: 65,
  fontSize: 12,
}));
