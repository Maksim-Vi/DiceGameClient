import {createContext, useCallback, useEffect, useState} from "react";
import C_LOGIN from "../protocol/messages/clients/C_LOGIN";
import {postLoginApi} from "../protocol/API/API";
import {setCurrentUser} from "../redux/reducers/players/PlayersReducer";
import {store} from "../redux/redux-store";
import {setLogout} from "../redux/reducers/login/LoginReducer";
import {storage} from "../../App";

export const UserContext = createContext({token: '', id: '', username: '', password: '', data: null, auth: false});
const storageName = 'UserData'

const UserProvider = ({children}) => {

    const [user, setUser] = useState({token: '', id: '', username: '', password: '', data: null, auth: false});

    const login = useCallback(async (data) => {
        setUser({
            token: data.token,
            id: data.user.id,
            username: data.user.username,
            password: data.user.password,
            data: data,
            auth: false
        });
        storage.set(storageName, JSON.stringify({
                token: data.token,
                user:{
                    id: data.user.id,
                    username: data.user.username,
                    password: data.user.password,
                }
        }))
        store.dispatch(setCurrentUser(data.user))
    }, [])

    const setAuth = useCallback(() => {
        setUser({...user, auth: true});
    }, [])

    const logout = useCallback(() => {
        setUser({token: '', id: '', username: '', password: '', data: null, auth: false});
        storage.set(storageName, '')
        store.dispatch(setLogout())
    })

    const getDataFromStorage = async () => {
        const value = storage.getString(storageName)
        if(value){
            const data = JSON.parse(value)

            if (data && data.token && data.user.username) {
                const dataLogin = await postLoginApi(data.user.username, data.user.password)

                if (dataLogin && dataLogin.success) {
                    navigation.navigate('LoadingProject')
                    new C_LOGIN(data.user.username,data.user.password)
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

    useEffect(() => {
        getDataFromStorage()
    }, [login])
    
    return (
        <UserContext.Provider value={{user, login, logout}}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider