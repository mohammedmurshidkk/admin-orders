import React, { Dispatch, SetStateAction, useMemo } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TextField from '@mui/material/TextField';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { SvgIconTypeMap } from '@mui/material/SvgIcon';
import Paper from '@mui/material/Paper';
import { LineItem, Shipping } from '../../../model/order';
import { ItemToEdit } from '.';
import { useAppSelector } from '../../../libs/store/configureStore';
import { formatCurrency } from '../../../utils/formatCurrency';

interface Props {
  orderId?: number;
  customer?: Shipping | null;
  lineItems?: LineItem[];
  selectedItemToEdit: ItemToEdit | null;
  handleUpdateOrder: () => void;
  setSelectedItemEdit: Dispatch<SetStateAction<ItemToEdit | null>>;
  handleQuantityChange: (newQuantity: number, lineItemId: number) => void;
}

interface ActionButton {
  Icon?: OverridableComponent<SvgIconTypeMap<object, 'svg'>> & {
    muiName: string;
  };
  onClick?: () => void;
  updating?: boolean;
}

const renderActionButton = ({ Icon = EditIcon, updating = false, onClick }: ActionButton) => {
  return (
    <Button variant='contained' color='inherit' disabled={updating} onClick={onClick}>
      {!updating ? <Icon fontSize='small' color='primary' /> : <CircularProgress size={20} />}
    </Button>
  );
};

const InnerTable: React.FC<Props> = ({
  orderId,
  lineItems,
  customer,
  selectedItemToEdit,
  handleUpdateOrder,
  handleQuantityChange,
  setSelectedItemEdit,
}) => {
  const { updating } = useAppSelector((state) => state.order);

  const isEditingOrder = useMemo(
    () => selectedItemToEdit?.orderId === orderId,
    [orderId, selectedItemToEdit?.orderId],
  );

  return (
    <Box sx={{ px: 2, py: 3, backgroundColor: (t) => t.palette.background.default }}>
      <Typography variant='h6' gutterBottom component='div' textAlign='center'>
        Order Items
      </Typography>
      <Box>
        <Typography variant='subtitle2'>{`${customer?.first_name} ${customer?.last_name}`}</Typography>
        <Typography variant='subtitle2'>{customer?.city}</Typography>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          mt: 2,
          ['& thead, & th']: {
            backgroundColor: (t) => t?.palette.secondary.light,
          },
        }}
      >
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Name</TableCell>
              <TableCell align='right'>Price</TableCell>
              <TableCell align='right'>Quantity</TableCell>
              <TableCell align='center'>
                {isEditingOrder
                  ? renderActionButton({
                      Icon: SaveIcon,
                      onClick: handleUpdateOrder,
                      updating: updating,
                    })
                  : renderActionButton({
                      Icon: EditIcon,
                      onClick: () => setSelectedItemEdit({ orderId, lineItems }),
                    })}
              </TableCell>
              <TableCell align='right'>Total Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lineItems?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <img
                    src={item?.image?.src}
                    alt='item-img'
                    height={25}
                    style={{ objectFit: 'contain' }}
                  />
                </TableCell>
                <TableCell scope='row'>{item?.name}</TableCell>
                <TableCell align='right'>{formatCurrency(item?.price)}</TableCell>
                <TableCell align='right'>
                  {selectedItemToEdit?.orderId === orderId ? (
                    <TextField
                      size='small'
                      value={item?.quantity}
                      onChange={(e) =>
                        handleQuantityChange(parseInt(e.target.value || '0'), item?.id)
                      }
                      sx={{ maxWidth: 80 }}
                    />
                  ) : (
                    item?.quantity
                  )}
                </TableCell>
                <TableCell />
                <TableCell align='right'>{formatCurrency(item?.price * item?.quantity)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default InnerTable;
