import Grid from '@mui/material/Grid';
import ConversationPanel from './views/conversation/conversation-panel';
import ChatRoom from './views/conversation/chat-room';

const ConversationCanvas = () => {
  return (
    <Grid container sx={{ height: '100vh', overflow: 'hidden' }}>
      <Grid item flex={1} sx={{ minWidth: 330, height: '100%' }}>
        <ConversationPanel />
      </Grid>
      <Grid item flex={4} sx={{ height: '100%' }}>
        <ChatRoom />
      </Grid>
    </Grid>
  );
};

export default ConversationCanvas;
