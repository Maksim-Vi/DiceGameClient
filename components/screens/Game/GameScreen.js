import React, {useEffect, useState} from 'react'
import BackgroundWrapper from '../../common/BackgroundWrapper/BackgroundWrapper'
import styled from 'styled-components'
import C_ABORDED_GAME from '../../protocol/messages/clients/games/C_ABORDED_GAME'
import {store} from '../../redux/redux-store'
import {selectCurrentGameId} from '../../redux/reducers/game/GameReducer'
import back from "../../../assets/common/btns/button_page_back.png";
import GameLoader from "../../games/GameLoader";
import {websocket} from "../../protocol/websocet";

const GameScreen = () => {

    const [isPress, setPress] = useState(false)

    const leaveGame = () => {
        if(isPress) return null

        const leaveGameId = selectCurrentGameId(store.getState())
        if (leaveGameId) {
            new C_ABORDED_GAME(leaveGameId)
            setPress(true)
        }
    }

    useEffect(()=>{
        setPress(false)

        return ()=>{
            if(isPress) setPress(false)
        }
    },[])

    return (
        <BackgroundWrapper>
            <GameBack onPress={leaveGame}>
                <BackImg source={back} style={{transform: [{rotate: '-180deg'}]}}/>
            </GameBack>
            <GameWrap>
                <GameLoader />
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
  top: 10px;
  left: 0;
  z-index: 1;
`
const BackImg = styled.Image`
  width: 40px;
  height: 40px;
`

export default GameScreen