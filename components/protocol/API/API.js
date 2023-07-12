import {openServerConnection} from "../websocet";
import { store } from "../../redux/redux-store";
import { setLoginUser, setToken } from "../../redux/reducers/login/LoginReducer";
import { getRefreshToken } from "../../utils/refreshTokenHook";
import { getFetchUrl } from "./urlApi";
import { setCurrentUser } from "../../redux/reducers/players/PlayersReducer";
import {setGoogleConfirmUsernamePopup} from "../../redux/reducers/popups/PopupsReducer";
import {getDeviceLocation} from "../../utils/utils";

export const postLoginApi = async (username, password) => {
    let data = { username: username, password: password }
   
    const refreshToken = (request, type, bodyData) =>{
      
    }

    const callback = (json) =>{
        store.login(json)

        store.dispatch(setLoginUser({
            id: json.user.id,
            username: json.user.username,
            password: json.user.password
        }))
        store.dispatch(setToken(json.token))
        openServerConnection()
    }

    return await getFetchUrl('login', 'POST', data, refreshToken, callback)
}

export const postGoogleLoginOrRegister = async (username, password, email, googleAvatar) => {
    let data = { username: username, password: password, email: email, googleAvatar: googleAvatar, lang: 'EN' }

    const refreshToken = (equest, type, bodyData) =>{

    }

    const callback = (json) =>{
        if(json.user.isFinishRegistration){
            store.login(json)

            store.dispatch(setLoginUser({
                id: json.user.id,
                username: json.user.username,
                password: json.user.password
            }))
            store.dispatch(setToken(json.token))
            openServerConnection()
        } else {
            store.dispatch(setGoogleConfirmUsernamePopup({visible: true, data: {username: json.user.username, email: json.user.email}}))
        }
    }

    return await getFetchUrl('googleLoginOrRegister', 'POST', data, refreshToken, callback)
}

export const postUpdateGoogleUsername = async (username, email, language) => {
    let data = { username: username, email: email, lang: language}

    const refreshToken = (request, type, bodyData) =>{
        if(request && type){
            getRefreshToken()
            postUpdateGoogleUsername(bodyData.username,bodyData.email)
        }
    }

    const callback = (json) =>{
        store.login(json)

        store.dispatch(setLoginUser({
            id: json.user.id,
            username: json.user.username,
            password: json.user.password
        }))
        store.dispatch(setToken(json.token))

        openServerConnection()
    }

    return await getFetchUrl('googleConfirmOrChangeName', 'POST', data, refreshToken, callback)
}

export const postRegisterApi = async (username, email, password, lang) => {
    let data = { username: username, email: email.toLowerCase(), password: password, lang: lang || 'EN' }
   
    const refreshToken = (request, type, bodyData) =>{

    }

    const callback = (json) =>{
       
    }

    return await getFetchUrl('register','POST', data, refreshToken, callback)
}

export const deleteAccountApi = async (userId) => {

    const refreshToken = (request, type, bodyData) =>{
        if(request && type){
            getRefreshToken()
            postUpdateGoogleUsername(bodyData.username,bodyData.email)
        }
    }

    const callback = (json) =>{}

    return await getFetchUrl(`users/${userId}`,'DELETE', {}, refreshToken, callback)
}

export const searchFriendsApi = async (username) => {

    const refreshToken = (request, type, bodyData) =>{
        if(request && type){
            getRefreshToken()
            postUpdateGoogleUsername(bodyData.username,bodyData.email)
        }
    }

    const callback = (json) =>{
    }

    return await getFetchUrl(`users/search?username=${username}`,'GET', {}, refreshToken, callback)
}

export const getCoinsBonus = async (username) =>{
   
    const refreshToken = (request, type, bodyData) =>{
        if(request && type){
            getRefreshToken()
            getCoinsBonus()
        }
    }

    const callback = (json) =>{
        // if(json.giftWatchedTime){
        //     store.dispatch(setLeftTimeShowAd(json.giftWatchedTime))
        // }
    }

    return await getFetchUrl('addCoinsToUserByUsername','POST', {username: username}, refreshToken, callback)
}

export const getDiamondsBonus = async (username) =>{
    
    const refreshToken = (request, type, bodyData) =>{
        if(request && type){
            getRefreshToken()
            getDiamondsBonus()
        }
    }

    const callback = (json) =>{
      
    }

    return await getFetchUrl('addDiamondsToUserByUsername','POST', {username: username}, refreshToken, callback)  
}

export const getFlashBonus = async (username) =>{
    
    const refreshToken = (request, type, bodyData) =>{
        if(request && type){
            getRefreshToken()
            getFlashBonus()
        }
    }

    const callback = (json) =>{
        
    }

    return await getFetchUrl('addFlashToUserByUsername','POST', {username: username}, refreshToken, callback)
}

export const getADX2CoinsBonus = async (userId,coins) =>{

    const body = {coinsQuantity: coins, multiplier: 2}

    const refreshToken = (request, type, bodyData) =>{
        if(request && type){
            getRefreshToken()
            getFlashBonus()
        }
    }

    const callback = (json) =>{

    }

    return await getFetchUrl(`users/${userId}/multiple-coins`,'PATCH', body, refreshToken, callback)
}

export const getADFlashBonus = async (userId,flash) =>{

    const body = {flashQuantity: flash, multiplier: 1}

    const refreshToken = (request, type, bodyData) =>{
        if(request && type){
            getRefreshToken()
            getFlashBonus()
        }
    }

    const callback = (json) =>{

    }

    return await getFetchUrl(`users/${userId}/multiple-flash`,'PATCH', body, refreshToken, callback)
}

export const setNewAvatar = async (username, avatarId) =>{

    const refreshToken = (request, type, bodyData) =>{
        if(request && type){
            getRefreshToken()
            getText()
        }   
    }

    const callback = (json) =>{
        if(json){ 
            store.dispatch(setCurrentUser(json.updateUser))
        }
    }

    return await getFetchUrl('setNewAvatar','POST', {username: username, avatarId: avatarId}, refreshToken, callback)
}

export const getNews = async (userId) =>{

    const refreshToken = (request, type, bodyData) =>{
        if(request && type){
            getRefreshToken()
            getText()
        }   
    }

    const callback = (json) =>{
    }

    return await getFetchUrl(`news/get-for-user/${userId}`,'GET', null, refreshToken, callback)
}

export const openItemNews = async (idNews, userId) =>{

    const refreshToken = (request, type, bodyData) =>{
        if(request && type){
            getRefreshToken()
            getText()
        }
    }

    const callback = (json) =>{
    }

    return await getFetchUrl(`news/${idNews}/user/${userId}`,'GET', null, refreshToken, callback)
}

export const claimNewsGift = async (idNews, userId, giftType, reward) =>{

    const data = {
        newsId: idNews,
        userId : userId,
        giftType: giftType,
        reward: reward
    }
    const refreshToken = (request, type, bodyData) =>{
        if(request && type){
            getRefreshToken()
            getText()
        }
    }

    const callback = (json) =>{
    }

    return await getFetchUrl(`news/get-news-gift`,'POST', data, refreshToken, callback)
}


export const getText = async () =>{

    const refreshToken = (request, type, bodyData) =>{
        if(request && type){
            getRefreshToken()
            getText()
        }   
    }

    const callback = (json) =>{
       
    }

    return await getFetchUrl('test','GET', null, refreshToken, callback)
}