import React, {useEffect} from 'react'
import BackgroundWrapper from '../../common/BackgroundWrapper/BackgroundWrapper'
import styled from 'styled-components'
import TopMain from '../../common/TopPanel/TopPanel'
import {StatusBar} from "react-native";
import {connect, useDispatch, useSelector} from 'react-redux'
import FreeGift from "./components/FreeGift";
import OnlineUsers from "./components/OnlineUsers";
import {transitionState} from "../../utils/utils";
import {selectDefaultParams, selectUserParams} from "../../redux/reducers/language/LanguageReducer";
import defaultParams from "../../redux/reducers/language/defaultParams";
import {selectRestoreGame, setIsGameStarted} from "../../redux/reducers/game/GameReducer";
import {store} from "../../redux/redux-store";
import {selectMyUser} from "../../redux/reducers/players/PlayersReducer";
import GameList from "./components/GameList/List/GameList";
import Text from "../../common/Text/Text";
import {setTestBtnsPopup, setTutorialPopup} from "../../redux/reducers/popups/PopupsReducer";
import userParams from "../../redux/reducers/language/userParams";

const MainScreen = (props) => {

    const myUser = useSelector(selectMyUser)
    const isRestoreGame = useSelector(selectRestoreGame)
    const dispatch = useDispatch()

    const restoreGame = () =>{
        store.dispatch(setIsGameStarted(true))

        setTimeout(()=>{
            transitionState('GameScreen')
        }, 500)
    }

    const testBtnClick = () =>{
        dispatch(setTestBtnsPopup({visible: true}))
    }

    useEffect(()=>{
        if(isRestoreGame){
            restoreGame()
        }
    },[isRestoreGame])

    useEffect( ()=>{
        if(props.params.ENABLE_TUTORIAL && !props.params.isShowTutorial){
            dispatch(setTutorialPopup({visible: true, data: null}))
        }
        if(!window.chatManager.chat.channels['general']){
            window.chatManager.connectionToChatRoom('general')
        }
    },[])

    return (
            <BackgroundWrapper>
                <StatusBar hidden={true} style="light"/>

                {myUser && (myUser.admin === 'true' || myUser.admin === true)  &&
                    <Test onPress={testBtnClick} style={{ borderBottomWidth: 5 }}>
                        <Text color={'#000'}>Admin</Text>
                    </Test>
                }

                <MainFrame>
                    <TopMain/>
                    <GameList />
                    <OnlineUsers />
                </MainFrame>

                {props.params.ENABLE_AD_PLUGIN && <FreeGift myUser={myUser}/>}
            </BackgroundWrapper>
    )
}

const MainFrame = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 65%;
`

const Test = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 24%;
  left: 2%;
  width: 80px;
  height: 35px;
  border-radius: 10px;
  margin: 5px;
  background-color: #ffefb1;
  border: 2px solid #ed9f39;
  z-index: 1;
`

const mapStateToProps = (state) => ({
    params:{
        ENABLE_AD_PLUGIN: selectDefaultParams(state, defaultParams.ENABLE_AD_PLUGIN),
        ENABLE_TUTORIAL: selectDefaultParams(state, defaultParams.ENABLE_TUTORIAL),
        isShowTutorial: selectUserParams(state, userParams.USER_TUTORIAL_FINISH),
    }
})

export default connect(mapStateToProps)(MainScreen);