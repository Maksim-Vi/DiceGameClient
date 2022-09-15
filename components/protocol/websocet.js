import { AsyncStorage, Platform } from "react-native";
import { setLoaded } from "../redux/reducers/Websocket/WebsocketReducer";
import { store } from "../redux/redux-store";
import { hendleMessage } from "./MessageManager";
import C_PING from "./messages/clients/C_PING";
import Constants from "expo-constants";

export let websocket;

let reconnectTimeout = null;
let reconnecting = false;
let pingInterval = null;

export const openServerConnection = () => {
    if (websocket) {
        websocket.close();
        websocket.onopen = null;
        websocket.onerror = null;
        websocket.onclose = null;
        websocket.onmessage = null;
    }

    setUpPingInterval();

    const url = Platform.OS === 'android' ? '10.0.2.2' : Constants.manifest.debuggerHost.split(`:`).shift()
    const port = 3030

    websocket = new WebSocket(`ws://${url}:${port}`);

    websocket.onopen = openWSHandler;
    websocket.onerror = errorWSHandler;
    websocket.onclose = closeWSHandler;
    websocket.onmessage = messageWSHandler;
    websocket.onping = function onping() {
        heartbeat()
    };
}

function heartbeat() {
    new C_PING()
}

function setUpPingInterval() {
    clearInterval(pingInterval);

    pingInterval = setInterval(() => {
        if(!reconnecting) {
            reconnecting = true;
            reconnectWebsocket();
        }
    }, 6000 + 2000);
}

function openWSHandler() {
    reconnecting = false;
}

function errorWSHandler(error) {
    reconnecting = true;
    store.dispatch(setLoaded(false))
    clearInterval(reconnectTimeout);
    reconnectWebsocket();
}

async function closeWSHandler() {
    reconnecting = true;
    
    const data = JSON.parse(await AsyncStorage.getItem('UserData'))
    if(data){
        AsyncStorage.removeItem('UserData')
    }

    clearInterval(reconnectTimeout);
    reconnectWebsocket();
}

function messageWSHandler(event) {
    const parseData = JSON.parse(event.data)
    
    hendleMessage(parseData)
}


export function killWebsocket() {
    reconnecting = true;

    if (websocket) {
        store.dispatch(setLoaded(false))
        websocket.close();
    }
}

function reconnectWebsocket() {
    clearTimeout(reconnectTimeout);

    reconnectTimeout = setTimeout (() => {
        if (reconnecting) {
            websocket = null;
            openServerConnection();
        }
    }, 3500);
}

export const sendMessageWS = (message) =>{
    if(websocket && websocket.readyState === 1){
        websocket.send(JSON.stringify(message))
    }
}

