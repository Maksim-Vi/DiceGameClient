import React, {useEffect} from 'react'
import BackgroundWrapper from '../../common/BackgroundWrapper/BackgroundWrapper'
import styled from 'styled-components'
import TopMain from '../../common/TopPanel/TopPanel'
import {StatusBar} from "react-native";
import {connect, useSelector} from 'react-redux'
import FreeGift from "./components/FreeGift";
import OnlineUsers from "./components/OnlineUsers";
import {transitionState} from "../../utils/utils";
import {selectDefaultParams} from "../../redux/reducers/language/LanguageReducer";
import defaultParams from "../../redux/reducers/language/defaultParams";
import {selectRestoreGame, setIsGameStarted} from "../../redux/reducers/game/GameReducer";
import {store} from "../../redux/redux-store";
import {selectMyUser} from "../../redux/reducers/players/PlayersReducer";
import GameList from "./components/GameList/List/GameList";

const MainScreen = (props) => {

    const myUser = useSelector(selectMyUser)
    const isRestoreGame = useSelector(selectRestoreGame)

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

const mapStateToProps = (state) => ({
    params:{
        ENABLE_AD_PLUGIN: selectDefaultParams(state, defaultParams.ENABLE_AD_PLUGIN),
    }
})

export default connect(mapStateToProps)(MainScreen);