import { createSlice } from '@reduxjs/toolkit';

let initialState = {
   testBtnsPopup: {visible: false},
   avatarPopup: {visible: false, data: null},
   settingsPopup: {visible: false, data: null},
   lvlUpPopup: {visible: false, data: null},
   sevenDaysGift: {visible: false, data: null},
   infoPopup: {visible: false, data: null},
   googleConfirmUsernamePopup: {visible: false, data: null},
   lostConnOpponentGame: {visible: false, data: null},
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
    setInfoPopup: (state, action) =>{
      state.infoPopup = action.payload
    },
    setGoogleConfirmUsernamePopup: (state, action) =>{
      state.googleConfirmUsernamePopup = action.payload
    },
    setLostConnOppPopup: (state, action) =>{
      state.lostConnOpponentGame = action.payload
    },
  },
});

export const {
    setTestBtnsPopup,
    setLevelUpPopup,
    setAvatarPopup,
    setSettingsMenuPopup,
    setSevenDaysGiftPopup,
    setInfoPopup,
    setGoogleConfirmUsernamePopup,
    setLostConnOppPopup
} = popupsReducerSlice.actions;

export const selectAvatarPopup = state => state.popups.avatarPopup;
export const selectLevelUpPopup = state => state.popups.lvlUpPopup;
export const selectSettingsPopup = state => state.popups.settingsPopup;
export const selectTestBtnsPopup = state => state.popups.testBtnsPopup;
export const selectSevenDaysGiftPopup = state => state.popups.sevenDaysGift;
export const selectInfoPopup = state => state.popups.infoPopup;
export const selectGoogleConfirmUsernamePopup = state => state.popups.googleConfirmUsernamePopup;
export const selectLostConnOpponentPopup = state => state.popups.lostConnOpponentGame;

export default popupsReducerSlice.reducer;

