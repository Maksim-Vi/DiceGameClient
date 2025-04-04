import React, {useContext, useEffect} from 'react';
import bg from "../../../assets/loadGame/load-img-game.png";
import {UserContext} from "../../utils/UserProvider";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {transitionState} from "../../utils/utils";
import styled from "styled-components";
import {useNavigation} from "@react-navigation/native";
import ChatManager from "../../managers/chatManager/ChatManager";
import {store} from "../../redux/redux-store";

const Load = (props) => {

    const { user } = useContext(UserContext);
    const navigation = useNavigation()

    React.useEffect(()=>{
        window.navigation = navigation
    }, [navigation])

    useEffect(()=>{
        const chatManager = new ChatManager()
        store.chatManager = chatManager
        window.chatManager = chatManager
    },[])

    const getCatchData = async () =>{
        const value = await AsyncStorage.getItem('UserData')

        if(user.auth){
            transitionState('App')
        }

        if(value || value !== ''){
            const data = JSON.parse(value)

            if (data && data.token && data.user.username) {
                transitionState('LoadingProject')
            } else {
                transitionState('AuthScreen')
            }
        } else {
            transitionState('AuthScreen')
        }
    }

    useEffect(()=>{
        getCatchData()
    },[])

    return <ContainerApp><Background source={bg} resizeMode="cover" /></ContainerApp>
}

const ContainerApp = styled.View`
  flex: 1;
`
const Background = styled.ImageBackground`
  flex: 1;
`

export default Load;