import { configureStore } from '@reduxjs/toolkit';
import GameReducer from './reducers/game/GameReducer';
import LoginReducer from './reducers/login/LoginReducer';
import PlayersReducer from './reducers/players/PlayersReducer';
import WebsocketReducer from './reducers/Websocket/WebsocketReducer';

export const store = configureStore({
  reducer: {
    websocketMessages: WebsocketReducer,
    login: LoginReducer,

    players: PlayersReducer,
    games: GameReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
