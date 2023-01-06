import React from 'react'
import BackgroundWrapper from '../../common/BackgroundWrapper/BackgroundWrapper'
import mainBg from '../../../assets/bg/main_bg.jpg'
import styled from 'styled-components'
import TopMain from '../../common/TopPanel/TopPanel'
import C_QUICK_PLAY from '../../protocol/messages/clients/games/C_QUICK_PLAY'
import {NativeModules, Platform, StatusBar} from "react-native";
import GameWithBot from "./components/GameWithBot";
import GameWithOpponent from "./components/GameWithOpponent";
import GameWithOpponentByTime from "./components/GameWithOpponentByTime";
import {setTestBtnsPopup} from '../../redux/reducers/popups/PopupsReducer'
import {useDispatch, useSelector} from 'react-redux'
import Text from '../../common/Text/Text'
import {selectMyUser} from '../../redux/reducers/players/PlayersReducer'
import FreeGift from "./components/FreeGift";
import OnlineUsers from "./components/OnlineUsers";
import SlideScreen from "../../common/AnimationScreens/SlideScreen";

const MainScreen = () => {

    const dispatch = useDispatch()
    const myUser = useSelector(selectMyUser)

    const hendlerPlayGame = (gameType) => {
        new C_QUICK_PLAY(gameType)
    }

    return (
            <BackgroundWrapper gackground={mainBg}>
                <StatusBar hidden={true} style="light"/>
                <TopMain/>


                <MainContainer>
                    <GameWithBot index={0} hendlerPlayGame={hendlerPlayGame}/>
                    <GameWithOpponent index={1} hendlerPlayGame={hendlerPlayGame}/>
                    <GameWithOpponentByTime index={2} hendlerPlayGame={hendlerPlayGame}/>
                </MainContainer>
                <OnlineUsers />

                {myUser && (myUser.admin === 'true' || myUser.admin === true) && <Test onPress={() => {
                    dispatch(setTestBtnsPopup({visible: true}))
                }} style={{borderBottomWidth: 3}}>
                    <Text color={'#000'}>Test Buttons</Text>
                </Test>
                }


                <FreeGift myUser={myUser}/>
            </BackgroundWrapper>
    )
}

const Test = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  ${() => {
    if (Platform.OS === 'ios' && NativeModules.DeviceInfo.isIPhoneX_deprecated) {
      return `
        top: 0;
        right: 30px;
      `
    } else {
      return `
        top: 20%;
        left: 10px;
      `
    }
  }}
  width: 100px;
  height: 30px;
  border-radius: 20px;
  margin: 10px auto;
  background-color: #ffefb1;
  border: 2px solid #ed9f39;
  margin-bottom: 100px;
`
const MainContainer = styled.View`
  flex: .8;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  width: 100%;
`

const SpriteContainer = styled.View`
  position: absolute;
  top: 20%;
  width: 100%;
`

export default MainScreen