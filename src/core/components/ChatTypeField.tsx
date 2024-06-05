import React from 'react';
import { TextField } from '@mui/material';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

interface Props {}

const ChatTypeField: React.FC<Props> = () => {
  return (
    <TextField
      size='small'
      fullWidth
      inputProps={{ style: { marginLeft: 8 } }}
      InputProps={{
        startAdornment: <SentimentSatisfiedAltIcon />,
        style: { backgroundColor: '#fff' },
      }}
      placeholder='Type your message'
    />
  );
};

export default ChatTypeField;
