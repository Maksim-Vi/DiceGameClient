import {openServerConnection} from "../websocet";
import { store } from "../../redux/redux-store";
import { setLoginUser, setToken } from "../../redux/reducers/login/LoginReducer";
import { getRefreshToken } from "../../utils/refreshTokenHook";
import { getFetchUrl } from "./urlApi";
import { setCurrentUser } from "../../redux/reducers/players/PlayersReducer";

export const postLoginApi = async (username, password) => {
    let data = { username: username, password: password }
   
    const refreshToken = (equest, type, bodyData) =>{
      
    }

    const callback = (json) =>{
        openServerConnection()
        store.login(json)
    
        store.dispatch(setLoginUser({ 
            id: json.user.id, 
            username: json.user.username, 
            password: json.user.password
        }))
        store.dispatch(setToken(json.token))
    }

    return await getFetchUrl('login', 'POST', data, refreshToken, callback)
}

export const postRegisterApi = async (username, email, password) => {
    let data = { username: username, email: email.toLowerCase(), password: password }
   
    const refreshToken = (equest, type, bodyData) =>{

    }

    const callback = (json) =>{
       
    }

    return await getFetchUrl('register','POST', data, refreshToken, callback)
}

export const getCoinsBonus = async (username) =>{
   
    const refreshToken = (equest, type, bodyData) =>{
        if(request && type){
            getRefreshToken()
            getCoinsBonus()
        }
    }

    const callback = (json) =>{
       
    }

    return await getFetchUrl('addCoinsToUserByUsername','POST', {username: username}, refreshToken, callback)
}

export const getDiamondsBonus = async (username) =>{
    
    const refreshToken = (equest, type, bodyData) =>{
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
    
    const refreshToken = (equest, type, bodyData) =>{
        if(request && type){
            getRefreshToken()
            getFlashBonus()
        }
    }

    const callback = (json) =>{
        
    }

    return await getFetchUrl('addFlashToUserByUsername','POST', {username: username}, refreshToken, callback)
}

export const setNewAvatar = async (username, avatarId) =>{

    const refreshToken = async (request, type, bodyData) =>{
        if(request && type){
            getRefreshToken()
            getText()
        }   
    }

    const callback = (json) =>{
        if(json){
            console.log('ANS', json.updateUser);
            
            store.dispatch(setCurrentUser(json.updateUser))
        }
    }

    return await getFetchUrl('setNewAvatar','POST', {username: username, avatarId: avatarId}, refreshToken, callback)
}

export const getText = async () =>{

    const refreshToken = async (request, type, bodyData) =>{
        if(request && type){
            getRefreshToken()
            getText()
        }   
    }

    const callback = (json) =>{
       
    }

    return await getFetchUrl('test','GET', null, refreshToken, callback)
}