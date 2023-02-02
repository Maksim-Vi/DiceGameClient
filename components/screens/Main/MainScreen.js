import React, {useEffect} from 'react'
import BackgroundWrapper from '../../common/BackgroundWrapper/BackgroundWrapper'
import styled from 'styled-components'
import TopMain from '../../common/TopPanel/TopPanel'
import C_QUICK_PLAY from '../../protocol/messages/clients/games/C_QUICK_PLAY'
import {Platform, StatusBar} from "react-native";
import GameWithBot from "./components/GameWithBot";
import GameWithOpponent from "./components/GameWithOpponent";
import GameWithOpponentByTime from "./components/GameWithOpponentByTime";
import {setTestBtnsPopup} from '../../redux/reducers/popups/PopupsReducer'
import {connect, useDispatch, useSelector} from 'react-redux'
import Text from '../../common/Text/Text'
import {selectMyUser} from '../../redux/reducers/players/PlayersReducer'
import FreeGift from "./components/FreeGift";
import OnlineUsers from "./components/OnlineUsers";
import {getIosModel, transitionState} from "../../utils/utils";
import {selectDefaultParams} from "../../redux/reducers/language/LanguageReducer";
import defaultParams from "../../redux/reducers/language/defaultParams";
import {selectRestoreGame, setIsGameStarted} from "../../redux/reducers/game/GameReducer";
import {store} from "../../redux/redux-store";

const MainScreen = (props) => {

    const dispatch = useDispatch()
    const myUser = useSelector(selectMyUser)
    const isRestoreGame = useSelector(selectRestoreGame)

    const handlerPlayGame = (gameType) => {
        new C_QUICK_PLAY(gameType)
    }

    const restoreGame = () =>{
        store.dispatch(setIsGameStarted(true))

        setTimeout(()=>{
            transitionState('GameScreen')
        }, 500)
    }

    useEffect(()=>{
        if(isRestoreGame){
            restoreGame()
        }
    },[isRestoreGame])

    useEffect(()=>{
        if(!window.chatManager.chat.channels['general']){
            window.chatManager.connectionToChatRoom('general')
        }
    },[])

    return (
            <BackgroundWrapper>
                <StatusBar hidden={true} style="light"/>
                <MainFrame>
                    <TopMain/>

                    <MainContainer>
                        {props.params.ENABLE_GAME_BOT && <GameWithBot index={0} handlerPlayGame={handlerPlayGame}/>}
                        {props.params.ENABLE_GAME_OPPONENT && <GameWithOpponent index={1} handlerPlayGame={handlerPlayGame}/>}
                        {props.params.ENABLE_GAME_OPPONENT_BY_TIME && <GameWithOpponentByTime index={2} handlerPlayGame={handlerPlayGame}/>}
                    </MainContainer>
                    <OnlineUsers />
                </MainFrame>


                {myUser && (myUser.admin === 'true' || myUser.admin === true) && <Test onPress={() => {
                    dispatch(setTestBtnsPopup({visible: true}))
                }} style={{borderBottomWidth: 3}}>
                    <Text color={'#000'}>Test Buttons</Text>
                </Test>
                }

                {props.params.ENABLE_AD_PLUGIN && <FreeGift myUser={myUser}/>}
            </BackgroundWrapper>
    )
}

const Test = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  ${() => {
    const isIos = getIosModel()
    if (Platform.OS === 'ios' && isIos >= 10) {
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
const MainFrame = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 65%;
`

const MainContainer = styled.View`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  width: 100%;
  //margin-top: 50%;
`

const mapStateToProps = (state) => ({
    params:{
        ENABLE_AD_PLUGIN: selectDefaultParams(state, defaultParams.ENABLE_AD_PLUGIN),
        ENABLE_GAME_BOT: selectDefaultParams(state, defaultParams.ENABLE_GAME_BOT),
        ENABLE_GAME_OPPONENT: selectDefaultParams(state, defaultParams.ENABLE_GAME_OPPONENT),
        ENABLE_GAME_OPPONENT_BY_TIME: selectDefaultParams(state, defaultParams.ENABLE_GAME_OPPONENT_BY_TIME),
    }
})

export default connect(mapStateToProps)(MainScreen);