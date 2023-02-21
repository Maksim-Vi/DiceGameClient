import { Provider } from 'react-redux';
import { store } from './components/redux/redux-store';
import UserProvider from './components/utils/UserProvider';
import Screens from './components/screens/Screens';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import React, {useEffect} from 'react';
import styled from 'styled-components';
import { useFonts } from 'expo-font';
import PopupsManager from './components/managers/popupsManager/PopupsManager';
import NoConnection from "./components/common/NoConnection/NoConnection";

export default function App() {

  const [fontsLoaded] = useFonts({
    'Dilo-World': require('./assets/fonts/DiloWorld.ttf'),
    'Gogono-Cocoa': require('./assets/fonts/GogonoCocoa.otf'),
    'Lobster': require('./assets/fonts/SeymourOne-Regular.ttf'),
    'Russo-One': require('./assets/fonts/RussoOne-Regular.ttf'),
  });

  const navigationRef = useNavigationContainerRef();

  if (!fontsLoaded) return null;
  
  return  (
    <Provider store={store}>
      <UserProvider>
        <NavigationContainer ref={navigationRef}>
          <AppContainer>
            <Screens />
            <PopupsManager />
            <NoConnection />
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