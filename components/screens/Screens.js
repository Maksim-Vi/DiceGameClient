import React, { useContext } from 'react'
import { UserContext } from '../utils/UserProvider';
import AuthNavigation from './Navigation/AuthNavigation';
import Navigator from './Navigation/Navigation';

const Screens = () => {

    const { user } = useContext(UserContext);

   return user.auth ? <Navigator /> : <AuthNavigation />
}

export default Screens