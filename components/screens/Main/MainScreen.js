import React, {useEffect} from 'react'
import BackgroundWrapper from '../../common/BackgroundWrapper/BackgroundWrapper'
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

const MainScreen = () => {

    const dispatch = useDispatch()
    const myUser = useSelector(selectMyUser)

    const handlerPlayGame = (gameType) => {
        new C_QUICK_PLAY(gameType)
    }

    useEffect(()=>{
        if(!window.chatManager.chat.channels['general']){
            window.chatManager.connectionToChatRoom('general')
        }
    },[])

    return (
            <BackgroundWrapper>
                <StatusBar hidden={true} style="light"/>
                <TopMain/>

                <MainContainer>
                    <GameWithBot index={0} handlerPlayGame={handlerPlayGame}/>
                    <GameWithOpponent index={1} handlerPlayGame={handlerPlayGame}/>
                    <GameWithOpponentByTime index={2} handlerPlayGame={handlerPlayGame}/>
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
  align-content: center;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  width: 100%;
  margin-top: 50%;
`

const SpriteContainer = styled.View`
  position: absolute;
  top: 20%;
  width: 100%;
  height: 50%;
  z-index: 1;
  background: rgba(255, 127, 80, 0.37);
`

export default MainScreen