import React from 'react';
import Typography from '@mui/material/Typography';
import { STATUS } from '../../enums/status';
import { statusList } from '../../constants/status';

interface Props {
  status: STATUS;
}

const getColor = (status: STATUS) => {
  switch (status) {
    case STATUS.PENDING:
      return 'warning.light';
    case STATUS.PROCESSING:
      return 'warning.main';
    case STATUS.ON_HOLD:
      return 'info.main';
    case STATUS.COMPLETED:
      return 'success.main';
    case STATUS.CANCELLED:
      return 'error.light';
    case STATUS.TRASH:
      return 'error.dark';
    case STATUS.FAILED:
      return 'error.main';
    case STATUS.REFUNDED:
      return 'warning.dark';

    default:
      return '';
  }
};

const StatusLabel: React.FC<Props> = ({ status }) => {
  const statusInfo = statusList?.find((s) => s?.value === status);

  return (
    <Typography variant='subtitle2' sx={{ fontSize: 13, color: getColor(status) }}>
      {statusInfo?.label}
    </Typography>
  );
};

export default StatusLabel;
