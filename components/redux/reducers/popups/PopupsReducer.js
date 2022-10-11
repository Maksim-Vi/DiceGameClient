import { createSlice } from '@reduxjs/toolkit';

let initialState = {
   testBtnsPopup: {visible: false},
   avatarPopup: {visible: false, data: null}
}

export const popupsReducerSlice = createSlice({
  name: 'popups',
  initialState,
  reducers: {
    setTestBtnsPopup: (state, action) =>{
      state.testBtnsPopup = action.payload
    },
    setAvatarPopup: (state, action) =>{
      state.avatarPopup = action.payload
    },
  },
});

export const {setTestBtnsPopup, setAvatarPopup} = popupsReducerSlice.actions;

export const selectAvatarPopup = state => state.popups.avatarPopup;
export const selectTestBtnsPopup = state => state.popups.testBtnsPopup;

export default popupsReducerSlice.reducer;

