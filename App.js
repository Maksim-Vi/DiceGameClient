import { Provider } from 'react-redux';
import { store } from './components/redux/redux-store';
import UserProvider from './components/utils/UserProvider';
import Screens from './components/screens/Screens';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useFonts } from 'expo-font';
import PopupsManager from './components/managers/popupsManager/PopupsManager';
import { MMKV } from 'react-native-mmkv'
import ChatManager from "./components/managers/chatManager/ChatManager";

export const storage = new MMKV()

export default function App() {

  const [fontsLoaded] = useFonts({
    'Dilo-World': require('./assets/fonts/DiloWorld.ttf'),
    'Gogono-Cocoa': require('./assets/fonts/GogonoCocoa.otf'),
  });

  const navigationRef = useNavigationContainerRef();

  useEffect(()=>{
    const chatManager = new ChatManager()
    store.chatManager = chatManager
    window.chatManager = chatManager
  },[])

  if (!fontsLoaded) return null;
  
  return  (
    <Provider store={store}>
      <UserProvider>
        <NavigationContainer ref={navigationRef}>
          <AppContainer>
            <Screens />
            <PopupsManager />
          </AppContainer>
        </NavigationContainer>
      </UserProvider>
    </Provider>
  )
}

const AppContainer = styled.View`
  flex: 1;
  position: relative;
`