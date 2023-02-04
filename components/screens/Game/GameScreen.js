import React, {useEffect, useState} from 'react'
import BackgroundWrapper from '../../common/BackgroundWrapper/BackgroundWrapper'
import styled from 'styled-components'
import GameWrapper from '../../games/DiceGame/GameWrapper'
import C_ABORDED_GAME from '../../protocol/messages/clients/games/C_ABORDED_GAME'
import {store} from '../../redux/redux-store'
import {selectCurrentGameId} from '../../redux/reducers/game/GameReducer'
import {Ionicons} from '@expo/vector-icons'

const GameScreen = () => {


    const [isPress, setPress] = useState(false)

    const leaveGame = () => {
        if(isPress) return null

        const leaveGameId = selectCurrentGameId(store.getState())
        if (leaveGameId) {
            new C_ABORDED_GAME(leaveGameId)
            setPress(true)
        }
    }

    useEffect(()=>{
        setPress(false)

        return ()=>{
            if(isPress) setPress(false)
        }
    },[])

    return (
        <BackgroundWrapper>
            <GameBack onPress={leaveGame}>
                <Ionicons name='arrow-back' size={38} color={'#000'}/>
            </GameBack>
            <GameWrap>
                <GameWrapper/>
            </GameWrap>
        </BackgroundWrapper>
    )
}

const GameWrap = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`
const GameBack = styled.TouchableOpacity`
  position: absolute;
  padding: 20px;
  top: -3px;
  left: -3px;
  z-index: 1;
`
export default GameScreen