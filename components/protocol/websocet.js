import { AsyncStorage, Platform } from "react-native";
import { setLoaded } from "../redux/reducers/Websocket/WebsocketReducer";
import { store } from "../redux/redux-store";
import { hendleMessage } from "./MessageManager";
import Constants from "expo-constants";

export let websocket;

let reconnectTimeout = null;
let reconnecting = false;

export const openServerConnection = () => {
    if (websocket) {
        websocket.close();
        websocket.onopen = null;
        websocket.onerror = null;
        websocket.onclose = null;
        websocket.onmessage = null;
    }

    const url = Platform.OS === 'android' ? '10.0.2.2' : Constants.manifest.debuggerHost.split(`:`).shift()
    const port = 3030

    websocket = new WebSocket(`ws://${url}:${port}`);

    websocket.onopen = openWSHandler;
    websocket.onerror = errorWSHandler;
    websocket.onclose = closeWSHandler;
    websocket.onmessage = messageWSHandler;
}

function openWSHandler() {
    reconnecting = false;
    // clearInterval(reconnectTimeout);
}

function errorWSHandler(error) {

    const close = async () =>{
        const data = JSON.parse(await AsyncStorage.getItem('UserData'))
        if(data){
            AsyncStorage.removeItem('UserData')
        }
        store.logout()
    }

    console.error(`[error] ${error.message}`);

    reconnecting = true;
    store.dispatch(setLoaded(false))
    clearInterval(reconnectTimeout);
    reconnectWebsocket();
    close()
}

async function closeWSHandler(event) {

    if (event.wasClean) {
        console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
        console.log('[close] Connection died');
    }
    const data = JSON.parse(await AsyncStorage.getItem('UserData'))
    if(data){
        reconnecting = true;

        clearInterval(reconnectTimeout);
        reconnectWebsocket();
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

export const sendMessageWS = (message) =>{
    if(websocket && websocket.readyState === 1){
        websocket.send(JSON.stringify(message))
    }
}

