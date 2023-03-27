import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  myUser: {},
  statistics: {},
  activeItems: {},
  usersOnline: 0,
  friends:{
    userFriends: [],
    invitationsToFriends: [],
    invitationsFromFriends: [],
    invitedCount: 0
  },
  invitedOpponent: null
}

export const playersReducerSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    setCurrentUser: (state, action) =>{
      state.myUser = action.payload
    },
    updateCurrentUserLanguage: (state, action) =>{
      if(state.myUser){
        state.myUser.language = action.payload
      }
    },
    updateCurrentUserSound: (state, action) =>{
      if(state.myUser){
        state.myUser.isSoundOn = action.payload
      }
    },
    updateCurrentUserFlash: (state, action) =>{
      if(state.myUser){
        state.myUser.flash = action.payload
      }
    },
    updateCurrentUserCoins: (state, action) =>{
      if(state.myUser){
        state.myUser.coins = action.payload
      }
    },
    updateCurrentUserCrystals: (state, action) =>{
      if(state.myUser){
        state.myUser.crystals = action.payload
      }
    },
    updateCurrentUserExp: (state, action) =>{
      if(state.myUser){
        state.myUser.experience = action.payload
      }
    },
    setActiveItems: (state, action) =>{
      state.activeItems = action.payload
    },
    setUsersOnline: (state, action) =>{
      state.usersOnline = action.payload
    },
    setStatistics: (state, action) =>{
      state.statistics = action.payload
    },

    setFriends: (state, action) =>{
      state.friends = {
        userFriends: action.payload.userFriends,
        invitationsToFriends: action.payload.invitationsToFriends,
        invitationsFromFriends: action.payload.invitationsFromFriends,
        invitedCount: action.payload.invitedCount
      }
    },
    setInvitedOpponent: (state, action) =>{
      state.invitedOpponent = action.payload
    },
  },
});

export const {
  setCurrentUser,
  updateCurrentUserSound,
  updateCurrentUserLanguage,
  updateCurrentUserExp,
  updateCurrentUserFlash,
  setActiveItems,
  updateCurrentUserCoins,
  updateCurrentUserCrystals,
  setUsersOnline,
  setStatistics,
  setFriends,
  setInvitedOpponent
} = playersReducerSlice.actions;

export const selectMyUser = state => state.players.myUser;
export const selectCurrentUserId = state => state.players.myUser.id;
export const selectUserCoins = state => state.players.myUser.coins;
export const selectUserCrystals = state => state.players.myUser.crystals;
export const selectUserExperience = state => state.players.myUser.experience;
export const selectUserFlash = state => state.players.myUser.flash;
export const selectActiveItems = state => state.players.activeItems;
export const selectUsersOnline = state => state.players.usersOnline;

export default playersReducerSlice.reducer;

