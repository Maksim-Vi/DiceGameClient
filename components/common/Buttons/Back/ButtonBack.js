import { useNavigation } from '@react-navigation/native'
import React from 'react'
import styled from 'styled-components';
import {Ionicons} from '@expo/vector-icons'

const ButtonBack = (props) => {

    const navigation = useNavigation()

    const goBack = () =>{
        if(props.leaveGame){
            props.leaveGame()
        }
        if(props.goMainPage){
            navigation.navigate('MainScreen')
        }
    }

    return (
        <GameBack onPress={goBack}>
            <Ionicons name='arrow-back' size={38} color={'#000'} />
        </GameBack>   
    )
}

const GameBack = styled.TouchableOpacity`
	position: absolute;
	top: 20px;
	left: 10px;
    z-index: 1;
`

export default ButtonBack