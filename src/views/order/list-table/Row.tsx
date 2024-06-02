import React, { Dispatch, SetStateAction } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import { Order } from '../../../model/order';
import { replaceEmptyWithHyphens } from '../../../utils/replaceEmptyWithHyphens';
import StatusLabel from '../../../core/components/StatusLabel';
import InnerTable from './InnerTable';
import { ItemToEdit } from '.';
import { formatCurrency } from '../../../utils/formatCurrency';

interface Props {
  order: Order;
  selectedItemToEdit: ItemToEdit | null;
  handleUpdateOrder: () => void;
  handleQuantityChange: (newQuantity: number, lineItemId: number) => void;
  setSelectedItemEdit: Dispatch<SetStateAction<ItemToEdit | null>>;
}

const Row: React.FC<Props> = (props) => {
  const {
    order,
    selectedItemToEdit,
    handleQuantityChange,
    handleUpdateOrder,
    setSelectedItemEdit,
  } = props;

  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{order?.number}</TableCell>
        <TableCell>{`${replaceEmptyWithHyphens(order?.shipping?.first_name)} ${
          order?.shipping?.last_name
        }`}</TableCell>
        <TableCell>{new Date(order?.date_created).toLocaleString()}</TableCell>
        <TableCell align='right'>{formatCurrency(order?.total)}</TableCell>
        <TableCell align='center'>
          <StatusLabel status={order?.status} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <InnerTable
              orderId={order?.id}
              lineItems={order?.line_items}
              customer={order?.shipping}
              selectedItemToEdit={selectedItemToEdit}
              setSelectedItemEdit={setSelectedItemEdit}
              handleQuantityChange={handleQuantityChange}
              handleUpdateOrder={handleUpdateOrder}
            />
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default Row;
