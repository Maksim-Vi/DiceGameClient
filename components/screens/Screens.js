import React, { useContext } from 'react'
import { UserContext } from '../utils/UserProvider';
import AuthNavigation from './navigation/AuthNavigation';
import Navigator from './navigation/Navigation';

const Screens = () => {

    const { user } = useContext(UserContext);

   //return user.auth ? <Navigator /> : <AuthNavigation />
   return <Navigator /> 
}

export default Screens