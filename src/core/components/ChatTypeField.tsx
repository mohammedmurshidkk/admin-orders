import React from 'react';
import { TextField } from '@mui/material';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

interface Props {
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> | undefined;
}

const ChatTypeField: React.FC<Props> = ({ value, onChange }) => {
  return (
    <TextField
      size='small'
      fullWidth
      value={value}
      onChange={onChange}
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
