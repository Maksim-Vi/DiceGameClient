import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    loaded: false,
    clinetIdWebsocket: null
}

export const websocketReducerSlice = createSlice({
  name: 'websocket',
  initialState,
  reducers: {
    setLoaded: (state, action) =>{
      state.loaded = action.payload
    },
    setClientIdWebsocket: (state, action) =>{
      state.clinetIdWebsocket = action.payload
    }
  },
});

export const { setLoaded, setClientIdWebsocket } = websocketReducerSlice.actions;

export const selectLoaded = state => state.websocketMessages.loaded;
export const selectClientIdWebsocket = state => state.websocketMessages.clinetIdWebsocket;

export default websocketReducerSlice.reducer;

