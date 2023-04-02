import { createSlice } from '@reduxjs/toolkit';
import NotEnoughFlashPopup from "../../../managers/popupsManager/popupsComponents/NotEnoughFlashPopup";

let initialState = {
   testBtnsPopup: {visible: false},
   avatarPopup: {visible: false, data: null},
   settingsPopup: {visible: false, data: null},
   lvlUpPopup: {visible: false, data: null},
   sevenDaysGift: {visible: false, data: null},
   infoPopup: {visible: false, data: null},
   tutorialPopup: {visible: false, data: null},
   googleConfirmUsernamePopup: {visible: false, data: null},
   lostConnOpponentGame: {visible: false, data: null},
   collectItemPopup: {visible: false, data: null},
   botGameTypesPopup: {visible: false, data: null},
   rewardsPopup: {visible: false, data: null},
   deleteAccountPopup: {visible: false, data: null},
   invitationPopup: {visible: false, data: null},
   adFlashPopup: {visible: false, data: null},
   notEnoughFlashPopup: {visible: false, data: null},
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
    setTutorialPopup: (state, action) =>{
      state.tutorialPopup = action.payload
    },
    setGoogleConfirmUsernamePopup: (state, action) =>{
      state.googleConfirmUsernamePopup = action.payload
    },
    setLostConnOppPopup: (state, action) =>{
      state.lostConnOpponentGame = action.payload
    },
    setCollectItemPopup: (state, action) =>{
      state.collectItemPopup = action.payload
    },
    setBotGameTypesPopup: (state, action) =>{
      state.botGameTypesPopup = action.payload
    },
    setRewardsPopup: (state, action) =>{
      state.rewardsPopup = action.payload
    },
    setDeleteAccountPopup: (state, action) =>{
      state.deleteAccountPopup = action.payload
    },
    setInvitationPopup: (state, action) =>{
      state.invitationPopup = action.payload
    },
    setADFlashPopup: (state, action) =>{
      state.adFlashPopup = action.payload
    },
    setNotEnoughFlashPopup: (state, action) =>{
      state.notEnoughFlashPopup = action.payload
    },
  },
});

export const {
    setTestBtnsPopup,
    setBotGameTypesPopup,
    setTutorialPopup,
    setLevelUpPopup,
    setAvatarPopup,
    setSettingsMenuPopup,
    setSevenDaysGiftPopup,
    setInfoPopup,
    setGoogleConfirmUsernamePopup,
    setLostConnOppPopup,
    setCollectItemPopup,
    setRewardsPopup,
    setDeleteAccountPopup,
    setInvitationPopup,
    setADFlashPopup,
    setNotEnoughFlashPopup
} = popupsReducerSlice.actions;

export const selectAvatarPopup = state => state.popups.avatarPopup;
export const selectLevelUpPopup = state => state.popups.lvlUpPopup;
export const selectSettingsPopup = state => state.popups.settingsPopup;
export const selectTestBtnsPopup = state => state.popups.testBtnsPopup;
export const selectSevenDaysGiftPopup = state => state.popups.sevenDaysGift;
export const selectInfoPopup = state => state.popups.infoPopup;
export const selectTutorialPopup = state => state.popups.tutorialPopup;
export const selectGoogleConfirmUsernamePopup = state => state.popups.googleConfirmUsernamePopup;
export const selectLostConnOpponentPopup = state => state.popups.lostConnOpponentGame;
export const selectCollectItemPopup = state => state.popups.collectItemPopup;
export const selectBotGameTypesPopup = state => state.popups.botGameTypesPopup;
export const selectRewardsPopup = state => state.popups.rewardsPopup;
export const selectDeleteAccountPopup = state => state.popups.deleteAccountPopup;
export const selectInvitationPopup = state => state.popups.invitationPopup;
export const selectADFlashPopup = state => state.popups.adFlashPopup;
export const selectNotEnoughFlashPopup = state => state.popups.notEnoughFlashPopup;

export default popupsReducerSlice.reducer;

