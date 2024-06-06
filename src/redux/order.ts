import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ExtendedSerializedError, InitialState, serializeAxiosError } from '../utils/reducerUtil';
import { FetchOrdersParam, Order, OrderBody, defaultValues } from '../model/order';
import { wooInstance } from '../libs/wooInstance';
import { INITIAL_PAGE, SIZE } from '../constants/paginationConstant';

const initialState: InitialState<Order> = {
  loading: false,
  updating: false,
  updateSuccess: false,
  entity: defaultValues,
  entities: [],
  errorMessage: null,
  successMessage: null,
};

const apiUrl = '/wp-json/wc/v3/orders';

export const fetchOrders = createAsyncThunk(
  'order/fetchOrders',
  async ({ page = INITIAL_PAGE, size = SIZE, search = 'any', status = '' }: FetchOrdersParam) => {
    const res = await wooInstance.get(
      `${apiUrl}?page=${page}&per_page=${size}&search=${search}&status=${status}`,
    );
    return res;
  },
  { serializeError: serializeAxiosError },
);

export const updateOrder = createAsyncThunk(
  'order/updateOrder',
  async (body: OrderBody) => {
    const res = await wooInstance.put(`${apiUrl}/${body?.id}`, body);
    return res;
  },
  { serializeError: serializeAxiosError },
);

const orderSlice = createSlice({
  name: 'order',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.updateSuccess = false;
        state.errorMessage = null;
        state.successMessage = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.totalCount = action.payload.headers['x-wp-total'];
        state.entities = action.payload?.data;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        const error = action?.error as ExtendedSerializedError;
        state.errorMessage = error?.response?.data?.message || error?.message;
      })
      .addCase(updateOrder.pending, (state) => {
        state.updating = true;
        state.updateSuccess = false;
        state.errorMessage = null;
        state.successMessage = null;
      })
      .addCase(updateOrder.fulfilled, (state) => {
        state.updateSuccess = true;
        state.updating = false;
        state.successMessage = 'Order updated successfully';
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.updating = false;
        const error = action?.error as ExtendedSerializedError;
        state.errorMessage = error?.response?.data?.message || error?.message;
      });
  },
});

export default orderSlice.reducer;
