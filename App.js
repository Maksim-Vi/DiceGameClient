import { Provider } from 'react-redux';
import { store } from './components/redux/redux-store';
import UserProvider from './components/utils/UserProvider';
import Screens from './components/screens/Screens';
import { NavigationContainer, useNavigation, useNavigationContainerRef } from '@react-navigation/native';
import React from 'react';
import styled from 'styled-components';
import PopupsManager from './components/Managers/PopupsManager/PopupsManager';

export default function App() {

  window.navigation = null
  const navigationRef = useNavigationContainerRef();
  
  React.useEffect(()=>{
      window.navigation = navigationRef.current
  }, [])

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