import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  currentGameId: null,
  game: null,
  gameSettings: null,
  isStarted: false,
  youMove: false,
  throwData: null,
  opponentThrowData: null,
  scores: {userId: null, username: null, userScores:null, opponentsScores:null},
  countScores: null,
  result: null
}

export const gameReducerSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setCarrentGameId: (state, action) =>{
      state.currentGameId = action.payload
    },
    setGame: (state, action) =>{
      state.game = action.payload
    },
    setGameSettings: (state, action) =>{
      state.gameSettings = action.payload
    },
    setIsGameStarted: (state, action) =>{
      state.isStarted = action.payload
    },
    setIsYouMove: (state, action) =>{
      state.youMove = action.payload
    },
    setThrowData: (state, action) =>{
      state.throwData = action.payload
    },
    setOpponentThrowData: (state, action) =>{
      state.opponentThrowData = action.payload
    },
    setScores: (state, action) =>{
      state.scores = action.payload
    },
    setCountScores: (state, action) =>{
      state.countScores = action.payload
    },
    resetScores: (state, action) =>{
      state.scores = {userId: null, username: null, userScores:null, opponentsScores:null}
    },
    setResultGame: (state, action) =>{
      state.result = action.payload
    }
  },
});

export const {
  setCarrentGameId, setGame, setGameSettings,
  setIsGameStarted, setIsYouMove, setThrowData, setOpponentThrowData,
  setScores,setCountScores, resetScores, setResultGame
} = gameReducerSlice.actions;

export const selectCurrentGameId = state => state.games.currentGameId;
export const selectGame = state => state.games.game;
export const selectGameSettings = state => state.games.gameSettings;
export const selectIsGameStrated = state => state.games.isStarted;
export const selectIsYouMove = state => state.games.youMove;
export const selectThrowData = state => state.games.throwData;
export const selectOpponentThrowData = state => state.games.opponentThrowData;
export const selectScores = state => state.games.scores;
export const selectCountScores = state => state.games.countScores;
export const selectResultGame = state => state.games.result;

export default gameReducerSlice.reducer;

