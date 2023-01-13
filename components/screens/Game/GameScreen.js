import React from 'react'
import BackgroundWrapper from '../../common/BackgroundWrapper/BackgroundWrapper'
import styled from 'styled-components'
import GameWrapper from '../../games/DiceGame/GameWrapper'
import C_ABORDED_GAME from '../../protocol/messages/clients/games/C_ABORDED_GAME'
import { store } from '../../redux/redux-store'
import { selectCurrentGameId } from '../../redux/reducers/game/GameReducer'
import {Ionicons} from '@expo/vector-icons'

const GameScreen = () => {

  const leaveGame = () =>{
    const leaveGameId = selectCurrentGameId(store.getState())
    new C_ABORDED_GAME(leaveGameId)
  }

  return (
    <BackgroundWrapper>
      <GameBack onPress={leaveGame}>
          <Ionicons name='arrow-back' size={38} color={'#000'} />
      </GameBack>  
      <GameWrap>
        <GameWrapper />
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