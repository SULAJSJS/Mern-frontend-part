import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
  const { data } = await axios.post('/auth/login', params);
  return data;
});

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
  const { data } = await axios.post('/auth/register', params);
  return data;
});

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
  const { data } = await axios.get('/auth/me');
  console.log(data);
  return data;
});

const initialState = {
  data: null,
  status: 'loading',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [fetchAuth.fulfilled.type]: (state, action) => {
      state.data = action.payload;
      state.status = 'success';
    },
    [fetchAuth.pending.type]: (state) => {
      state.data = null;
      state.status = 'loading';
    },
    [fetchAuth.rejected.type]: (state) => {
      state.data = null;
      state.status = 'error';
    },

    [fetchAuthMe.fulfilled.type]: (state, action) => {
      state.data = action.payload;
      state.status = 'success';
    },
    [fetchAuthMe.pending.type]: (state) => {
      state.data = null;
      state.status = 'loading';
    },
    [fetchAuthMe.rejected.type]: (state) => {
      state.data = null;
      state.status = 'error';
    },

    [fetchRegister.fulfilled.type]: (state, action) => {
      state.data = action.payload;
      state.status = 'success';
    },
    [fetchRegister.pending.type]: (state) => {
      state.data = null;
      state.status = 'loading';
    },
    [fetchRegister.rejected.type]: (state) => {
      state.data = null;
      state.status = 'error';
    },
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
