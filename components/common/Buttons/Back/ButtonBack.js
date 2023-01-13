import { useNavigation } from '@react-navigation/native'
import React from 'react'
import styled from 'styled-components';
import {Ionicons} from '@expo/vector-icons'
import {store} from "../../../redux/redux-store";
import {setActiveTabApp} from "../../../redux/reducers/Websocket/WebsocketReducer";

const ButtonBack = (props) => {

    const navigation = useNavigation()

    const goBack = () =>{
        if(props.leaveGame){
            props.leaveGame()
        }
        if(props.goMainPage){
            navigation.navigate('MainScreen')
            store.dispatch(setActiveTabApp('MainScreen'))
        }
    }

    return (
        <GameBack {...props} onPress={goBack}>
            <Ionicons name='arrow-back' size={38} color={'#000'} />
        </GameBack>   
    )
}

const GameBack = styled.TouchableOpacity`
	position: absolute;
	top: ${props=> props.top ? props.top : '20px'};
	left: ${props=> props.left ? props.left : '10px'};
    z-index: 1;
`

export default ButtonBack