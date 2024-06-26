import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import ChatTypeField from '../../../core/components/ChatTypeField';
import { useAppDispatch } from '../../../libs/store/configureStore';
import { sendMessage } from '../../../redux/chat';
import ChatCanvas from './ChatCanvas';

const ChatRoom = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const [message, setMessage] = useState('');

  const onSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(sendMessage({ message }));
    setMessage('');
  };

  return (
    <Stack sx={{ height: '100%' }} component='form' onSubmit={onSend}>
      <Grid
        container
        alignItems='center'
        sx={{
          height: '10%',
          p: theme.spacing(1.5, 4),
          backgroundColor: theme.palette.common.white,
          borderBottom: `1px solid ${theme.palette.grey[300]}`,
        }}
      >
        <Avatar alt={''} src='' sx={{ borderRadius: 2 }} />
        <Typography sx={{ fontWeight: 'bold', fontSize: 18, ml: 2 }}>Salton Morrison</Typography>
      </Grid>
      <Grid flexGrow={1}>
        <ChatCanvas />
      </Grid>
      <Grid
        container
        gap={2}
        sx={{ backgroundColor: theme.palette.grey[300], p: 2, height: '10%' }}
      >
        <Grid item flex={2}>
          <ChatTypeField value={message} onChange={(e) => setMessage(e?.target?.value)} />
        </Grid>
        <Button
          sx={{
            backgroundColor: theme.palette.common.white,
            height: 38,
            minWidth: 38,
            ':hover': {
              backgroundColor: theme.palette.common.white,
            },
          }}
          type='submit'
          disabled={!message}
        >
          <SendIcon fontSize='small' />
        </Button>
      </Grid>
    </Stack>
  );
};

export default ChatRoom;
