import { useNavigation } from '@react-navigation/native'
import React from 'react'
import styled from 'styled-components';
import back from '../../../../assets/common/btns/button_page_back.png'
import {store} from "../../../redux/redux-store";
import {setActiveTabApp} from "../../../redux/reducers/Websocket/WebsocketReducer";
import Sounds, {soundsType} from "../../../utils/Sounds";

const ButtonBack = (props) => {

    const navigation = useNavigation()

    const goBack = () =>{
        Sounds.loadAndPlayFile(soundsType.click2)
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
            <BackImg source={back} style={{transform: [{rotate: '-180deg'}]}}/>
        </GameBack>   
    )
}

const GameBack = styled.TouchableOpacity`
	position: absolute;
	top: ${props=> props.top ? props.top : '30px'};
	left: ${props=> props.left ? props.left : '20px'};
    z-index: 1;
`

const BackImg = styled.Image`
  width: 40px;
  height: 40px;
`

export default ButtonBack