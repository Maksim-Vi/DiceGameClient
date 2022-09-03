import React from 'react'
import { screenOptions } from '../../constants/options'
import { createStackNavigator } from "@react-navigation/stack";
import AuthScreen from '../Auth/AuthScreen';
import RegisterScreen from '../Auth/Register/RegisterScreen';

const AuthStack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <AuthStack.Navigator screenOptions={screenOptions} >
        <AuthStack.Screen name="AuthScreen" component={AuthScreen} />
        <AuthStack.Screen name="RegisterScreen" component={RegisterScreen} />
    </AuthStack.Navigator>
  )
}

export default AuthNavigation