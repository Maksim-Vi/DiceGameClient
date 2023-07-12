import { Platform } from "react-native"
import { selectToken } from "../../redux/reducers/login/LoginReducer";
import { store } from "../../redux/redux-store";
import { isProduction } from "../../utils/utils";

export const getUrl = () =>{
    const inProduction = isProduction() ? true : false;

    const port = 3000

    const apiDomain =
        inProduction
            ? process.env.APP_PROD_URL
            : 'localhost'

    const protocol = inProduction ? 'https' : 'http';

    //console.log('ANSWER', apiDomain)

    if(Platform.OS === 'android'){
        return inProduction ? `${protocol}://${apiDomain}/api` : `${protocol}://10.0.2.2:${port}/api`
    } else {
        return inProduction ? `${protocol}://${apiDomain}/api` : `${protocol}://localhost:${port}/api`
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
            if(json.success){
                callback(json)
            }

            return json
        })
        .catch((err) => {
            return {
                status: 500,
                success: false,
                message: 'oops, Sorry but game not working now try later!'
            }
        }) 
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
            if(json.success){
                callback(json)
            }

            return json
        })
        .catch((err) => { 
            return {
                status: 500,
                success: false,
                message: 'oops, Sorry but game not working now try later!'
            }
        }) 
    }
}