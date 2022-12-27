import { configureStore } from '@reduxjs/toolkit';
import GameReducer from './reducers/game/GameReducer';
import LoginReducer from './reducers/login/LoginReducer';
import PlayersReducer from './reducers/players/PlayersReducer';
import WebsocketReducer from './reducers/Websocket/WebsocketReducer';
import CollectionsReducer from "./reducers/collections/CollectionsReducer";
import PopupsReducer from './reducers/popups/PopupsReducer';
import ChatReducer from './reducers/chat/ChatReducer';
import RoadReducer from "./reducers/road/RoadReducer";
import AdvertisingReducer from "./reducers/AD/AdvertisingReducer";

export const store = configureStore({
  reducer: {
    websocketMessages: WebsocketReducer,
    advertising: AdvertisingReducer,
    login: LoginReducer,

    players: PlayersReducer,
    games: GameReducer,
    collections: CollectionsReducer,
    popups: PopupsReducer,
    chat: ChatReducer,
    road: RoadReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
