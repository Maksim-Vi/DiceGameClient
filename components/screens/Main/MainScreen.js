import { StatusBar } from 'expo-status-bar';
import React  from 'react'
import Text from '../../common/Text/Text'
import BackgroundWrapper from '../../common/BackgroundWrapper/BackgroundWrapper'
import mainBg from '../../../assets/bg/main_bg.jpg'
import styled from 'styled-components'
import gameIcon from '../../../assets/dice/game_1V1.png'
import TopMain from '../../common/TopPanel/TopPanel'
import C_QUICK_PLAY from '../../protocol/messages/clients/games/C_QUICK_PLAY'

const MainScreen = () => {

  const hendlerPlayGame = () =>{
    const data = {price: 10}
    new C_QUICK_PLAY(data.price,1)
  }

  return (
    <BackgroundWrapper gackground={mainBg}>
      {/*<StatusBar style="light"/>*/}
      <TopMain />

      <MainContainer>
        <GamesContainer>
          <GameImage source={gameIcon} />
          <TextCont title heavy color={'#ff9d4d'}>Dice-fight</TextCont>
        </GamesContainer>
        <PlayButton onPress={hendlerPlayGame}><Text large heavy color={'#fff'}>Play</Text></PlayButton>
      </MainContainer>

    </BackgroundWrapper>
  )
}

const MainContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`
const GamesContainer = styled.View`
  position: relative;
`
const GameImage = styled.Image`
    width: 100px;
    height: 100px;
`
const TextCont = styled(Text)`
  position: absolute;
  bottom: 5px;
  left: -25px;
  text-shadow: 1px 1px 1px #000;
`
const PlayButton = styled.TouchableOpacity`
  background-color: green;
  border-radius: 10px;
  border: 1px solid #000;
  padding: 10px 50px;
  margin-top: 20px;
`;

export default MainScreen