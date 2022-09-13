import React, { useContext } from 'react'
import { UserContext } from '../utils/UserProvider';
import AuthNavigation from './navigation/AuthNavigation';
import Navigator from './navigation/Navigation';
import { useNavigation } from '@react-navigation/native';

const Screens = () => {

    const navigation = useNavigation()
    const { user } = useContext(UserContext);

    React.useEffect(()=>{
        window.navigation = navigation
    }, [])

   return user.auth ? <Navigator /> : <AuthNavigation />
}

export default Screens