import { configureStore } from '@reduxjs/toolkit';
import GameReducer from './reducers/game/GameReducer';
import LoginReducer from './reducers/login/LoginReducer';
import PlayersReducer from './reducers/players/PlayersReducer';
import WebsocketReducer from './reducers/Websocket/WebsocketReducer';
import CollectionsReducer from "./reducers/collections/CollectionsReducer";
import PopupsReducer from './reducers/popups/PopupsReducer';

export const store = configureStore({
  reducer: {
    websocketMessages: WebsocketReducer,
    login: LoginReducer,

    players: PlayersReducer,
    games: GameReducer,
    collections: CollectionsReducer,
    popups: PopupsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export const subscribe = (eventName, listener) => {
  document.addEventListener(eventName, (event)=>{
      listener(event.detail.data)
  });
}

export const unsubscribe = (eventName, listener) => {
  document.removeEventListener(eventName, listener);
}

export const publish = (eventName, data) => {
  const event = new CustomEvent(eventName, { detail: data });
  document.dispatchEvent(event);
}
