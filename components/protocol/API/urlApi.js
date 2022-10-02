import { Platform } from "react-native"
import Constants from "expo-constants";
import { selectToken } from "../../redux/reducers/login/LoginReducer";
import { store } from "../../redux/redux-store";

export const getUrl = () =>{
    const inProduction = process.env.NODE_ENV !== 'development' ? true : false;
    const port = 3000
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
        return inProduction ? `${protocol}://${apiDomain}/api` : `${protocol}://10.0.2.2:${port}/api`
    } else {
        return inProduction ? `${protocol}://${apiDomain}/api` : `${protocol}://${Constants.manifest.debuggerHost.split(`:`).shift()}:${port}/api`
    }
}

export const getFetchUrl = async (request, type, bodyData,refreshToken, callback) =>{
    let token = selectToken(store.getState())

    if(type === 'GET'){
        return await fetch(`${getUrl()}/${request}`,{
            method: type,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${token}`
            },
        }) 
        .then((response) => {
            if (response.status === 401) {
                refreshToken(request, type, bodyData)
            }
            return response;
        })
        .then((response) => {
            return response.json()
        })
        .then((json) => { 
            callback(json)
            return json
        })
        .catch((err) => { console.log(`fetch ERROR`, err) }) 
    } else {
        return await fetch(`${getUrl()}/${request}`,{
            method: type,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${token}`
            },
            body: JSON.stringify(bodyData)
        }) 
        .then((response) => {
            if (response.status === 401) {
                refreshToken(request, type, bodyData)
            }
            return response;
        })
        .then((response) => {
            return response.json()
        })
        .then((json) => { 
            callback(json)
            return json
        })
        .catch((err) => { 
            console.log(`fetch ERROR req`, err)
        }) 
    }
}