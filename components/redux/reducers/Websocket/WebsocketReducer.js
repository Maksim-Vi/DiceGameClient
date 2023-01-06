import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    loaded: false,
    clinetIdWebsocket: null,
    activeTabApp: 'MainScreen'
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
    },
    setActiveTabApp: (state, action) =>{
      state.activeTabApp = action.payload
    }
  },
});

export const { setLoaded,setActiveTabApp, setClientIdWebsocket } = websocketReducerSlice.actions;

export const selectActiveTabApp = state => state.websocketMessages.activeTabApp;
export const selectClientIdWebsocket = state => state.websocketMessages.clinetIdWebsocket;

export default websocketReducerSlice.reducer;

