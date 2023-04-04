import React from 'react';
import gameIcon from "../../../../../assets/dice/bot2.png";
import styled from "styled-components";
import Text from "../../../../common/Text/Text";
import {selectTranslation} from "../../../../redux/reducers/language/LanguageReducer";
import {connect, useDispatch, useSelector} from "react-redux";
import defaultTranslation from "../../../../redux/reducers/language/defaultTranslation";
import Sounds, {soundsType} from "../../../../utils/Sounds";
import bgGame from "../../../../../assets/common/btns/GameBtnBlue.png";
import {
    setBotGameTypesPopup,
    setNotEnoughFlashPopup
} from "../../../../redux/reducers/popups/PopupsReducer";
import {selectUserFlash} from "../../../../redux/reducers/players/PlayersReducer";
import {store} from "../../../../redux/redux-store";

const GameWithBot = (props) => {

    const dispatch = useDispatch()
    const userFlash = useSelector(selectUserFlash)

    const handelClick = () => {
        Sounds.loadAndPlayFile(soundsType.click2)
        if(userFlash < 1){
            return store.dispatch(setNotEnoughFlashPopup({visible: true}))
        }
        dispatch(setBotGameTypesPopup({visible: true, data: null}))
    }

    return (
        <BG source={bgGame} resizeMode={'contain'}>
            <BotContainer onPress={handelClick}
                          activeOpacity={0.9}>
                <Text setShadow madium blod color={'#ff9d4d'} center>
                    {props.tap_to_play}
                </Text>
                <GameImage source={gameIcon} resizeMode={'contain'}/>
                <Text setShadow fontSize={18} blod color={'#ff9d4d'} center>
                    {props.fightBot}
                </Text>
            </BotContainer>
        </BG>
    );
};

const BG = styled.ImageBackground`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
`

const BotContainer = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 90%;
  border-radius: 20px;
  margin-top: 15px;
  padding: 0 30px;
`
const GameImage = styled.Image`
  width: 100px;
  height: 100px;
  margin: 30px 20px;
`

const mapStateToProps = (state) => ({
    tap_to_play: selectTranslation(state, defaultTranslation.TR_TAP_TO_PLAY),
    fightBot: selectTranslation(state, defaultTranslation.TR_FIGHT_BOT),
})

export default connect(mapStateToProps)(GameWithBot);