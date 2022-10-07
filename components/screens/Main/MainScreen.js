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
import { store } from '../../redux/redux-store'
import { setResultGame } from '../../redux/reducers/game/GameReducer'
import { useNavigation } from '@react-navigation/native'

const MainScreen = () => {

  const navigation = useNavigation()
  const hendlerPlayGame = (gameType) =>{
    new C_QUICK_PLAY(gameType)
  }

  const hendelClick = () =>{
    store.dispatch(setResultGame({
      gameId: 13234241,
      players: [
        {id: 6, username: 'Max', avatar: 3, side: 0, activeItems: 0, inGame: true},
        {id: 66, username: 'Tetris', avatar: 5, side: 1, activeItems: 0, inGame: true}
      ],
      userResultItems:{
          scores: 50,
          coins: 3,
          crystals: 1,
      },
      opponentResultItems:{
        scores: 30,
        coins: 0,
        crystals: 0,
      },
      userWin: true,
      opponentWin: false
    }))

    navigation.navigate('ResultScreen')
  }

  return (
    <BackgroundWrapper gackground={mainBg}>
      <StatusBar hidden={true} style="light"/>
      <TopMain />

      <MainContainer>
        <GameWithBot index={0} hendlerPlayGame={hendlerPlayGame}/>
        <GameWithOpponent index={1} hendlerPlayGame={hendlerPlayGame}/>
        <GameWithOpponentByTime index={2} hendlerPlayGame={hendlerPlayGame} />
      </MainContainer>

      {/* <Test onPress={hendelClick} style={{ borderBottomWidth: 8 }}></Test> */}
    </BackgroundWrapper>
  )
}

const Test = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 230px;
  height: 80px;
  border-radius: 20px;
  margin: 10px auto;
  background-color: #ffefb1;
  border: 2px solid #ed9f39;
  margin-bottom: 100px;
`

const MainContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
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
  margin-bottom: 100px;
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