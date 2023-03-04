import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCart = createAsyncThunk(
  'cart',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/user/${id}/cart`);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    user: {},
    cart: [],
    error: '',
    status: '',
  },
  reducers: {
    resetStatus: (state) => {
      state.status = '';
      state.error = '';
    },
  },
  extraReducers: (builder) => {},
});

export const { resetStatus } = userSlice.actions;

export default userSlice.reducer;
