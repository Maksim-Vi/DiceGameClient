import React from 'react'
import BackgroundWrapper from '../../common/BackgroundWrapper/BackgroundWrapper'
import styled from 'styled-components'
import mainBg from '../../../assets/bg/main_bg.jpg'
import GameWithComputer from '../../games/DiceGame/GameWithComputer'
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
    <BackgroundWrapper gackground={mainBg}> 
      <GameBack onPress={leaveGame}>
          <Ionicons name='arrow-back' size={38} color={'#000'} />
      </GameBack>  
      <GameContainer>
        <GameWithComputer />
      </GameContainer>
    </BackgroundWrapper>
  )
}

const GameContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`
const GameBack = styled.TouchableOpacity`
	position: absolute;
	top: 20px;
	left: 10px;
`
export default GameScreen