import { Provider } from 'react-redux';
import { store } from './components/redux/redux-store';
import UserProvider from './components/utils/UserProvider';
import Screens from './components/screens/Screens';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import React from 'react';

export default function App() {

  window.navigation = null
  const navigationRef = useNavigationContainerRef();

  React.useEffect(()=>{
      window.navigation = navigationRef ? navigationRef.current : null
  }, [])

  return  (
    <Provider store={store}>
      <UserProvider>
        <NavigationContainer ref={navigationRef}>
          <Screens />
        </NavigationContainer>
      </UserProvider>
    </Provider>
  )
}