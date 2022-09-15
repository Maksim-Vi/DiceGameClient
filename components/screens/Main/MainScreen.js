import React  from 'react'
import BackgroundWrapper from '../../common/BackgroundWrapper/BackgroundWrapper'
import mainBg from '../../../assets/bg/main_bg.jpg'
import styled from 'styled-components'
import TopMain from '../../common/TopPanel/TopPanel'
import C_QUICK_PLAY from '../../protocol/messages/clients/games/C_QUICK_PLAY'
import {StatusBar,StyleSheet} from "react-native";
import GameWithBot from "./components/GameWithBot";
import GameWithOpponent from "./components/GameWithOpponent";
import GameWithOpponentByTime from "./components/GameWithOpponentByTime";

const MainScreen = () => {

  const hendlerPlayGame = (gameType) =>{
    new C_QUICK_PLAY(gameType)
  }

  return (
    <BackgroundWrapper gackground={mainBg}>
      <StatusBar hidden={true} style="light"/>
      <TopMain />

      <MainContainer>
        <GamesContainer horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
            <GameWithBot index={0} hendlerPlayGame={hendlerPlayGame}/>
            <GameWithOpponent index={1} hendlerPlayGame={hendlerPlayGame}/>
            <GameWithOpponentByTime index={2} hendlerPlayGame={hendlerPlayGame} />
        </GamesContainer>
        {/*<PlayButton onPress={hendlerPlayGame}><Text large heavy color={'#fff'}>Play</Text></PlayButton>*/}
      </MainContainer>

    </BackgroundWrapper>
  )
}

const MainContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
`
const GamesContainer = styled.ScrollView`
  width: 95%;
`
const PlayButton = styled.TouchableOpacity`
  background-color: green;
  border-radius: 10px;
  border: 1px solid #000;
  padding: 10px 50px;
  margin-top: 20px;
`;

const styles = StyleSheet.create({
    scrollView: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
})

export default MainScreen