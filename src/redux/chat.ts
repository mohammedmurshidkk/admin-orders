import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ExtendedSerializedError, InitialState, serializeAxiosError } from '../utils/reducerUtil';

const initialState: InitialState<{ message?: string }> = {
  loading: false,
  updating: false,
  updateSuccess: false,
  entity: {},
  entities: [],
  errorMessage: null,
  successMessage: null,
};

const apiUrl = 'http://localhost:8080/chat';

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (body: { message: string }) => {
    const res = await axios.post(`${apiUrl}/send`, body);
    return res;
  },
  { serializeError: serializeAxiosError },
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.updating = true;
        state.updateSuccess = false;
        state.errorMessage = null;
        state.successMessage = null;
      })
      .addCase(sendMessage.fulfilled, (state) => {
        state.updateSuccess = true;
        state.updating = false;
        state.successMessage = 'Message send';
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.updating = false;
        const error = action?.error as ExtendedSerializedError;
        state.errorMessage = error?.response?.data?.message || error?.message;
      });
  },
});

export default chatSlice.reducer;
