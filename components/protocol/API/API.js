import { Platform } from "react-native"
import Constants from "expo-constants";
import {openServerConnection} from "../websocet";

const getUrl = () =>{
    const inProduction = true;
    const inExpo = Constants.manifest && Constants.manifest.debuggerHost;
    const inBrowser = typeof document !== 'undefined';

    const apiDomain =
        inProduction
            ? 'dicegame-server.herokuapp.com'
            : inExpo
                ? Constants.manifest.debuggerHost.split(`:`).shift()
                : inBrowser
                    ? document.location.hostname
                    : 'unknown';

    const protocol = inProduction ? 'https' : 'http';

    if(Platform.OS === 'android'){
        return inProduction ? `${protocol}://${apiDomain}/api` : `${protocol}://10.0.2.2:8080/api`
    } else {
        return inProduction ? `${protocol}://${apiDomain}/api` : `${protocol}://${apiDomain}:8080/api`
    }
}

const URL = getUrl()

export const postLoginApi = async (username, password) => {
    let data = { username: username, password: password }

    return await fetch(`${URL}/login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((json) => {
        openServerConnection()
        return json
    })
    .catch((err) => {
        console.log(`login ERROR`, err);
    })
}

export const postRegisterApi = async (username, email, password) => {
    let data = { username: username, email: email.toLowerCase(), password: password }

    return await fetch(`${URL}/register`,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }) 
    .then((response) => response.json())
    .then((json) => {
        return json
    })
    .catch((err) => {
        console.log(`register ERROR`, err);
    })
}

export const getText = async () =>{
    return await fetch(`${URL}/test`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
    })
    .then((response) => response.json())
    .then((json) => {
      return json
    })
    .catch((err) => {
        console.log(`login ERROR`, err);
    })
}