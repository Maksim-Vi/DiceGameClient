import { Provider } from 'react-redux';
import { store } from './components/redux/redux-store';
import UserProvider from './components/utils/UserProvider';
import Screens from './components/screens/Screens';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { openServerConnection } from './components/protocol/websocet';

export default function App() {

  React.useEffect(()=>{
    openServerConnection()
  }, [])

  return  (
    <Provider store={store}>
      <UserProvider>
        <NavigationContainer>
          <Screens />
        </NavigationContainer>
      </UserProvider>
    </Provider>
  )
}