import React from 'react'
import { screenOptions } from '../../constants/options'
import { createStackNavigator } from "@react-navigation/stack";
import AuthScreen from '../Auth/AuthScreen';
import RegisterScreen from '../Auth/Register/RegisterScreen';
import LoadingProject from "../LoadingProject/LoadingProject";
import { useNavigation } from '@react-navigation/native';

const AuthStack = createStackNavigator();

const AuthNavigation = () => {

  const navigation = useNavigation()

  React.useEffect(()=>{
    window.navigation = navigation
    navigationAction = navigation
  }, [navigation])

  return (
    <AuthStack.Navigator screenOptions={screenOptions} >
        <AuthStack.Screen name="AuthScreen" component={AuthScreen} />
        <AuthStack.Screen name="RegisterScreen" component={RegisterScreen} />
        <AuthStack.Screen name="LoadingProject" component={LoadingProject} />
    </AuthStack.Navigator>
  )
}

export default AuthNavigation