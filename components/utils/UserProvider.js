import { createContext, useCallback, useEffect, useState } from "react";
import { AsyncStorage } from "react-native";
import C_LOGIN from "../protocol/messages/clients/C_LOGIN";
import { setCurrentUser } from "../redux/reducers/players/PlayersReducer";
import { store } from "../redux/redux-store";

export const UserContext = createContext({ name: '', auth: false });
const storageName = 'UserData'

const UserProvider = ({ children }) => {
    
    const [user, setUser] = useState({token: '', id: '', username: '', password: '', data: null, auth: false });
    
    const login = useCallback((data) => {
        setUser({
          token: data.token,
          id: data.user.id,
          username: data.user.name,
          password: data.user.password,
          data: data,
          auth: true });
        store.dispatch(setCurrentUser(data.user))
        AsyncStorage.setItem(storageName, JSON.stringify({
          userID: data.user.id,
          username: data.user.name,
          password: data.user.password,
          token: data.token,
          data: data
      }))
      },[])
    
    
    const logout = useCallback(() => {
        setUser({token: '', id: '', username: '', password: '', data: null, auth: false });
        AsyncStorage.removeItem(storageName)
    })

    const getDataFromStorage = async () => {
      const data = JSON.parse(await AsyncStorage.getItem(storageName))
      if(data && data.data.token && data.data.user){
        login(data.data)
        new C_LOGIN(data.data.user.username,data.data.user.password)
      } else {
        logout()
      }
    }

    useEffect(()=>{
      getDataFromStorage()
    }, [login])

  
    return (
      <UserContext.Provider value={{ user, login, logout }}>
        {children}
      </UserContext.Provider>
    );
}

export default UserProvider