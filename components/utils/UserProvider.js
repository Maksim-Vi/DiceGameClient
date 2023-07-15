import {createContext, useCallback, useEffect, useState} from "react";
import {postLoginApi} from "../protocol/API/API";
import {setCurrentUser, updateCurrentUserSound} from "../redux/reducers/players/PlayersReducer";
import {store} from "../redux/redux-store";
import {setLoginUser, setLogout} from "../redux/reducers/login/LoginReducer";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {transitionState} from "./utils";
import {setClientIdWebsocket} from "../redux/reducers/Websocket/WebsocketReducer";
import {setSoundInfo} from "../redux/reducers/language/LanguageReducer";
import NetInfo from '@react-native-community/netinfo';
import { log } from "react-native-reanimated";
import { setInfoPopup } from "../redux/reducers/popups/PopupsReducer";
import {closeWebsocletAfterLeaveGame} from "../protocol/websocet";

export const UserContext = createContext({token: '', id: '', username: '', password: '', sound: true, data: null, auth: false});
const storageName = 'UserData'
const storageNameSound = 'soundData'

const UserProvider = ({children}) => {

    const [user, setUser] = useState({token: '', id: '', username: '', password: '', sound: true, data: null, auth: false});

    const login = useCallback(async (data) => {
        setUser({
            token: data.token,
            id: data.user.id,
            username: data.user.username,
            password: data.user.password,
            sound: data.user.isSoundOn,
            data: data,
            auth: false
        });
        await AsyncStorage.setItem(storageName, JSON.stringify({
                token: data.token,
                user:{
                    id: data.user.id,
                    username: data.user.username,
                    password: data.user.password,
                }
        }))
        await AsyncStorage.setItem(storageNameSound, JSON.stringify({sound: data.user.isSoundOn}))
        store.dispatch(setCurrentUser(data.user))
    }, [])

    const setSound = useCallback(async (sound)=>{
        setUser({...user, sound: sound});

        const value = await AsyncStorage.getItem(storageNameSound)
        if(value) {
            const data = JSON.parse(value)
            if (data) {
                const newData = {...data, sound: sound}
                await AsyncStorage.setItem(storageNameSound, JSON.stringify(newData))
            }
        }
    },[])

    const setAuth = useCallback(() => {
        setUser({...user, auth: true});
        transitionState('App')
    }, [])

    const getInternetConnection = async () => {
        let isConnected = false;

        isConnected = await NetInfo.fetch().then(state => {
            return state.isConnected
        });

        return isConnected
    }

    const logout = useCallback(async (isSerwerWorker = false) => {
        if(!isSerwerWorker){
            setUser({token: '', id: '', username: '', password: '', sound: user.sound, data: null, auth: false});
            await AsyncStorage.setItem(storageName, '')
            store.dispatch(setLogout())
            store.dispatch(setClientIdWebsocket(null))
            transitionState('AuthScreen')
            closeWebsocletAfterLeaveGame()
        } else {
            store.dispatch(setClientIdWebsocket(null))
            transitionState('AuthScreen')
        }
    })

    const getDataFromStorage = async () => {
        const sound = await AsyncStorage.getItem(storageName)
        const isInternetConnection = await getInternetConnection()

        if(sound){
            const soundParse = JSON.parse(sound)
            if(soundParse){
                store.dispatch(setSoundInfo(soundParse.sound))
                store.dispatch(updateCurrentUserSound(soundParse.sound))
            }
        }

        const value = await AsyncStorage.getItem(storageName)

        if(value && !isInternetConnection) {
            store.dispatch(setClientIdWebsocket(null))
            transitionState('AuthScreen')

            return store.dispatch(setInfoPopup({visible: true, data: {text: 'Oops, Sorry, your internet connection is unstable! Please check your internet and try load the game again. We will wait for you!'}}))
        }
            
        if(value){
            const data = JSON.parse(value)

            if (data && data.token && data.user.username) {
                transitionState('LoadingProject')
                store.dispatch(setLoginUser({id: data.user.id, username: data.user.username, password: data.user.password}))
                const dataLogin = await postLoginApi(data.user.username, data.user.password)

                if (dataLogin && dataLogin.success) {
                    console.log('AUTO LOGIN SUCCESS')
                } else {
                    logout()
                }
            } else {
                logout()
            }
        } else {
            logout()
        }
    }

    store.logout = logout
    store.setAuth = setAuth
    store.login = login
    store.setSound = setSound

    useEffect(() => {
        getDataFromStorage()
    }, [login])
    
    return (
        <UserContext.Provider value={{user, login, logout,setSound}}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider