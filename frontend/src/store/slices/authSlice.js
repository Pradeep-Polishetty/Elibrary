import { createSlice } from '@reduxjs/toolkit';

const getUserFromStorage = () => {
  const userString = localStorage.getItem('user');
  if (userString && userString !== 'undefined') {
    try {
      return JSON.parse(userString);
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      return null;
    }
  }
  return null;
};

const initialState = {
  user: getUserFromStorage(),
  token: localStorage.getItem('token') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action) {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    },
    logOut(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
