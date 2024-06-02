import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import ListTable from './views/order/list-table';
import FilterSheet, { Filter } from './views/order/FilterSheet';
import { useAppDispatch, useAppSelector } from './libs/store/configureStore';
import { fetchOrders } from './redux/order';
import { INITIAL_PAGE, getTotalPage } from './constants/paginationConstant';

function App() {
  const dispatch = useAppDispatch();

  const { entities, updateSuccess, totalCount } = useAppSelector((state) => state.order);

  const [page, setPage] = useState(INITIAL_PAGE);
  const [filter, setFilter] = useState<Filter>({ search: '', status: 'any' });

  const handlePageChange = (_e: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  useEffect(() => {
    dispatch(fetchOrders({ page, ...filter }));
  }, [page, filter, updateSuccess, dispatch]);

  return (
    <Stack p={3}>
      <Typography variant='caption' gutterBottom sx={{ fontSize: 19 }}>
        Orders
      </Typography>
      <FilterSheet filter={filter} setFilter={setFilter} />
      <ListTable orderList={entities} />
      <Grid container justifyContent='flex-end' mt={2}>
        <Pagination
          variant='outlined'
          shape='rounded'
          page={page}
          count={getTotalPage(totalCount)}
          onChange={handlePageChange}
        />
      </Grid>
    </Stack>
  );
}

export default App;
