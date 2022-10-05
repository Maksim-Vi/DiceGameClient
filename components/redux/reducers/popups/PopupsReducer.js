import { createSlice } from '@reduxjs/toolkit';

let initialState = {
   avatarPopup: {visible: false, data: null}
}

export const popupsReducerSlice = createSlice({
  name: 'popups',
  initialState,
  reducers: {
    setAvatarPopup: (state, action) =>{
      state.avatarPopup = action.payload
    },
  },
});

export const {setAvatarPopup} = popupsReducerSlice.actions;

export const selectAvatarPopup = state => state.popups.avatarPopup;

export default popupsReducerSlice.reducer;

