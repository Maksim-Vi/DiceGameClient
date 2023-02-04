import { Platform } from "react-native";
import {setClientIdWebsocket, setLoaded} from "../redux/reducers/Websocket/WebsocketReducer";
import { store } from "../redux/redux-store";
import { hendleMessage } from "./MessageManager";
import {transitionState} from "../utils/utils";
import {setInfoPopup} from "../redux/reducers/popups/PopupsReducer";

export let websocket;

let reconnectTimeout = null;
let reconnecting = false;
let tryToReconect = false;

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
        websocket.close();
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

    reconnecting = false;
    tryToReconect = false;
}

function errorWSHandler(error) {
    console.log(`[error] ${error.message}`);
    store.dispatch(setClientIdWebsocket(null))
    store.dispatch(setLoaded(false))
}

async function closeWSHandler(event) {
    if (event.wasClean) {
        console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
        console.log('[close] Connection died');
    }

    if(!reconnecting && websocket){
        reconnecting = true;
        tryToReconect = true

        reconnectWebsocket();
    } else if(tryToReconect){
        tryToReconect = false

        //store.logout()
        transitionState('AuthScreen')
        store.dispatch(setInfoPopup({visible: true, data: {text: 'Oops, Sorry! game is rebooted please try to connect later!'}}))
    }
}

function messageWSHandler(event) {
    const parseData = JSON.parse(event.data)
    
    hendleMessage(parseData)
}

function reconnectWebsocket() {
    clearTimeout(reconnectTimeout);

    reconnectTimeout = setTimeout (() => {
        if (reconnecting) {
            websocket = null;
            openServerConnection();
        }
    }, 1000);
}

export const closeWebsocletAfterLeaveGame = () =>{
    if (websocket) {
        reconnecting = true
        tryToReconect = false
        store.dispatch(setClientIdWebsocket(null))

        websocket.close();
    }
}

export const sendMessageWS = (message) =>{
    if(websocket && websocket.readyState === 1){
        websocket.send(JSON.stringify(message))
    }
}

