import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    token: '',
    refreshTime: '',
    userData:{}
}

export const loginReducerSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLoginUser: (state, action) =>{
      state.userData = action.payload
    },
    setToken: (state, action) =>{
      state.token = action.payload
    },
    setRefreshTokenTime: (state, action) =>{
      state.refreshTime = action.payload
    },
    setLogout: (state, action) =>{
      state.token = ''
      state.refreshTime = ''
      state.userData = {}
    },

  },
});

export const {setLoginUser, setToken, setRefreshTokenTime,setLogout} = loginReducerSlice.actions;

export const selectLoginUser = state => state.login.userData;
export const selectToken = state => state.login.token;
export const selectRefreshTokenTime = state => state.login.refreshTime;

export default loginReducerSlice.reducer;

