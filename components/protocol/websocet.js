import { Platform } from "react-native";
import {
    selectBadConnection,
    setBadConnectionWS,
    setClientIdWebsocket,
    setLoaded
} from "../redux/reducers/Websocket/WebsocketReducer";
import { store } from "../redux/redux-store";
import { hendleMessage } from "./MessageManager";
import {transitionState} from "../utils/utils";
import {closeAllPopupsPopup, selectInfoPopup, setInfoPopup} from "../redux/reducers/popups/PopupsReducer";

export let websocket;

let reconnectTimeout = null;
let reconnecting = false;
let leaveWebsocket = false;

let reconnectFailedCount = 0;
let reconnectFailed = false;

const getWSUrl = () =>{
    const inProduction = process.env.APP_TYPE !== 'development' ? true : false;
    const port = 3000

    const protocol = inProduction ? 'wss' : 'ws';

    if(Platform.OS === 'android'){
        return inProduction ? `${protocol}://${process.env.APP_PROD_URL}/` : `${protocol}://10.0.2.2:${port}/`
    } else {
        return inProduction ? `${protocol}://${process.env.APP_PROD_URL}/` : `${protocol}://localhost:${port}/`
    }
}

export const openServerConnection = () => {
    if (websocket) {
        //websocket.close();
        websocket.onopen = null;
        websocket.onerror = null;
        websocket.onclose = null;
        websocket.onmessage = null;
    }

    const url = getWSUrl()

    console.log('ANSWER', url)

    websocket = new WebSocket(url);

    websocket.onopen = openWSHandler;
    websocket.onerror = errorWSHandler;
    websocket.onclose = closeWSHandler;
    websocket.onmessage = messageWSHandler;
}

function openWSHandler() {
    console.log('open connection to server')
    store.dispatch(setLoaded(true))
    leaveWebsocket = false
    reconnecting = false;
    reconnectFailed = false;
    reconnectFailedCount = 0
    store.dispatch(setBadConnectionWS(false))

    const infoPopup = selectInfoPopup(store.getState())
    if(infoPopup.visible){
        store.dispatch(setInfoPopup({visible: false, data: null}))
    }
}

function errorWSHandler(error) {
    console.log(`[error] ${JSON.stringify(error)}`);

    reconnecting = true
    store.dispatch(setLoaded(false))
    reconnectWebsocket();

}

async function closeWSHandler(event) {
    console.log('[close] Connection died', event);

    reconnecting = true
    reconnectFailedCount += 1
    reconnectWebsocket();

    sendErrorConnectionMessage()

}

function messageWSHandler(event) {
    const parseData = JSON.parse(event.data)
    
    hendleMessage(parseData)
}

function reconnectWebsocket() {
    if(!reconnecting) return

    clearTimeout(reconnectTimeout);

    reconnectTimeout = setTimeout (() => {
        if (websocket && reconnecting && !leaveWebsocket) {
            websocket = null;
            openServerConnection();
        }
    }, 1000);
}

export const closeWebsocletAfterLeaveGame = () =>{
    if (websocket) {
        websocket.close();

        leaveWebsocket = true
        reconnecting = true
        reconnectFailed = false
        websocket = null;
        reconnectFailedCount = 0
        store.dispatch(setClientIdWebsocket(null))
    }
}

const sendErrorConnectionMessage = () =>{
    if(!reconnectFailed && reconnectFailedCount >= 10){
        reconnectFailed = true

        store.dispatch(closeAllPopupsPopup(false))
        store.dispatch(setBadConnectionWS(false))
        store.dispatch(setClientIdWebsocket(null))
        transitionState('AuthScreen')
        store.dispatch(setInfoPopup({visible: true, data: {text: 'Oops, Sorry! game is rebooted please try to connect later!'}}))
    } else if(!selectBadConnection(store.getState()) && !leaveWebsocket){
        store.dispatch(setBadConnectionWS(true))
    }
}

export const sendMessageWS = (message) =>{
    if(websocket && websocket.readyState === 1){
        websocket.send(JSON.stringify(message))
    }
}

