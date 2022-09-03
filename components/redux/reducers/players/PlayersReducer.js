import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  myUser: {}
}

export const playersReducerSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    setCurrentUser: (state, action) =>{
      state.myUser = action.payload
    }
  },
});

export const {setCurrentUser} = playersReducerSlice.actions;

export const selectMyUser = state => state.players.myUser;
export const selectCurrentUserId = state => state.players.myUser.id;
export const selectUserCoins = state => state.players.myUser.coins;
export const selectUserCrystals = state => state.players.myUser.crystals;
export const selectUserExperience = state => state.players.myUser.experience;

export default playersReducerSlice.reducer;

