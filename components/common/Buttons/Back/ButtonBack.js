import { useNavigation } from '@react-navigation/native'
import React from 'react'
import styled from 'styled-components';
import {Ionicons} from '@expo/vector-icons'

const ButtonBack = () => {

    const navigation = useNavigation()

    return (
        <GameBack onPress={()=>{navigation.navigate('MainScreen')}}>
            <Ionicons name='arrow-back' size={38} color={'#000'} />
        </GameBack>   
    )
}

const GameBack = styled.TouchableOpacity`
	position: absolute;
	top: 20px;
	left: 10px;
`

export default ButtonBack