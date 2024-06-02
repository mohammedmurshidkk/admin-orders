import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import TableContainer, { TableContainerProps } from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { LineItem, Order } from '../../../model/order';
import { useAppDispatch, useAppSelector } from '../../../libs/store/configureStore';
import { updateOrder } from '../../../redux/order';
import Row from './Row';
import EmptyRow from './EmptyRow';

export const StyledTableContainer = styled(TableContainer)<TableContainerProps>(({ theme }) => ({
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,

  ['& thead, & th']: {
    fontSize: 13,
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
  },

  ['& tbody, & td']: {
    fontSize: 13,
    backgroundColor: theme.palette.common.white,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

interface Props {
  orderList?: Array<Order>;
}

export interface ItemToEdit {
  orderId?: number;
  lineItems?: LineItem[];
}

const ListTable: React.FC<Props> = ({ orderList }) => {
  const dispatch = useAppDispatch();

  const { loading, updateSuccess } = useAppSelector((state) => state.order);

  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedItemToEdit, setSelectedItemEdit] = useState<null | ItemToEdit>(null);

  const handleQuantityChange = (newQuantity: number, lineItemId: number) => {
    const updatedOrders = orders.map((order) => {
      if (order.id === selectedItemToEdit?.orderId) {
        const updatedItems = order?.line_items?.map((item) => {
          if (item.id === lineItemId) {
            return { ...item, quantity: newQuantity };
          }
          return item;
        });
        return { ...order, line_items: updatedItems };
      }
      return order;
    });
    setOrders(updatedOrders);
  };

  const handleUpdateOrder = () => {
    const selectedOrder = orders?.find((o) => o?.id === selectedItemToEdit?.orderId);

    const finalData = {
      id: selectedItemToEdit?.orderId,
      line_items: selectedItemToEdit?.lineItems?.map((item) => {
        const quantity = selectedOrder?.line_items?.find((l) => l?.id === item?.id);

        return {
          id: item?.id,
          quantity: quantity?.quantity,
        };
      }),
    };

    dispatch(updateOrder(finalData));
  };

  useEffect(() => {
    if (Array.isArray(orderList)) {
      setOrders(orderList || []);
    }
  }, [orderList]);

  useEffect(() => {
    if (updateSuccess) {
      setSelectedItemEdit(null);
    }
  }, [updateSuccess]);

  return (
    <StyledTableContainer sx={{ mt: 1 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>#ID</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell align='right'>Total Amount</TableCell>
            <TableCell align='center'>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(orderList) && orderList?.length > 0 ? (
            orders?.map((order) => {
              return (
                <Row
                  key={order.id}
                  order={order}
                  selectedItemToEdit={selectedItemToEdit}
                  handleUpdateOrder={handleUpdateOrder}
                  handleQuantityChange={handleQuantityChange}
                  setSelectedItemEdit={setSelectedItemEdit}
                />
              );
            })
          ) : (
            <EmptyRow loading={loading} />
          )}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default ListTable;
