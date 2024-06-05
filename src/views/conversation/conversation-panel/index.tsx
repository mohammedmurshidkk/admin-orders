import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import { conversationList } from '../../../constants/conversationList';
import PanelHeader from './PanelHeader';
import ConversationTile from './ConversationTile';

const ConversationPanel = () => {
  const t = useTheme();

  return (
    <Stack
      sx={{
        height: '100%',
        backgroundColor: (t) => t.palette.grey[100],
        borderRight: `1px solid ${t.palette.grey[300]}`,
      }}
    >
      <PanelHeader />
      <List sx={{ overflow: 'auto' }}>
        {conversationList?.map((conversation, i) => {
          return <ConversationTile key={`tile-${i}`} conversation={conversation} />;
        })}
      </List>
    </Stack>
  );
};

export default ConversationPanel;
