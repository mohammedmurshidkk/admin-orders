import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import CircularProgress from '@mui/material/CircularProgress';
import EMPTY_KART from '../../../assets/empty-kart.jpg';

interface Props {
  loading?: boolean;
}

const EmptyRow: React.FC<Props> = ({ loading }) => {
  return (
    <TableRow>
      <TableCell colSpan={6} align='center'>
        {loading ? <CircularProgress /> : <img src={EMPTY_KART} alt='empty-kart' width={250} />}
      </TableCell>
    </TableRow>
  );
};

export default EmptyRow;
