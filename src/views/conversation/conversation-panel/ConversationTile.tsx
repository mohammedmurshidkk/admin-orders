import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Conversation } from '../../../model/conversation';
import { joinDialCode } from '../../../utils/joinDialCode';
import TextTruncate from '../../../core/components/TextTruncate';
import { CustomBadge, TileEnd } from '../StyledComponents';

interface Props {
  conversation: Conversation;
}

const ConversationTile: React.FC<Props> = ({ conversation }) => {
  const { name, dialCode, lastMessage, phoneNumber, unReadCount, avatarColor } = conversation;

  const renderTileEnd = () => {
    return (
      <TileEnd>
        <Typography
          variant='caption'
          className='end-label'
          sx={{ ...(unReadCount && { color: (t) => `${t.palette.primary.main} !important` }) }}
        >
          Monday
        </Typography>
        {Boolean(unReadCount) && <CustomBadge>{unReadCount}</CustomBadge>}
      </TileEnd>
    );
  };

  return (
    <>
      <ListItemButton role={undefined} dense>
        <ListItemAvatar>
          <Avatar alt={name || ''} src='' sx={{ borderRadius: 2, backgroundColor: avatarColor }} />
        </ListItemAvatar>
        <ListItemText
          primary={<Typography sx={{}}>{name || joinDialCode(dialCode, phoneNumber)}</Typography>}
          secondary={
            <TextTruncate
              text={lastMessage}
              limit={28}
              variant='caption'
              sx={{ fontWeight: 'medium' }}
            />
          }
          secondaryTypographyProps={{ sx: { lineHeight: 0 } }}
        />
        {renderTileEnd()}
      </ListItemButton>
      <Divider />
    </>
  );
};

export default ConversationTile;
