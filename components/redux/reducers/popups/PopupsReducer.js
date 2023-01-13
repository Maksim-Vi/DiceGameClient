import { createSlice } from '@reduxjs/toolkit';

let initialState = {
   testBtnsPopup: {visible: false},
   avatarPopup: {visible: false, data: null},
   settingsPopup: {visible: false, data: null},
   lvlUpPopup: {visible: false, data: null},
   sevenDaysGift: {visible: false, data: null},
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
    setSettingsMenuPopup: (state, action) =>{
      state.settingsPopup = action.payload
    },
    setLevelUpPopup: (state, action) =>{
      state.lvlUpPopup = action.payload
    },
    setSevenDaysGiftPopup: (state, action) =>{
      state.sevenDaysGift = action.payload
    },
  },
});

export const {setTestBtnsPopup, setLevelUpPopup, setAvatarPopup, setSettingsMenuPopup, setSevenDaysGiftPopup} = popupsReducerSlice.actions;

export const selectAvatarPopup = state => state.popups.avatarPopup;
export const selectLevelUpPopup = state => state.popups.lvlUpPopup;
export const selectSettingsPopup = state => state.popups.settingsPopup;
export const selectTestBtnsPopup = state => state.popups.testBtnsPopup;
export const selectSevenDaysGiftPopup = state => state.popups.sevenDaysGift;

export default popupsReducerSlice.reducer;

